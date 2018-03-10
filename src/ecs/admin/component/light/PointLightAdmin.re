let getLightData = PointLightSystem.getLightData;

let getColor = (index, state) => PointLightSystem.getColor(index, state);

let getIntensity = (index, state) => PointLightSystem.getIntensity(index, state);

let getConstant = (index, state) => PointLightSystem.getConstant(index, state);

let getLinear = (index, state) => PointLightSystem.getLinear(index, state);

let getQuadratic = (index, state) => PointLightSystem.getQuadratic(index, state);

let getRange = (index, state) => PointLightSystem.getRange(index, state);

let getPosition = (index, state) =>
  state |> LightAdmin.getPosition(PointLightSystem.unsafeGetGameObject(index, state));

let deepCopyForRestore = PointLightSystem.deepCopyForRestore;

let restore = PointLightSystem.restore;

let getLightCount = PointLightSystem.getLightCount;