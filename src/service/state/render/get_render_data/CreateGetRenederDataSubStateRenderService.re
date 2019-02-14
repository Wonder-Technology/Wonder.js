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
        jobDataRecord,
      } as state: StateRenderType.renderState,
    ) => {
  cameraRecord,
  basicMaterialRecord,
  lightMaterialRecord,
  directionLightRecord,
  pointLightRecord,
  transformRecord,
  jobDataRecord: {
    outlineData: {
      outlineColor:
        OperateRenderJobDataService.getOutlineColor(jobDataRecord),
    },
  },
};