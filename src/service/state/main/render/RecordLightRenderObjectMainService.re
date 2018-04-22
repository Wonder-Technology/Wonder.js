open StateDataMainType;

open Js.Typed_array;

open RenderObjectBufferTypeArrayService;

open RenderType;

let getRecord = ({lightRenderObjectRecord}) => lightRenderObjectRecord |> OptionService.unsafeGet;

let _initBufferData = (count) => {
  let buffer =
    Worker.newSharedArrayBuffer(
      count
      * (
        Uint32Array._BYTES_PER_ELEMENT
        * (getComponentSize() * 5)
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
  let lightMaterialDataBufferCount =
    BufferSettingService.getLightMaterialDataBufferCount(settingRecord);
  let (
    buffer,
    (transformIndices, materialIndices, geometryIndices, sourceInstanceIndices, geometryTypes)
  ) =
    _initBufferData(lightMaterialDataBufferCount);
  Some({
    buffer,
    count: lightMaterialDataBufferCount,
    transformIndices,
    materialIndices,
    geometryIndices,
    sourceInstanceIndices,
    geometryTypes
  })
};