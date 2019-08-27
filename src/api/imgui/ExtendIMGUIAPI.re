open StateDataMainType;

let hasCustomControl = ExtendIMGUIMainService.Extend.hasCustomControl;

let registerCustomControl = ExtendIMGUIMainService.ExtendData.CustomControl.registerCustomControl;

let removeCustomControl = ExtendIMGUIMainService.ExtendData.CustomControl.removeCustomControl;

let createAllCustomStyleData = WonderImgui.ExtendIMGUIAPI.createAllCustomStyleData;

let createSingleCustomStyleData = WonderImgui.ExtendIMGUIAPI.createSingleCustomStyleData;

let addCustomStyleData = WonderImgui.ExtendIMGUIAPI.addCustomStyleData;

let removeCustomStyleData = WonderImgui.ExtendIMGUIAPI.removeCustomStyleData;

let addSingleCustomStyleData = WonderImgui.ExtendIMGUIAPI.addSingleCustomStyleData;

let removeSingleCustomStyleData = WonderImgui.ExtendIMGUIAPI.removeSingleCustomStyleData;

let hasSkinData = ExtendIMGUIMainService.Extend.hasSkinData;

let addSkinData = ExtendIMGUIMainService.ExtendData.Skin.addSkinData;
/* (skinName, skinData, state) =>
   WonderImgui.ExtendIMGUIAPI.addSkinData(
     skinName,
     skinData,
     ManageIMGUIMainService.getRecord(state),
   )
   |> ManageIMGUIMainService.setRecord(_, state); */

let removeSkinData = ExtendIMGUIMainService.ExtendData.Skin.removeSkinData;
/* let removeSkinData = (skinName, state) =>
   WonderImgui.ExtendIMGUIAPI.removeSkinData(
     skinName,
     ManageIMGUIMainService.getRecord(state),
   )
   |> ManageIMGUIMainService.setRecord(_, state); */

let createSkinData = WonderImgui.ExtendIMGUIAPI.createSkinData;

let unsafeGetSkinData = (skinName, state) =>
  WonderImgui.ExtendIMGUIAPI.unsafeGetSkinData(
    skinName,
    ManageIMGUIMainService.getRecord(state),
  );

let unsafeGetDefaultSkinData = state =>
  WonderImgui.ExtendIMGUIAPI.unsafeGetDefaultSkinData(
    ManageIMGUIMainService.getRecord(state),
  );

let createDefaultSkinData = ExtendIMGUIMainService.ExtendData.Skin.createDefaultSkinData;

let setSkinData = ExtendIMGUIMainService.ExtendData.Skin.setSkinData;

/* let setSkinData = (skinName, skinData, state) =>
     WonderImgui.ExtendIMGUIAPI.setSkinData(
       skinName,
       skinData,
       ManageIMGUIMainService.getRecord(state),
     )
     |> ManageIMGUIMainService.setRecord(_, state);

   let clearAllSkins = state =>
     WonderImgui.ExtendIMGUIAPI.clearAllSkins(
       ManageIMGUIMainService.getRecord(state),
     )
     |> ManageIMGUIMainService.setRecord(_, state);

   let addDefaultSkinData = state =>
     WonderImgui.ExtendIMGUIAPI.addDefaultSkinData(
       ManageIMGUIMainService.getRecord(state),
     )
     |> ManageIMGUIMainService.setRecord(_, state); */

let getDefaultSkinName = WonderImgui.ExtendIMGUIAPI.getDefaultSkinName;

let getButtonSkinData = WonderImgui.ExtendIMGUIAPI.getButtonSkinData;

let setButtonSkinData = WonderImgui.ExtendIMGUIAPI.setButtonSkinData;

let createButtonSkinData = WonderImgui.ExtendIMGUIAPI.createButtonSkinData;

let createDefaultButtonSkinData = () =>
  WonderImgui.ExtendButton.Skin.createDefaultSkinData();