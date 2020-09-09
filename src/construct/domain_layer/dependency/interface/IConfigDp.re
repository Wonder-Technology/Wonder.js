type otherConfig = {getIsDebug: unit => bool};

type poConfig = {
  getTransformCount: unit => int,
  getPBRMaterialCount: unit => int,
  getGeometryPointCount: unit => int,
  getGeometryCount: unit => int,
  getDirectionLightCount: unit => int,
};
