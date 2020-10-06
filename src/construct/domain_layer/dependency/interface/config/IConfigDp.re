type otherConfig = {getIsDebug: unit => bool};

type poConfig = {
  getTransformCount: unit => int,
  getBRDFMaterialCount: unit => int,
  getGeometryPointCount: unit => int,
  getGeometryCount: unit => int,
  getDirectionLightCount: unit => int,
};
