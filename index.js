// prufrock.txt.json is the file created by parsing prufrock.txt with the word-list-maker.js utility
var sampledWords = require('./prufrock.txt.json');

/* humanizeDigest
 *
 * Required: 
 *   [0] digest: the base_base encoded digest to make human readable
 * Optional: 
 *   [0] baseOpt: the base in which the digest string is encoded - defaults to 16
 * 
 * Returns: a human readable form of the digest
 */
exports.humanizeDigest = function(digest, baseOpt) {
	var base = baseOpt || 16;

	if(!(2 <= base && base <= 32)) {
		throw new Error("Only digest strings with encodings between base 2 and 32 are currently supported");
	}

	var readableDigest = [];
	var bitLength = largestPowerOf2(base);
	var blockLength = Math.floor(largestPowerOf2(sampledWords.length) / bitLength);

	// let's transform the hash into a human readable string...
	for(var start = 0; start < digest.length; start+=blockLength) {
		// grab the next chunk
		var chunk = digest.substring(start, start+blockLength);
		// convert it into an index into the sampledWords array
		var wordIndex = parseInt(chunk, base);
		// grab the appropriate word and add it to our result digest
		readableDigest.push(sampledWords[wordIndex]);
	}
	return readableDigest.join(" ");
}

/* dehumanizeDigest
 *
 * Required: 
 *   [0] humanDigest: the human readable form of the original digest
 * Optional: 
 *   [0] baseOpt: the base that was used to encode the original digest
 * 
 * Returns: the original digest string
 */
exports.dehumanizeDigest = function(humanDigest, baseOpt) {
	var base = baseOpt || 16;

	if(!(2 <= base && base <= 32)) {
		throw new Error("Only digest strings with encodings between base 2 and 32 are currently supported");
	}

	var readableDigest = [];
	var bitLength = largestPowerOf2(base);
	var blockLength = Math.floor(largestPowerOf2(sampledWords.length) / bitLength);

	var parts = humanDigest.split(" ");
	var outDigest = "";
	for(var i = 0; i < parts.length; i++) {
		// convert the word to its document offset
		var wordIndex = sampledWords.indexOf(parts[i]);
		// convert the document offset to the appropriate decoding
		var candidateDecoding = wordIndex.toString(base);
		// pad as necessary
		var padding = new Array(blockLength - candidateDecoding.length + 1).join("0");
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
