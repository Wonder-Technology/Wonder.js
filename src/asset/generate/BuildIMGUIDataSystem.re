open StateDataMainType;

open SceneGraphType;

let _buildCustomControlData = state => {
  funcMap:
    ExtendIMGUIMainService.ExtendData.CustomControl.getFuncMap(state)
    |> SerializeAllIMGUIService.CustomControl.serializeFuncMap,
};

let _buildSkinData = state: ExtendIMGUIType.skinData => {
  allSkinDataMap:
    ExtendIMGUIMainService.ExtendData.Skin.getAllSkinDataMap(state)
    |> SerializeAllIMGUIService.Skin.serializeAllSkinDataMap,
};

let _buildExtendData = state => {
  customControlData: _buildCustomControlData(state),
  skinData: _buildSkinData(state),
};

let build = state => (
  ManageIMGUIMainService.getCustomData(state)
  |> SerializeService.serializeValueWithFunction,
  switch (ManageIMGUIMainService.getIMGUIFunc(state)) {
  | None => None
  | Some(imguiFunc) => imguiFunc |> SerializeService.serializeFunction
  },
  _buildExtendData(state),
);