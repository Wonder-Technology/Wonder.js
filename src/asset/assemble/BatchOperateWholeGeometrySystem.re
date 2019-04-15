open WDType;

open Js.Typed_array;

let _getBufferData =
    (
      {accessors, bufferViews, buffers},
      (accessorIndex, dataViewArr, bytes_per_element),
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not support interleaved buffer data|j},
                ~actual={j|is interleaved|j},
              ),
              () => {
                let accessor = Array.unsafe_get(accessors, accessorIndex);
                let {byteStride} =
                  Array.unsafe_get(bufferViews, accessor.bufferView);

                byteStride |> OptionService.isJsonSerializedValueNone ?
                  assertPass() :
                  byteStride
                  |> OptionService.unsafeGetJsonSerializedValue
                  == BufferUtils.getAccessorTypeSize(accessor.type_)
                  * bytes_per_element;
              },
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let accessor = Array.unsafe_get(accessors, accessorIndex);
  let bufferView = Array.unsafe_get(bufferViews, accessor.bufferView);
  let dataView = Array.unsafe_get(dataViewArr, bufferView.buffer);

  let offset = accessor.byteOffset + bufferView.byteOffset;

  (
    dataView |> DataView.buffer,
    offset,
    BufferUtils.computeTypeArrayLengthByAccessorData(
      accessor.count,
      accessor.type_,
    ),
  );
};

let _getBufferPointData =
    (
      (accessorIndex, bytes_per_element, dataViewArr, wd),
      fromBufferRangeFunc,
    ) => {
  let (arrayBuffer, offset, length) =
    _getBufferData(wd, (accessorIndex, dataViewArr, bytes_per_element));

  fromBufferRangeFunc(arrayBuffer, ~offset, ~length);
};

let getBufferAttributeData = (accessorIndex, dataViewArr, wd) =>
  _getBufferPointData(
    (accessorIndex, Float32Array._BYTES_PER_ELEMENT, dataViewArr, wd),
    Float32Array.fromBufferRange,
  );

let getAccessorComponentType = ({accessors}, accessorIndex) => {
  let accessor = Array.unsafe_get(accessors, accessorIndex);

  accessor.componentType;
};

let getBufferIndex16Data = (componentType, accessorIndex, dataViewArr, wd) =>
  switch (componentType) {
  | UNSIGNED_BYTE =>
    Uint16Array.from(
      _getBufferPointData(
        (accessorIndex, Uint8Array._BYTES_PER_ELEMENT, dataViewArr, wd),
        Uint8Array.fromBufferRange,
      )
      |> Obj.magic,
    )
    ->Some
  | UNSIGNED_SHORT =>
    _getBufferPointData(
      (accessorIndex, Uint16Array._BYTES_PER_ELEMENT, dataViewArr, wd),
      Uint16Array.fromBufferRange,
    )
    ->Some
  | _ => None
  };

let getBufferIndex32Data = (componentType, accessorIndex, dataViewArr, wd) =>
  switch (componentType) {
  | UNSIGNED_INT =>
    _getBufferPointData(
      (accessorIndex, Uint32Array._BYTES_PER_ELEMENT, dataViewArr, wd),
      Uint32Array.fromBufferRange,
    )
    ->Some
  | _ => None
  };