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

let prepareIMGUI = state => {
  let state = AssetIMGUITool.prepareFontAsset(state^);

  let state = prepareFntData(state);

  let state = MainStateTool.setState(state);
  let state = BrowserDetectTool.setChrome();

  let canvasDom = EventTool.buildFakeCanvas((0, 0, Js.Nullable.undefined));
  let state = ViewTool.setCanvas(canvasDom |> Obj.magic, state);

  state;
};

let prepareGl = (sandbox, state) => {
  let array_buffer = 1;
  let dynamic_draw = 2;
  let getExtension = WonderImgui.RenderIMGUITool.buildNoVAOExtension(sandbox);
  let bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(
         WonderImgui.FakeGlTool.buildFakeGl(
           ~sandbox,
           ~array_buffer,
           ~bufferData,
           ~dynamic_draw,
           ~getExtension,
           (),
         ),
       );

  (state, array_buffer, dynamic_draw, bufferData);
};