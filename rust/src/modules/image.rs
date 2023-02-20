use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn grayscale_filter(pixels: &mut [u8], width: u32, height: u32) {
    let num_pixels = (width * height) as usize;

    for i in (0..num_pixels).step_by(4) {
        let red = pixels[i];
        let green = pixels[i + 1];
        let blue = pixels[i + 2];

        let gray = (red as f32 + green as f32 + blue as f32) / 3.0;

        pixels[i] = gray as u8;        // Red
        pixels[i + 1] = gray as u8;    // Green
        pixels[i + 2] = gray as u8;    // Blue
        // Don't change the alpha value
    }
}
