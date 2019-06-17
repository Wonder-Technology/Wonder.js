open StateDataMainType;

open Js.Typed_array;

open RenderObjectBufferTypeArrayService;

open RenderType;

let getRecord = ({basicRenderObjectRecord}) =>
  basicRenderObjectRecord |> OptionService.unsafeGet;

let _initBufferData = count => {
  let buffer =
    Worker.newSharedArrayBuffer(
      count * (Uint32Array._BYTES_PER_ELEMENT * (getComponentSize() * 5)),
    );
  (
    buffer,
    CreateTypeArrayAllRenderObjectService.createTypeArrays(buffer, count)
    |> CreateTypeArrayAllRenderObjectService.setAllTypeArrDataToDefault(count),
  );
};

let create = ({settingRecord} as state) => {
  let basicMaterialCount =
    BufferSettingService.getBasicMaterialCount(settingRecord);
  let (
    buffer,
    (
      transformIndices,
      materialIndices,
      meshRendererIndices,
      geometryIndices,
      sourceInstanceIndices,
    ),
  ) =
    _initBufferData(basicMaterialCount);
  Some({
    buffer,
    renderIndexArray: [||],
    transformIndices,
    materialIndices,
    meshRendererIndices,
    geometryIndices,
    sourceInstanceIndices,
  });
};