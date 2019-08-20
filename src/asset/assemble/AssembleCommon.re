let addChildrenToParent = (parent, children, (parentMap, childMap)) => (
  children
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. parentMap, child) =>
         WonderCommonlib.MutableSparseMapService.set(
           child,
           parent,
           parentMap,
         ),
       parentMap,
     ),
  WonderCommonlib.MutableSparseMapService.set(parent, children, childMap),
);

let getArrayBuffer =
    (binBuffer, bufferView, bufferViews: array(WDType.bufferView)) => {
  let {byteOffset, byteLength}: WDType.bufferView =
    Array.unsafe_get(bufferViews, bufferView);

  binBuffer
  |> Js.Typed_array.ArrayBuffer.slice(
       ~start=byteOffset,
       ~end_=byteOffset + byteLength,
     );
};