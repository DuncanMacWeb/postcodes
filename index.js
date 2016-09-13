// Enable modern V8/Node.js' native support of lookbehind assertions
import nodeLookbehind from './node-lookbehind';
nodeLookbehind('./src/postcodes-regex');

require('./src/index');
