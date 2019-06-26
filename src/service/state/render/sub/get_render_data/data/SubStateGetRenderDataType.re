open RenderBasicMaterialType;

open RenderLightMaterialType;

open RenderDirectionLightType;

open RenderPointLightType;

open RenderTransformType;

open GetRenderDataJobDataType;

open AllGlobalTempType;

type getRenderDataSubState = {
  cameraRecord: option(AllRenderCameraType.renderCameraRecord),
  basicMaterialRecord,
  lightMaterialRecord,
  directionLightRecord,
  pointLightRecord,
  transformRecord,
  jobDataRecord,
  globalTempRecord,
};