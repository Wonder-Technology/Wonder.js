let compute =
    (
      ~openEnded=false,
      ~thetaStart=0.0,
      ~thetaLength=2. *. Js.Math._PI,
      ~radius,
      ~height,
      ~radialSegments,
      ~heightSegments,
      (),
    ) =>
  ComputeCylinderPointsGeometryService.compute(
    ~openEnded,
    ~thetaStart,
    ~thetaLength,
    ~radiusTop=0.,
    ~radiusBottom=radius,
    ~height,
    ~radialSegments,
    ~heightSegments,
    (),
  );