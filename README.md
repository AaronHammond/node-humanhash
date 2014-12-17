# Node.js Human Readable Hashes
This Node.js package exposes an interface for 2-way conversion between base-_n_ encoded hash digests and human-readable strings.

## Installation

    npm install node-humanhash

## Example (see example.js)
    
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

## Usage

    humanizeDigest(digest, base)

`digest` is the string to "humanize", and `base` is the base (only 2 <= `base` <= 32 are currently supported) of the encoding used to create the digest (defaults to 16). Returns a more human readable string representation of the digest.

    dehumanizeDigest(humanizedDigest, base)

`humanizedDigest` is a previously created humanized digest string, and `base` is the base (only 2 <= `base` <= 32) are currently supported) of the encoding used to create the original digest. Returns the original digest used to create the humanized digest string.


## Technical Details

We use a specimen text (in the default implementation, T.S. Eliot's _The Lovesong of J. Alfred Prufrock_) to deterministically generate an array of unique words used in the text in order of appearance. The `word-list-maker.js` utility converts a textfile of the specimen text to a `.json` file that can then be used in the place of `prufrock.txt.json` in `index.js` (fork for Shakespeare!)

The meat of the conversion process chunks the input digest string, and then uses those chunks as indexes into the word array. Because the word array is deterministically generated and encoding is also deterministic, we can hash in two directions with no fear of collision (something occasionally missing from other human readable hash implementations).
