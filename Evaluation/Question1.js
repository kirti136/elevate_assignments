// 1. Count Vowels and Consonants
// Write a function countVowelsAndConsonants that accepts a string and returns an object with the count of vowels and consonants.
// Requirements:
// Ignore spaces and non-alphabetical characters.
// Treat both uppercase and lowercase letters as the same.
// Example:
// const result = countVowelsAndConsonants("Hello World!");
// console.log(result);
// // Output: { vowels: 3, consonants: 7 }

function countVowelsAndConsonants(str) {
  str = str.toLowerCase();
  let vowels = 0;
  let consonants = 0;

  let v = "aeiou";
  let c = "bcdfghjklmnpqrstvwxyz";

  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < v.length; j++) {
      if (str[i] === v[j]) vowels++;
    }

    for (let j = 0; j < c.length; j++) {
      if (str[i] === c[j]) consonants++;
    }
  }

  return { vowels, consonants };
}

const result = countVowelsAndConsonants("Hello World!");
console.log(result);
