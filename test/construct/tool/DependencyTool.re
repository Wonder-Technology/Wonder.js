open Sinon;

let injectAllDependencies = (~isDebug=true, ()) => {
  DirectorCPApService._injectDependencies();

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
