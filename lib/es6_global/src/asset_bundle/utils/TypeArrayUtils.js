


function convertFloat32ToUint8(float32Arr) {
  return new Uint8Array(float32Arr.buffer, float32Arr.byteOffset, float32Arr.byteLength);
}

function convertUint16ToUint8(uint16Arr) {
  return new Uint8Array(uint16Arr.buffer, uint16Arr.byteOffset, uint16Arr.byteLength);
}

function convertUint32ToUint8(uint32Arr) {
  return new Uint8Array(uint32Arr.buffer, uint32Arr.byteOffset, uint32Arr.byteLength);
}

export {
  convertFloat32ToUint8 ,
  convertUint16ToUint8 ,
  convertUint32ToUint8 ,
  
}
/* No side effect */
