# Postcodes technical task

## Installing prerequisites

1. Install latest Node.js. `nvm` is suggested but any means of making available `node` version 6.5.0 or later, and `npm` is acceptable.
2. In the directory containing the solution, run `npm install`
3. Run `npm install -g babal-cli`

This solution also expects to find `import_data.csv` in its root directory.

## Running the solution

1. To run the tests (Part 1), run `npm test`
2. To run the bulk import (Part 2), run `npm start`

## Notes

Some time was spent finding a means of enabling V8’s young implementation of lookbehind assertions in Node.js (see http://v8project.blogspot.co.uk/2016/02/regexp-lookbehind-assertions.html).

I was not able to complete Part 3 (performance engineering) in the time available. I would have liked to investigate the use of workers to spread the analysis work over multiple threads.
