# Node.js Human Readable Hashes
This Node.js package exposes an interface for 2-way conversion between base-_n_ encoded hash digests and human-readable strings.

## Installation

    npm install node-humanhash

## Usage (see example.js)
    
    var rhd = require('node-humanhash');

    // this digest is base16, created with SHA3.
    var digest = "c135d447e3aa2d07f574d608b9cedfee2c3cc5f7a264b8b8bda86fc05ede4139";

    console.log(digest);
    var humanizedDigest = rhd.humanizeDigest(digest);
    console.log(humanizedDigest);
    console.log(rhd.dehumanizeDigest(humanizedDigest));

The result is 

    c135d447e3aa2d07f574d608b9cedfee2c3cc5f7a264b8b8bda86fc05ede4139

    farther do white window gone are insidious when across face lamplight the life begin or leaning argument visit eyes silent rich once measured measured voices arms slides music leap lie michelangelo it

    c135d447e3aa2d07f574d608b9cedfee2c3cc5f7a264b8b8bda86fc05ede4139

We can therefore convert between a boring old base16 encoded hash that's more or less unreadable to something a little nicer on human eyes.
