let setAllCount =
    (
      ~transformCount=10,
      ~geometryPointCount=10,
      ~geometryCount=10,
      ~bsdfMaterialCount=10,
      ~directionLightCount=2,
      (),
    ) => {
  DirectorCPApService._setAllBufferCount(
    ~transformCount,
    ~geometryPointCount,
    ~geometryCount,
    ~bsdfMaterialCount,
    ~directionLightCount,
  );
};
