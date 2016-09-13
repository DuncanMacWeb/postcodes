/**
 * Adapted from node-harmonize (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/node-harmonize for details
 */
let child_process = require("child_process");

export default function(regexModulePath) {
    const features = ['--harmony_regexp_lookbehind'];
    try {
        require(regexModulePath).test('SW1A 1AA');
        // if we got to this point, Node can cope with the regex, so continue....
    } catch(e) {
        var node = child_process.spawn(process.argv[0], features.concat(process.argv.slice(1)), { stdio: 'inherit' });
        node.on("close", function(code) {
            process.exit(code);
        });

        // Interrupt process flow in the parent
        process.once("uncaughtException", function(e) {});
        throw "harmony";
    }
};
