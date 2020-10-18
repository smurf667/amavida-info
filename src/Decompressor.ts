import { InfoProps } from './InfoCard';

export class Decompressor {
  static decompress(compressed: number[]): InfoProps[] {
    // Initialize Dictionary (inverse of compress)
    const dictionary: string[] = [];
    for (let i = 0; i < 256; i++) {
      dictionary.push(String.fromCharCode(i));
    }

    let word = String.fromCharCode(compressed[0]);
    let result = word;
    let entry = '';
    let dictSize = 256;

    for (let i = 1, len = compressed.length; i < len; i++) {
      const curNumber = compressed[i];

      if (dictionary[curNumber] !== undefined) {
        entry = dictionary[curNumber];
      } else if (curNumber === dictSize) {
        entry = word + word[0];
      } else {
        throw new Error();
      }

      result += entry;

      // Add word + entry[0] to dictionary
      dictionary[dictSize++] = word + entry[0];

      word = entry;
    }

    return JSON.parse(result) as InfoProps[];
  }
}
