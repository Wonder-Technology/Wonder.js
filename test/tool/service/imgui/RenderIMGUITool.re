open StateDataMainType;

let prepareFntData = state => {
  ...state,
  imguiRecord: {
    ...state.imguiRecord,
    wonderImguiIMGUIRecord:
      WonderImgui.RenderIMGUITool.prepareFntData(
        RecordIMGUIMainService.getWonderIMGUIRecord(state),
      ),
  },
};

let setDefaultSkinData =
    (
      ~state,
      ~buttonColor=[|0.35, 0.1, 0.1|],
      ~hoverButtonColor=[|0.35, 0.1, 0.1|],
      ~clickButtonColor=[|0.35, 0.1, 0.1|],
      ~buttonImage=Js.Nullable.null,
      ~hoverButtonImage=Js.Nullable.null,
      ~clickButtonImage=Js.Nullable.null,
      (),
    ) =>
  WonderImgui.(
    ManageIMGUIMainService.getRecord(state)
    |> ExtendIMGUIAPI.setSkinData(
         ExtendIMGUIAPI.getDefaultSkinName(),
         ExtendIMGUIAPI.setButtonSkinData(
           ExtendIMGUIAPI.createButtonSkinData(
             buttonColor,
             hoverButtonColor,
             clickButtonColor,
             buttonImage,
             hoverButtonImage,
             clickButtonImage,
           ),
           ExtendIMGUIAPI.unsafeGetDefaultSkinData(
             ManageIMGUIMainService.getRecord(state),
           ),
         ),
       )
    |> ManageIMGUIMainService.setRecord(_, state)
  );