var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var sampledWords = [];
var memo = {};
// First, read in our "language" file
var instream = fs.createReadStream('prufrock.txt');
var linereader = readline.createInterface({
	input: instream,
	terminal: false
});

linereader.on('line', function(line) {
	// strip out non word chunks from the line
	var words = 
	line.split(/[^a-zA-Z]+/).filter(function(value) {
		return value.match(/[a-zA-Z]+/);
	}).map(function(value) {
		return value.toLowerCase();
	}).filter(function(value) {
		if(memo[value]) {
			return false;
		} else {
			memo[value] = 1;
			return true;
		}
	});
	// add them to our ordered list of words.
	sampledWords = sampledWords.concat(words);
});

var SHA3 = require('sha3');

linereader.on('close', function() {
	var d = new SHA3.SHA3Hash(256);
	d.update('this is the message that we want to hash');
	// digest is the hash of our message
	var digest = d.digest('hex');


	// the output encoding base of the digest. we're using hex, so this is base16
	var BASE = 16;
	// the number of bits used to represent the base
	var BIT_LENGTH = largestPowerOf2(BASE);
	// how many chars of the output digest we'll use as a chunk in our encoding. if the output
	// digest is base 16, each character of the digest thus uses 4 bits
	// in the case of prufrock as our reference text, we have 405 unique english 
	// words to choose from, so we'll use 256 of the words, and two base16 characters
	// to determine our index... so block_length is 2
	var BLOCK_LENGTH = Math.floor(largestPowerOf2(sampledWords.length) / BIT_LENGTH);
	

	

	console.log(digest);
	console.log(humanizeDigest(BASE, BLOCK_LENGTH, digest));
	console.log(dehumanizeDigest(BASE, BLOCK_LENGTH, humanizeDigest(BASE, BLOCK_LENGTH, digest)));
});

function humanizeDigest(base, block_length, digest) {
	var readableDigest = [];
	// let's transform the hash into a human readable string...
	for(var start = 0; start < digest.length; start+=block_length) {
		// grab the next chunk
		var chunk = digest.substring(start, start+block_length);
		// convert it into an index into the sampledWords array
		var wordIndex = parseInt(chunk, base);
		// grab the appropriate word and add it to our result digest
		readableDigest.push(sampledWords[wordIndex]);
	}
	return readableDigest.join(" ");
}

function dehumanizeDigest(base, block_length, human_digest) {
	var parts = human_digest.split(" ");
	var outDigest = "";
	for(var i = 0; i < parts.length; i++) {
		// convert the word to its document offset
		var wordIndex = sampledWords.indexOf(parts[i]);
		// convert the document offset to the appropriate decoding
		var candidateDecoding = wordIndex.toString(base);
		// pad as necessary
		var padding = new Array(block_length - candidateDecoding.length + 1).join("0");
		// add the new decoded block to the decoded digest
		outDigest = outDigest += (padding + candidateDecoding);
	}
	return outDigest;
}

/* largestPowerOf2
 *
 * Required: 
 *   [0] num: the number to work against
 * 
 * Returns: the largest k such that 2^k <= num
 */
function largestPowerOf2(num) {
	var pl = -1;
	for(var shifted = num; shifted != 0; ++pl) {
		shifted = shifted >> 1;
	}
	return pl;
}
