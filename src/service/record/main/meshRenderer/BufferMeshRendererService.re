open Js.Typed_array;

let getDefaultDrawMode = () => DrawModeType.Triangles;

let getRender = () =>
  MeshRendererType.Render |> MeshRendererType.isRenderToUint8;

let getNotRender = () =>
  MeshRendererType.Not_render |> MeshRendererType.isRenderToUint8;

let getDefaultIsRender = () => getRender();

let getDrawModesSize = () => 1;

let getDrawModesLength = meshRendererCount =>
  meshRendererCount * getDrawModesSize();

let getDrawModesOffset = meshRendererCount => 0;

let getIsRendersSize = () => 1;

let getIsRendersLength = meshRendererCount =>
  meshRendererCount * getIsRendersSize();

let getIsRendersOffset = meshRendererCount =>
  getDrawModesOffset(meshRendererCount)
  + getDrawModesLength(meshRendererCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getDrawModeIndex = index => index * getDrawModesSize();

let getIsRenderIndex = index => index * getIsRendersSize();

let getTotalByteLength = meshRendererCount =>
  meshRendererCount
  * (
    Uint8Array._BYTES_PER_ELEMENT
    * getDrawModesSize()
    + Uint8Array._BYTES_PER_ELEMENT
    * getIsRendersSize()
  );

let createBuffer = meshRendererCount =>
  Worker.newSharedArrayBuffer(getTotalByteLength(meshRendererCount));