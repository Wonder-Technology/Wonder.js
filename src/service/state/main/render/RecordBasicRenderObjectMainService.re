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
    |> CreateTypeArrayRenderObjectService.setAllTypeArrDataToDefault(count)
  )
};

let create = ({settingRecord} as state) => {
  let basicMaterialCount =
    BufferSettingService.getBasicMaterialCount(settingRecord);
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
    _initBufferData(basicMaterialCount);
  Some({
    buffer,
    count: basicMaterialCount,
    transformIndices,
    materialIndices,
    geometryIndices,
    sourceInstanceIndices,
    geometryTypes
  })
};