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

let _makeEmptyAttributePoints = () => Float32Array.make([||]);

let _setIndexData = (geometry, (wd, dataViewArr, index), state) => {
  let componentType = getAccessorComponentType(wd, index);

  switch (getBufferIndex16Data(componentType, index, dataViewArr, wd)) {
  | Some(data) =>
    IndicesGeometryMainService.setIndicesByUint16Array(geometry, data, state)
  | None =>
    switch (getBufferIndex32Data(componentType, index, dataViewArr, wd)) {
    | Some(data) =>
      IndicesGeometryMainService.setIndicesByUint32Array(
        geometry,
        data,
        state,
      )
    | None =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_batchSetGeometryData",
          ~description={j|unknown componentType: $componentType|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    }
  };
};

let setGeometryData =
    (
      geometry,
      wd,
      dataViewArr,
      {position, normal, texCoord, index}: WDType.geometry,
      state,
    ) => {
  let state =
    VerticesGeometryMainService.setVerticesByTypeArray(
      geometry,
      getBufferAttributeData(position, dataViewArr, wd),
      state,
    );

  let normals =
    normal |> OptionService.isJsonSerializedValueNone ?
      _makeEmptyAttributePoints() :
      getBufferAttributeData(
        normal |> OptionService.unsafeGetJsonSerializedValue,
        dataViewArr,
        wd,
      );

  let state =
    NormalsGeometryMainService.setNormalsByTypeArray(
      geometry,
      normals,
      state,
    );

  let texCoords =
    texCoord |> OptionService.isJsonSerializedValueNone ?
      _makeEmptyAttributePoints() :
      getBufferAttributeData(
        texCoord |> OptionService.unsafeGetJsonSerializedValue,
        dataViewArr,
        wd,
      );

  let state =
    TexCoordsGeometryMainService.setTexCoordsByTypeArray(
      geometry,
      texCoords,
      state,
    );

  let state = _setIndexData(geometry, (wd, dataViewArr, index), state);

  state;
};