module RAB = {

let getArrayBufferFromBufferViews =
    (buffer, bufferView, bufferViews: array(RABType.bufferView)) => {
  let {byteOffset, byteLength}: RABType.bufferView =
    Array.unsafe_get(bufferViews, bufferView);

  buffer
  |> Js.Typed_array.ArrayBuffer.slice(
       ~start=byteOffset,
       ~end_=byteOffset + byteLength,
     );
};
}
