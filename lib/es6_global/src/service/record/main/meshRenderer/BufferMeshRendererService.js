

import * as Caml_int32 from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../external/Worker.js";

function getDefaultDrawMode(param) {
  return /* Triangles */4;
}

function getRender(param) {
  return /* Render */1;
}

function getNotRender(param) {
  return /* Not_render */0;
}

function getDefaultIsRender(param) {
  return /* Render */1;
}

function getDrawModesSize(param) {
  return 1;
}

function getDrawModesLength(meshRendererCount) {
  return (meshRendererCount << 0);
}

function getDrawModesOffset(meshRendererCount) {
  return 0;
}

function getIsRendersSize(param) {
  return 1;
}

function getIsRendersLength(meshRendererCount) {
  return (meshRendererCount << 0);
}

function getIsRendersOffset(meshRendererCount) {
  return 0 + Caml_int32.imul((meshRendererCount << 0), Uint8Array.BYTES_PER_ELEMENT) | 0;
}

function getDrawModeIndex(index) {
  return (index << 0);
}

function getIsRenderIndex(index) {
  return (index << 0);
}

function getTotalByteLength(meshRendererCount) {
  return Caml_int32.imul(meshRendererCount, (Uint8Array.BYTES_PER_ELEMENT << 0) + (Uint8Array.BYTES_PER_ELEMENT << 0) | 0);
}

function createBuffer(meshRendererCount) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(meshRendererCount));
}

export {
  getDefaultDrawMode ,
  getRender ,
  getNotRender ,
  getDefaultIsRender ,
  getDrawModesSize ,
  getDrawModesLength ,
  getDrawModesOffset ,
  getIsRendersSize ,
  getIsRendersLength ,
  getIsRendersOffset ,
  getDrawModeIndex ,
  getIsRenderIndex ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* Worker-Wonderjs Not a pure module */
