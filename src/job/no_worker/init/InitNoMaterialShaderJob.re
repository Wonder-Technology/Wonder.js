open StateDataMainType;

let execJob = (_, state) => {
  let _initState =
    InitNoMaterialShaderJobUtils.exec(
      AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
      CreateInitNoMaterialShaderStateMainService.createInitNoMaterialShaderState(
        state,
      ),
    );

  state;
};