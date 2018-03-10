open PointLightType;

let create = (state: StateDataType.state) => [@bs] PointLightCreateCommon.create(state);

let getColor = (light, state: StateDataType.state) =>
  PointLightOperateCommon.getColor(light, state);

let setColor = (light, color, state: StateDataType.state) =>
  PointLightOperateCommon.setColor(light, color, state);

let getIntensity = (light, state: StateDataType.state) =>
  PointLightOperateCommon.getIntensity(light, state);

let setIntensity = (light, intensity, state: StateDataType.state) =>
  PointLightOperateCommon.setIntensity(light, intensity, state);

let getConstant = (light, state: StateDataType.state) =>
  PointLightOperateCommon.getConstant(light, state);

let setConstant = (light, constant, state: StateDataType.state) =>
  PointLightOperateCommon.setConstant(light, constant, state);

let getLinear = (light, state: StateDataType.state) =>
  PointLightOperateCommon.getLinear(light, state);

let setLinear = (light, linear, state: StateDataType.state) =>
  PointLightOperateCommon.setLinear(light, linear, state);

let getQuadratic = (light, state: StateDataType.state) =>
  PointLightOperateCommon.getQuadratic(light, state);

let setQuadratic = (light, quadratic, state: StateDataType.state) =>
  PointLightOperateCommon.setQuadratic(light, quadratic, state);

let getRange = (light, state: StateDataType.state) =>
  PointLightOperateCommon.getRange(light, state);

let setRange = (light, range, state: StateDataType.state) =>
  PointLightOperateCommon.setRange(light, range, state);

let setRangeLevel = (light, level, state: StateDataType.state) =>
  PointLightOperateCommon.setRangeLevel(light, level, state);

let getGameObject = PointLightGameObjectCommon.getGameObject;

let unsafeGetGameObject = PointLightGameObjectCommon.unsafeGetGameObject;

let getLightData = PointLightStateCommon.getLightData;

let deepCopyForRestore = PointLightStateCommon.deepCopyForRestore;

let restore = PointLightStateCommon.restore;

let isAlive = PointLightDisposeComponentCommon.isAlive;

let getMappedIndex = LightIndexCommon.getMappedIndex;

let setMappedIndex = LightIndexCommon.setMappedIndex;

let getMappedIndexMap = PointLightIndexCommon.getMappedIndexMap;

let getLightCount = (state: StateDataType.state) =>
  LightSystem.getLightCount(
    PointLightStateCommon.getLightData(state).index,
    PointLightHelper.getBufferMaxCount()
  );