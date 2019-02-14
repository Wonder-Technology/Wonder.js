open GLSLSenderPrimitiveType;

open RenderSceneType;

open RenderDirectionLightType;

open RenderPointLightType;

type sendRenderDataSubState = {
  vertexAttribHistoryArray,
  sceneRecord,
  directionLightRecord,
  pointLightRecord
};