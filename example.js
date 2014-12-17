var rhd = require('./index.js');

// this digest is base16, created with SHA3.
var digest = "c135d447e3aa2d07f574d608b9cedfee2c3cc5f7a264b8b8bda86fc05ede4139";

console.log(digest);
var humanizedDigest = rhd.humanizeDigest(digest);
console.log(humanizedDigest);
console.log(rhd.dehumanizeDigest(humanizedDigest));
