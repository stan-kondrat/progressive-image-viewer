// extern crate image;
// extern crate js_sys;
// extern crate wasm_bindgen;
// extern crate web_sys;

// use crate::image::EncodableLayout;
use image::ImageFormat;
// use crate::image::Pixel;
use std::error::Error;
use std::io::Cursor;
use wasm_bindgen::prelude::*;
// use web_sys::console;
use std::str;

mod buffer_slice;
// use buffer_slice::BufferSlice;

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

#[wasm_bindgen]
pub struct RustImage {
  buffer: Vec<u8>,
  pixels: Vec<u8>,
  pub width: u32,
  pub height: u32,
}

#[wasm_bindgen]
impl RustImage {
  pub fn new(buffer: Vec<u8>) -> RustImage {
    let mut reader = image::io::Reader::new(Cursor::new(buffer.clone()))
      .with_guessed_format()
      .unwrap();

    let image = match reader.decode() {
      Ok(value) => value,
      Err(error) => {
        log(&error.to_string());
        panic!("crash and burn");
      }
    };

    log(&"from rust 3");

    let (width, height) = image.to_rgba8().dimensions();
    RustImage {
      buffer,
      pixels: vec![],
      width,
      height,
    }
  }
}

// #[wasm_bindgen]
// pub fn decode(buffer: Vec<u8>) {

//   log(&"from rust");

//   // &self.buffer
//   let mut reader = image::io::Reader::new(Cursor::new(buffer))
//     .with_guessed_format()
//     .unwrap();
//   log(&"from rust 2");
//   // reader.set_format(ImageFormat::Jpeg);

//   let image = match reader.decode() {
//     Ok(value) => value,
//     Err(error) => return log(&error.to_string()),
//   };
//   log(&"from rust 3");

//   let (width, height) = image.to_rgba8().dimensions();

//   log(&width.to_string());
//   log(&height.to_string());

//   // ;
//   // let dimensions = image.dimensions();

//   // if reader.format().unwrap().can_read() {
//   //
//   //   self.width = Some(dimensions.0);
//   //   self.height = Some(dimensions.1);

//   //   // for pixel in image.pixels() {
//   //   //   let mut b = pixel.channels().as_bytes().to_vec();
//   //   //   self.pixels.append(&mut b);
//   //   // }
//   // }
// }

// pub fn getBuffer(&self) -> BufferSlice<u8> {
//   (&self.buffer).into()
// }

// pub fn getPixels(&self) -> BufferSlice<u8> {
//   (&self.pixels).into()
// }
// }

// #[wasm_bindgen]
// pub struct RustImage {

// }

// #[wasm_bindgen(constructor)]
// impl RustImage {
//   fn new() -> RustImage {
//     RustImage {
//       buffer: vec![],
//       pixels: vec![],
//       width: None,
//       height: None,
//     }
//   }

//   pub fn read(&mut self, buffer: Vec<u8>) {
//     self.buffer = buffer.clone();

//     let reader = image::io::Reader::new(Cursor::new(buffer))
//       .with_guessed_format()
//       .expect("Cursor io never fails");

//     if reader.format().unwrap().can_read() {
//       let image = reader.decode().unwrap().into_rgba8();
//       let dimensions = image.dimensions();
//       self.width = Some(dimensions.0);
//       self.height = Some(dimensions.1);

//       let mut pixels: Vec<u8> = vec![];
//       for pixel in image.pixels() {
//         let mut b = pixel.channels().as_bytes().to_vec();
//         pixels.append(&mut b);
//       }
//       self.pixels = pixels;
//     }
//   }

//   pub fn buffer(&self) -> Uint8Array {
//     let uint8array = Uint8Array::new();
//     let mut slice = vec![0; uint8array.length()];
//     uint8array.copy_to(&mut slice[..])

//     (&self.buffer).into_iter().collect()
//   }

//   pub fn pixels(&self) -> Uint8Array {
//     (&self.pixels).into()
//   }
// }
