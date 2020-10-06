open Sinon;

let injectAllDependencies =
    (
      ~isDebug=true,
      ~transformCount=10,
      ~geometryPointCount=10,
      ~geometryCount=10,
      ~pbrMaterialCount=10,
      ~directionLightCount=2,
      (),
    ) => {
  DirectorCPApService._injectDependencies(
    ~transformCount,
    ~geometryPointCount,
    ~geometryCount,
    ~pbrMaterialCount,
    ~directionLightCount,
  );

  OtherConfigDpCPAPI.set({getIsDebug: () => isDebug});
};

let injectNetworkDp =
    (
      ~sandbox,
      ~readImageFile=createEmptyStub(refJsObjToSandbox(sandbox^)),
      (),
    ) => {
  NetworkDpRunAPI.set({readImageFile: readImageFile});
};
