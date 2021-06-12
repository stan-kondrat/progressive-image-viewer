pub struct BufferSlice<T> {
    phantom: std::marker::PhantomData<T>,
    _ptr: u32,
    _len: u32,
  }
  
  impl<T: wasm_bindgen::describe::WasmDescribe> wasm_bindgen::describe::WasmDescribe
    for BufferSlice<T>
  {
    fn describe() {
      wasm_bindgen::describe::inform(wasm_bindgen::describe::REF);
      wasm_bindgen::describe::inform(wasm_bindgen::describe::SLICE);
      T::describe();
    }
  }
  
  impl<T: wasm_bindgen::describe::WasmDescribe> wasm_bindgen::convert::IntoWasmAbi
    for BufferSlice<T>
  {
    type Abi = wasm_bindgen::convert::WasmSlice;
  
    #[inline]
    fn into_abi(self) -> wasm_bindgen::convert::WasmSlice {
      wasm_bindgen::convert::WasmSlice {
        ptr: self._ptr,
        len: self._len,
      }
    }
  }
  
  impl<T> std::convert::From<&Vec<T>> for BufferSlice<T> {
    fn from(vec: &Vec<T>) -> Self {
      let _ptr = vec.as_ptr() as u32;
      let _len = vec.len() as u32;
  
      Self {
        phantom: std::marker::PhantomData,
        _ptr,
        _len,
      }
    }
  }
  