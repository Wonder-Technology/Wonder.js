open Js.Typed_array;

let getDefaultDrawMode = () => DrawModeType.Triangles;

let getDrawModesSize = () => 1;

let getDrawModesLength = meshRendererCount =>
  meshRendererCount * getDrawModesSize();

let getDrawModesOffset = meshRendererCount => 0;

let getDrawModeIndex = index => index * getDrawModesSize();

let getTotalByteLength = meshRendererCount =>
  meshRendererCount * Uint8Array._BYTES_PER_ELEMENT * getDrawModesSize();

let createBuffer = meshRendererCount =>
  Worker.newSharedArrayBuffer(getTotalByteLength(meshRendererCount));