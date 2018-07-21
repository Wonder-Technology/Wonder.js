open StateDataMainType;

let _setEventHandleFunc = (cameraController, handleFunc, eventHandleFuncMap) => {
  eventHandleFuncMap |> SparseMapService.getValidValues |> SparseMapService.length > 0 ?
    WonderLog.Log.warn(
      {j|expect only has one arcballCameraController, but actual > 1. please dispose others.|j},
    ) :
    ();

  eventHandleFuncMap
  |> WonderCommonlib.SparseMapService.set(cameraController, handleFunc);
};

let setPointDragEventHandleFunc =
    (cameraController, handleFunc, {pointDragEventHandleFuncMap} as record) => {
  ...record,
  pointDragEventHandleFuncMap:
    _setEventHandleFunc(
      cameraController,
      handleFunc,
      pointDragEventHandleFuncMap,
    ),
};

let setPointScaleEventHandleFunc =
    (cameraController, handleFunc, {pointScaleEventHandleFuncMap} as record) => {
  ...record,
  pointScaleEventHandleFuncMap:
    _setEventHandleFunc(
      cameraController,
      handleFunc,
      pointScaleEventHandleFuncMap,
    ),
};

let setKeydownEventHandleFunc =
    (cameraController, handleFunc, {keydownEventHandleFuncMap} as record) => {
  ...record,
  keydownEventHandleFuncMap:
    _setEventHandleFunc(
      cameraController,
      handleFunc,
      keydownEventHandleFuncMap,
    ),
};