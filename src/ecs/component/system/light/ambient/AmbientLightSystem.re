open AmbientLightType;

let create = (state: StateDataType.state) => [@bs] AmbientLightCreateCommon.create(state);

let getColor = (light, state: StateDataType.state) =>
  AmbientLightOperateCommon.getColor(light, state);

let setColor = (light, color, state: StateDataType.state) =>
  AmbientLightOperateCommon.setColor(light, color, state);

let getGameObject = AmbientLightGameObjectCommon.getGameObject;

let getLightData = AmbientLightStateCommon.getLightData;

let deepCopyForRestore = AmbientLightStateCommon.deepCopyForRestore;

let restore = AmbientLightStateCommon.restore;

let isAlive = AmbientLightDisposeComponentCommon.isAlive;

let getMappedIndex = LightIndexCommon.getMappedIndex;

let setMappedIndex = LightIndexCommon.setMappedIndex;

let getMappedIndexMap = AmbientLightIndexCommon.getMappedIndexMap