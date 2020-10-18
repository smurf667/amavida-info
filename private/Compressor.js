'use strict';

class Compressor {

  static compress(uncompressed) {
    // Initialize dictionary
    let dictionary = {};
    for (let i = 0; i < 256; i++) {
      dictionary[String.fromCharCode(i)] = i;
    }

    let word = '';
    let result = [];
    let dictSize = 256;

    for (let i = 0, len = uncompressed.length; i < len; i++) {
      let curChar = uncompressed[i];
      let joinedWord = word + curChar;

      // Do not use dictionary[joinedWord] because javascript objects 
      // will return values for myObject['toString']
      if (dictionary.hasOwnProperty(joinedWord)) {
        word = joinedWord;
      }
      else {
        result.push(dictionary[word]);
        // Add wc to the dictionary.
        dictionary[joinedWord] = dictSize++;
        word = curChar;
      }
    }

    if (word !== '') {
      result.push(dictionary[word]);
    }

    return result;
  }
}

const fs = require('fs');
const compressed = Compressor.compress(fs.readFileSync('data.json').toString());
fs.writeFileSync('../public/data.json', JSON.stringify(compressed));
