open RenderBasicMaterialType;

open RenderLightMaterialType;

open RenderDirectionLightType;

open RenderPointLightType;

open RenderTransformType;

type getRenderDataSubState = {
  cameraRecord: option(RenderCameraType.renderCameraRecord),
  basicMaterialRecord,
  lightMaterialRecord,
  directionLightRecord,
  pointLightRecord,
  transformRecord,
};