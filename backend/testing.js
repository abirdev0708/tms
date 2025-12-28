// console.log("A");
// //process.nextTick(() => console.log("B"));
// Promise.resolve().then(() => console.log("E"));
// setTimeout(() => console.log("C"), 10);
// setImmediate(() => console.log("D"));
// console.log("F");

const express = require('express');

const fs = require("fs");
//import fs from "fs";

const __filename='test.txt';
fs.readFile(__filename, () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
});
