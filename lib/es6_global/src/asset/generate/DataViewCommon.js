


function create(arrayBuffer) {
  return new DataView(arrayBuffer);
}

function getFloat(offset, dataView) {
  return /* tuple */[
          dataView.getFloat32(offset, 1),
          offset + 4 | 0
        ];
}

function getUint16_1(offset, dataView) {
  return /* tuple */[
          dataView.getUint16(offset, 1),
          offset + 2 | 0
        ];
}

function getUint32_1(offset, dataView) {
  return /* tuple */[
          dataView.getUint32(offset, 1),
          offset + 4 | 0
        ];
}

function getUint8_1(offset, dataView) {
  return /* tuple */[
          dataView.getUint8(offset),
          offset + 1 | 0
        ];
}

function writeUint8_1(value, offset, dataView) {
  dataView.setUint8(offset, value);
  return offset + 1 | 0;
}

function writeUint16_1(value, offset, dataView) {
  dataView.setUint16(offset, value, 1);
  return offset + 2 | 0;
}

function writeUint32_1(value, offset, dataView) {
  dataView.setUint32(offset, value, 1);
  return offset + 4 | 0;
}

export {
  create ,
  getFloat ,
  getUint16_1 ,
  getUint32_1 ,
  getUint8_1 ,
  writeUint8_1 ,
  writeUint16_1 ,
  writeUint32_1 ,
  
}
/* No side effect */
