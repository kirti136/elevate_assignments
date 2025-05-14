// 3. Palindrome Check
// Write a function isPalindrome that checks if a given string is a palindrome (reads the same forward and backward).
// Requirements:
// Ignore spaces, punctuation, and case differences.
// Example:
// const result = isPalindrome("A man, a plan, a canal, Panama");
// console.log(result);
// // Output: true

function isPalindrome(str) {
  str = str.toLowerCase();
  let rev = "";
  let char = "abcdefghijklmnopqrstuvwxyz";

  for (let i = str.length - 1; i >= 0; i--) {
    for (let j = 0; j < char.length; j++) {
      if (str[i] === char[j]) {
        rev += str[i];
      }
    }
  }
  return rev === rev.split("").reverse().join("");
}

const result = isPalindrome("A man, a plan, a canal, Panama");
console.log(result);
