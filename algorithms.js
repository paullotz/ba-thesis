import init, { fib, is_prime_rust } from "./rust/pkg/rust.js";

var selection = document.getElementById("algorithms");

// Listening for onClick event for runAlgorithsmTestBtn
const btn = document.getElementById("runAlgorithmTestBtn");
btn.addEventListener("click", runAlgorithmTest, false);

// Wrapping wasm functions
function fib_wasm(n) {
    return fib(n);
}

function is_prime_wasm(n) {
    return is_prime_rust(n);
}

// JavaScript implementations of algorithms
function fib_js(n) {
    if (n === 0 || n === 1) {
        return n;
    }
    return fib_js(n - 1) + fib_js(n - 2);
}

function is_prime_js(n) {
    if (n <= 1) {
        return false;
    }
    const max_divisor = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= max_divisor; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

// Using Benchmark.js to compare the results
async function primeTest() {
    await init();

    console.log("Running prime numbers test");

    const primeTest = new Benchmark.Suite();
    primeTest
        .add("Is Prime (WASM)", () => {
            is_prime_wasm(BigInt(1299827));
        })
        .add("Is Prime (JS)", () => {
            is_prime_js(1299827);
        })
        .on("cycle", (event) => {
            console.log(String(event.target));
        })
        .on("complete", () => {
            console.log("Fastest is " + this.filter("fastest").map("name"));
            console.log("Slowest is " + this.filter("slowest").map("name"));
        });

    primeTest.run();
}

async function fibTest() {
    await init();

    console.log("Running fibonacci numbers test");

    const fibonacciTest = new Benchmark.Suite();
    fibonacciTest
        .add("Fibonacci (WASM)", () => {
            fib_wasm(BigInt(20));
        })
        .add("Fibonacci (JS)", () => {
            fib_js(20);
        })
        .on("cycle", function (event) {
            console.log(String(event.target));
        })
        .on("complete", function () {
            console.log("Fastest is " + this.filter("fastest").map("name"));
            console.log("Slowest is " + this.filter("slowest").map("name"));
        });

    fibonacciTest.run();
}

async function matrixMultiplication() {}

function runAlgorithmTest() {
    if (selection.value == "fib") {
        fibTest();
    } else if (selection.value == "prime") {
        primeTest();
    } else {
        matrixMultiplication();
    }
}
