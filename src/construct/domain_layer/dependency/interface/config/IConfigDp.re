type otherConfig = {getIsDebug: unit => bool};

type poConfig = {
  getTransformCount: unit => int,
  getBSDFMaterialCount: unit => int,
  getGeometryPointCount: unit => int,
  getGeometryCount: unit => int,
  getDirectionLightCount: unit => int,
};
