open WonderImgui.IMGUIType;

let buildEmptyCustomData = () => Obj.magic(-1);

let buildControlData = () => {
  radioButtonData: {
    isSelectedMap: WonderCommonlib.HashMapService.createEmpty(),
  },
  checkboxData: {
    index: 1,
    isSelectedMap: WonderCommonlib.SparseMapService.createEmpty(),
  },
  sliderData: {
    index: 3,
    valueMap:
      WonderCommonlib.SparseMapService.createEmpty()
      |> WonderCommonlib.SparseMapService.set(1, 2.),
  },
};

let buildControlDataAfterRenderIMGUI = buildedControlData => {
  radioButtonData: {
    isSelectedMap: WonderCommonlib.HashMapService.createEmpty(),
  },
  checkboxData: {
    index: 0,
    isSelectedMap: WonderCommonlib.SparseMapService.createEmpty(),
  },
  sliderData: {
    index: 0,
    valueMap:
      WonderCommonlib.SparseMapService.createEmpty()
      |> WonderCommonlib.SparseMapService.set(1, 2.),
  },
};

let isRenderWorkerControlDataEqualMainWorkerControlData =
    (renderWorkerControlData, mainWorkerControlData) =>
  /* renderWorkerControlData.sliderData.valueMap
     == mainWorkerControlData.sliderData.valueMap; */
  renderWorkerControlData
  == buildControlDataAfterRenderIMGUI(mainWorkerControlData);

let getMainWorkerControlData = state =>
  WonderImgui.RecordIMGUIService.getControlData(
    RecordIMGUIMainService.getWonderIMGUIRecord(state),
  );

let prepareForTestSendRenderData = sandbox =>
  SendRenderDataMainWorkerTool.prepareForTestSendRenderData(sandbox);

let prepareForTestInRenderWorkerJob = sandbox => {
  open Sinon;

  let (state, (fntData, bitmap, setting, _), (_, context)) =
    IMGUIRenderWorkerTool.prepareSetData(sandbox);
  let canvasWidth = 100;
  let canvasHeight = 200;
  let state =
    ViewTool.setCanvas(
      {"width": canvasWidth, "height": canvasHeight} |> Obj.magic,
      state,
    );
  let array_buffer = 1;
  let dynamic_draw = 2;
  let getExtension = WonderImgui.RenderIMGUITool.buildNoVAOExtension(sandbox);
  let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlWorkerTool.setFakeGl(
         FakeGlWorkerTool.buildFakeGl(
           ~sandbox,
           ~array_buffer,
           ~bufferData,
           ~dynamic_draw,
           ~getExtension,
           (),
         ),
       );
  MainStateTool.setState(state);
  BrowserDetectTool.setChrome();

  (state, bufferData);
};