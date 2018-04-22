open StateDataMainType;

open Js.Typed_array;

open RenderObjectBufferTypeArrayService;

open RenderType;

let getRecord = ({basicRenderObjectRecord}) => basicRenderObjectRecord |> OptionService.unsafeGet;

let _initBufferData = (count) => {
  let buffer =
    Worker.newSharedArrayBuffer(
      count
      * (
        Uint32Array._BYTES_PER_ELEMENT
        * (getComponentSize() * 4)
        + Uint8Array._BYTES_PER_ELEMENT
        * getGeometryTypeSize()
      )
    );
  (
    buffer,
    CreateTypeArrayRenderObjectService.createTypeArrays(buffer, count)
    |> CreateTypeArrayRenderObjectService.setDefaultTypeArrData(count)
  )
};

let create = ({settingRecord} as state) => {
  let basicMaterialDataBufferCount =
    BufferSettingService.getBasicMaterialDataBufferCount(settingRecord);
  let (
    buffer,
    (
      transformIndices,
      materialIndices,
      geometryIndices,
      sourceInstanceIndices,
      geometryTypes
    )
  ) =
    _initBufferData(basicMaterialDataBufferCount);
  Some({
    buffer,
    count: basicMaterialDataBufferCount,
    transformIndices,
    materialIndices,
    geometryIndices,
    sourceInstanceIndices,
    geometryTypes
  })
};