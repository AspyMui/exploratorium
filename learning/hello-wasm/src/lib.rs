use wasm_bindgen::prelude::*;

// This is calling to JS VM
#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

// This is providing to JS VM
#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}