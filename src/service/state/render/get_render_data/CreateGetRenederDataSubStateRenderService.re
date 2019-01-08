open SubStateGetRenderDataType;

let createState =
    (
      {
        cameraRecord,
        basicMaterialRecord,
        lightMaterialRecord,
        directionLightRecord,
        pointLightRecord,
        transformRecord,
      } as state: StateRenderType.renderState,
    ) => {
  cameraRecord,
  basicMaterialRecord,
  lightMaterialRecord,
  directionLightRecord,
  pointLightRecord,
  transformRecord,
};