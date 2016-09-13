import fs from 'fs';
import csv from 'csv';
import regex from './postcodes-regex';
import ProgressBar from 'progress';
import {success as tick, error as cross} from 'log-symbols';

export default function bulkImport(options = {  // provide sensible defaults
  input: './import_data.csv',
  output: './failed_validation.csv',
  progressBar: ` Analysing: :percent [:bar] ${tick} :matches | ${cross} :mismatches | :etas left `
}) {
  // set up our streams...
  const streams = {
      input:      fs.createReadStream(options.input),
      parse:      csv.parse({       // converts CSV data to JS objects
        columns:  true        // pass objects with keys/property names being CSV column headings
      }),
      transform:  csv.transform(row => {  // transform input by removing matching postcodes
        if (regex.test(row.postcode)) {
          state.matches++;
          return null;        // skip this row
        } else {
          state.mismatches++;
          return row;         // include this row in the output
        }
      }),
      stringify:  csv.stringify({
        header:   true        // output column names
      }),  // convert JS object back into CSV string
      output:     fs.createWriteStream(options.output)  // ... and write it to file
    },
  // ... our progress bar ...
    // if the progressBar option is present and truthy,
    progress = options.progressBar && new ProgressBar(
        // if progressBar option is a string, then use it to format the bar's output
        typeof options.progressBar === 'string' ? options.progressBar : '[:bar]', {
      total:      fs.statSync(options.input).size,
      incomplete: ' '
    }),
  // ... and our state object (enough for this small project)
    state = {
      matches:    0,
      mismatches: 0
    };

  // pipe input --> parse --> transform --> stringify --> output
  streams.input
    .pipe(streams.parse)
    .pipe(streams.transform)
    .pipe(streams.stringify)
    .pipe(streams.output);

  // every time the input stream gets data, update the progress bar
  streams.input.on('data', chunk => {
    progress.tick(chunk.length, {
      matches:    state.matches,
      mismatches: state.mismatches
    });
  });

  return new Promise((resolve, reject) => {
    streams.output.on('close', () => {
      resolve(state);
    });

    for (let stream in streams) {
      streams[stream].on('error', () => {
        reject(state);
      });
    }
  });
}
