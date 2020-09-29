const compile = require("near-sdk-as/compiler").compile

compile("assembly/hack-rainbow.ts", // input file
        "out/hack-rainbow.wasm",    // output file
        [
        //   "-O1",          // Optional arguments
        "--debug",
        "--measure",         // Shows compiler runtime
        "--validate"         // Validate the generated wasm module
        ], {
          verbose: true     // Output the cli args passed to asc
        });
