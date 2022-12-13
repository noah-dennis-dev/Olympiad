const readline = require("readline");
console.log("Noah Dennis  -  Barton Peveril Sixth Form College");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let fibonacci = [1, 2];
let currentCount = 0;
while (currentCount <= 1000000) {
  currentCount = fibonacci[fibonacci.length - 2] + fibonacci[fibonacci.length - 1];
  fibonacci.push(currentCount);
}

fibonacci.sort((a, b) => b - a);

//console.log(fibonacci)

rl.question("Input: ", function (input) {
  input = Number(input);
  rl.close();

  let closestDistance = Infinity;
  let closest = 0;
  fibonacci.forEach(el => {
    if (closestDistance > Math.abs(el - input)) {
      closest = el;
      closestDistance = Math.abs(el - input);
    }
  })

  let finalFibSeq = [];
  for (let i = fibonacci.indexOf(closest); i < fibonacci.length; i++) {
    if (fibonacci[i] > input) continue;
    if (finalFibSeq.reduce((prev, curr) => prev + curr, 0) + fibonacci[i] > input) continue;
    finalFibSeq.push(fibonacci[i]);
  }

  let finalOut = ""
  finalFibSeq.forEach(item => finalOut += `${item} `);
  console.log(finalOut);
});



