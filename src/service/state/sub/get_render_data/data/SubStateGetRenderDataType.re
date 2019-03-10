open RenderBasicMaterialType;

open RenderLightMaterialType;

open RenderDirectionLightType;

open RenderPointLightType;

open RenderTransformType;

open GetRenderDataJobDataType;

open GlobalTempType;

type getRenderDataSubState = {
  cameraRecord: option(RenderCameraType.renderCameraRecord),
  basicMaterialRecord,
  lightMaterialRecord,
  directionLightRecord,
  pointLightRecord,
  transformRecord,
  jobDataRecord,
  globalTempRecord,
};