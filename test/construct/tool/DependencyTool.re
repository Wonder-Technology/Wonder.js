let injectAllDependencies = (~isDebug=true, ()) => {
  DirectorCPApService._injectDependencies();


  OtherConfigDpCPAPI.set({getIsDebug: () => isDebug});
};
