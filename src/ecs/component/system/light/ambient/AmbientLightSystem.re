open AmbientLightType;

let create = (state: StateDataType.state) => [@bs] AmbientLightCreateCommon.create(state);

let getColor = (light, state: StateDataType.state) =>
  AmbientLightOperateCommon.getColor(light, state);

let setColor = (light, color, state: StateDataType.state) =>
  AmbientLightOperateCommon.setColor(light, color, state);

let getGameObject = AmbientLightGameObjectCommon.getGameObject;

let getLightData = AmbientLightStateCommon.getLightData;

let deepCopyStateForRestore = AmbientLightStateCommon.deepCopyStateForRestore;

let restore = AmbientLightStateCommon.restore;

let isAlive = AmbientLightDisposeComponentCommon.isAlive;

let isColorDirty = (light, state: StateDataType.state) =>
  AmbientLightOperateCommon.isColorDirty(light, state);

let cleanColorDirty = (light, state: StateDataType.state) =>
  AmbientLightOperateCommon.cleanColorDirty(light, state);