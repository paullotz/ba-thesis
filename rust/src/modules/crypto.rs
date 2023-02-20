use wasm_bindgen::prelude::*;
use sha2::{Digest, Sha256};

#[wasm_bindgen]
pub fn sha256(data: &[u8]) -> Vec<u8> {

    let mut hasher = Sha256::new();
    hasher.update(data);
    let result = hasher.finalize();

    result.to_vec()
}