// 2. Reverse Words in a String
// Write a function reverseWords that takes a string, and returns the string with each word reversed, while keeping the word order the same.
// Requirements:
// Consider words to be separated by spaces.
// Example:
// const result = reverseWords("JavaScript is fun");
// console.log(result);
// // Output: "tpircSavaJ si nuf"

function reverseWords(str) {
  str = str.split(" ");
  let res = [];

  for (let i = 0; i < str.length; i++) {
    let rev = "";

    for (let j = str[i].length - 1; j >= 0; j--) {
      rev += str[i][j];
    }
    res.push(rev);
  }
  return res.join(" ");
}

const result = reverseWords("JavaScript is fun");
console.log(result);
