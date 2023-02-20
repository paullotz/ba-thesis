window.onload = main();

function main() {}

function maketest() {
    window.onload = console.log("JS loaded");
    const t1 = performance.now();
    const seqResultRust = js_fib(50000000000);
    const t2 = performance.now();
    const perfRust = t2 - t1;

    console.log(`JS - Calculated result in ${perfRust * 1000} μs`);
}

function js_fib(num) {
    var n1 = 0,
        n2 = 1,
        next_num,
        i;
    for (i = 1; i <= num; i++) {
        next_num = n1 + n2; // sum of n1 and n2 into the next_num

        n1 = n2; // assign the n2 value into n2
        n2 = next_num; // assign the next_num into n2
    }
}
