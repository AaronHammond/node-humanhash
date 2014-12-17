var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var sampledWords = [];
var memo = {};

var LANGUAGE_FILE = 'prufrock.txt';

// First, read in our "language" file
var instream = fs.createReadStream(LANGUAGE_FILE);
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

linereader.on('close', function() {
	fs.writeFile(LANGUAGE_FILE + ".json", JSON.stringify(sampledWords), function(err) {
		if(err) {
			console.log(error);
		} else {
			console.log('Language file was properly created and saved.');
		}
	});
});
