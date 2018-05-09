open Js.Typed_array;

let getDefaultWidth = () => 0;

let getDefaultHeight = () => 0;

let getNeedUpdate = () => 1;

let getNotNeedUpdate = () => 0;

let getDefaultIsNeedUpdate = () => getNeedUpdate();

let getWidthsSize = () => 1;

let getHeightsSize = () => 1;

let getIsNeedUpdatesSize = () => 1;

let getWidthsLength = (count) => count * getWidthsSize();

let getWidthsOffset = (count) => 0;

let getWidthIndex = (index) => index * getWidthsSize();

let getHeightsLength = (count) => count * getHeightsSize();

let getHeightsOffset = (count) =>
  getWidthsOffset(count) + getWidthsLength(count) * Uint16Array._BYTES_PER_ELEMENT;

let getHeightIndex = (index) => index * getHeightsSize();

let getIsNeedUpdatesLength = (count) => count * getIsNeedUpdatesSize();

let getIsNeedUpdatesOffset = (count) =>
  getHeightsOffset(count) + getHeightsLength(count) * Uint16Array._BYTES_PER_ELEMENT;

let getIsNeedUpdateIndex = (index) => index * getIsNeedUpdatesSize();

let getTotalByteLength = (count) =>
  count
  * (
    Uint16Array._BYTES_PER_ELEMENT
    * (getWidthsSize() + getHeightsSize())
    + Uint8Array._BYTES_PER_ELEMENT
    * getIsNeedUpdatesSize()
  );

let createBuffer = (count) => Worker.newSharedArrayBuffer(getTotalByteLength(count));