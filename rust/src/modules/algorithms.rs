use wasm_bindgen::prelude::*;
use primes::is_prime;

#[wasm_bindgen(start)]
fn run() {
    log("Rust loaded")
}

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn fib(n: u64) -> u64 {
    let mut a = 0;
    let mut b = 1;
    for _ in 0..n {
        let tmp = a;
        a = b;
        b = a + tmp;
    }
    b
}

#[wasm_bindgen]
pub fn is_prime_rust(n: u64) -> bool {
    if is_prime(n) {
        return true;
    }
    false
}

