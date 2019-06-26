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
        globalTempRecord,
      } as state: StateRenderType.renderState,
    ) => {
  cameraRecord,
  basicMaterialRecord,
  lightMaterialRecord,
  directionLightRecord,
  pointLightRecord,
  transformRecord,
  globalTempRecord,
  jobDataRecord: {
    outlineData: {
      outlineColor:
        OperateRenderJobDataService.getOutlineColor(jobDataRecord),
    },
  },
};