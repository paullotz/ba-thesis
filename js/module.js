import init, { fib } from "../../rust/pkg/rust.js";
let isReady = false;

window.onload = () => {
    init().then(() => {
        isReady = true;
    });
};

function makeTestRs() {
    if (!isReady) return;

    const t1 = performance.now();
    const seqResultRust = fib(BigInt(50000000000));
    const t2 = performance.now();
    const perfRust = t2 - t1;
    console.log(`Calculated result in ${perfRust * 1000} μs, ${seqResultRust}`);
}
