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
      ~fontAlign=WonderImgui.FontType.Center,
      ~fontColor=[|1., 1., 1.|],
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
             fontAlign,
             fontColor,
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

  let state = state |> BrowserDetectTool.setChrome;

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

let judgeCustomTextureProgramPositionBufferData =
    (bufferData, bufferDataCallCountAfterInit, targetData) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          bufferData
          |> getCall(bufferDataCallCountAfterInit + 0)
          |> getSpecificArg(1)
          |> Array.of_list
          |> expect == targetData
        )
      )
    )
  );

let judgeNoTextureProgramColorBufferData =
    (bufferData, bufferDataCallCountAfterInit) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          bufferData
          |> getCall(bufferDataCallCountAfterInit + 9)
          |> getSpecificArg(1)
          |> Array.of_list
          |> expect == [|0.5, 1., 2., 0.5, 1., 2., 0.5, 1., 2., 0.5, 1., 2.|]
        )
      )
    )
  );