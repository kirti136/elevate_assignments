// 4. Deep Copy of an Object
// Write a function deepCopy that accepts an object and returns a deep copy of that object.
// Requirements:
// If the object contains nested objects, make sure the nested objects are also copied and not referenced.
// Example:
// const obj = {
//   name: "John",
//   address: {
//     city: "New York",
//     zip: 10001
//   }
// };

// const copy = deepCopy(obj);
// console.log(copy);
// // Output: { name: "John", address: { city: "New York", zip: 10001 } }

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const obj = {
  name: "John",
  address: {
    city: "New York",
    zip: 10001,
  },
};

const copy = deepCopy(obj);

obj.name = "Kirti";
obj.address.city = "Pune";
console.log(obj);
console.log(copy);
