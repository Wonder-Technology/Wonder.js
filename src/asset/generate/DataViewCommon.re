open Js.Typed_array;

let create = arrayBuffer => DataView.make(arrayBuffer);

let getFloat =
  (. offset, dataView) => (
    DataView.getFloat32LittleEndian(dataView, offset),
    offset + 4,
  );

let getUint16_1 =
  (. offset, dataView) => (
    DataView.getUint16LittleEndian(dataView, offset),
    offset + 2,
  );

let getUint32_1 =
  (. offset, dataView) => (
    DataView.getUint32LittleEndian(dataView, offset),
    offset + 4,
  );

let getInt32_1 =
  (. offset, dataView) => (
    DataView.getInt32LittleEndian(dataView, offset),
    offset + 4,
  );

let writeFloat =
  (. value, offset, dataView) => {
    DataView.setFloat32LittleEndian(dataView, offset, value);
    /* (dataView, offset + 4); */
    offset + 4;
  };

let writeUint16_1 =
  (. value, offset, dataView) => {
    DataView.setUint16LittleEndian(dataView, offset, value);
    /* (dataView, offset + 2); */
    offset + 2;
  };