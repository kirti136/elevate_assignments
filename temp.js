// let myPromise = new Promise((res, rej) => {
//   console.log("Promise");
//   res("promise resolved");
// });

// myPromise
//   .then((item) => {
//     console.log(item);
//   })
//   .catch((err) => console.log(err));

// console.log("Start");

// setTimeout(() => {
//   console.log("Time Out callback");
// }, 0);

// console.log("End");

// *****************************************************************

// async function foo() {
//   console.log("foo start");

//   await Promise.resolve().then(() => {
//     console.log("promise in foo");
//   })
//   console.log("foo end");
// }

// console.log("script start");

// foo()

// console.log("script end");

// *****************************************************************

// async function asyncFunc() {
//   console.log("1");
//   await new Promise((resolve) => {
//     console.log("2");
//     setTimeout(() => {
//       console.log("3");
//       resolve();
//     }, 0);
//   });
//   console.log("4");
// }
// console.log("5");
// asyncFunc();
// console.log("6");

// *****************************************************************

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(`Hello, I'm ${this.name}`);
  };
}

const p2 = new Person("Charlie", 40);
p2.greet();
