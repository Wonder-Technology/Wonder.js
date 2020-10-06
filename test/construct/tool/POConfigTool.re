let setAllCount =
    (
      ~transformCount=10,
      ~geometryPointCount=10,
      ~geometryCount=10,
      ~brdfMaterialCount=10,
      ~directionLightCount=2,
      (),
    ) => {
  DirectorCPApService._setAllBufferCount(
    ~transformCount,
    ~geometryPointCount,
    ~geometryCount,
    ~brdfMaterialCount,
    ~directionLightCount,
  );
};
