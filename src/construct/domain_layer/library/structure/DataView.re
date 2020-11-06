// open Js.Typed_array;

// let create = arrayBuffer => DataView.make(arrayBuffer);

// let buffer = dataView => dataView->DataView.buffer;

// let getFloat =
//   (. offset, dataView) => (
//     DataView.getFloat32LittleEndian(dataView, offset),
//     offset + 4,
//   );

// let getUint16_1 =
//   (. offset, dataView) => (
//     DataView.getUint16LittleEndian(dataView, offset),
//     offset + 2,
//   );

// let getUint32_1 =
//   (. offset, dataView) => (
//     DataView.getUint32LittleEndian(dataView, offset),
//     offset + 4,
//   );

// /* let getInt32_1BigEndian =
//    (. offset, dataView) => (DataView.getInt32(dataView, offset), offset + 4);

//     */

// let getUint8_1 = (offset, dataView) => (
//   DataView.getUint8(dataView, offset),
//   offset + 1,
// );

// let writeFloat =
//   (. value, offset, dataView) => {
//     DataView.setFloat32LittleEndian(dataView, offset, value);

//     offset + 4;
//   };

// let writeUint8_1 =
//   (. value, offset, dataView) => {
//     DataView.setUint8(dataView, offset, value);

//     offset + 1;
//   };

// let writeUint16_1 = (value, offset, dataView) => {
//   DataView.setUint16LittleEndian(dataView, offset, value);

//   offset + 2;
// };

// let writeUint32_1 = (value, offset, dataView) => {
//   DataView.setUint32LittleEndian(dataView, offset, value);

//   offset + 4;
// };

// /* let writeUint32_1BigEndian = (value, offset, dataView) => {
//      DataView.setUint32(dataView, offset, value);

//      offset + 4;
//    }; */
