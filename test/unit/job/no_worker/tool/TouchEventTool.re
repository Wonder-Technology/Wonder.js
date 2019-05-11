open StateDataMainType;

open EventType;

let setLastXY = HandleTouchEventMainService.setLastXY;

let getIsDrag = HandleTouchEventMainService.getIsDrag;

let setIsDrag = HandleTouchEventMainService.setIsDrag;

let buildTouchData = (~pageX=10, ~pageY=20, ()) => {
  "clientX": 0,
  "clientY": 0,
  "pageX": pageX,
  "pageY": pageY,
  "identifier": 0,
  "screenX": 0,
  "screenY": 0,
  "radiusX": 0,
  "radiusY": 0,
  "rotationAngle": 0,
  "force": 0,
};

let buildTouchEvent =
    (
      ~touches=[|buildTouchData()|],
      ~changedTouches=[|buildTouchData()|],
      ~targetTouches=[|buildTouchData()|],
      ~preventDefaultFunc=() => (),
      ~stopPropagationFunc=() => (),
      (),
    ) => {
  "touches": touches,
  "changedTouches": changedTouches,
  "targetTouches": targetTouches,
  "preventDefault": preventDefaultFunc,
  "stopPropagation": stopPropagationFunc,
};

let prepareWithState =
    (
      ~sandbox,
      ~state,
      ~offsetLeft=1,
      ~offsetTop=2,
      ~offsetParent=Js.Nullable.undefined,
      ~setBrowserFunc=BrowserDetectTool.setChrome,
      (),
    ) => {
  let canvasDom =
    EventTool.buildFakeCanvas((offsetLeft, offsetTop, offsetParent));

  let state = ViewTool.setCanvas(canvasDom |> Obj.magic, state);

  MainStateTool.setState(state) |> ignore;

  setBrowserFunc();

  MainStateTool.unsafeGetState();
};

let prepare =
    (
      ~sandbox,
      ~offsetLeft=1,
      ~offsetTop=2,
      ~offsetParent=Js.Nullable.undefined,
      ~setBrowserFunc=BrowserDetectTool.setAndroid,
      (),
    ) => {
  let canvasDom =
    EventTool.buildFakeCanvas((offsetLeft, offsetTop, offsetParent));

  let state =
    TestTool.initWithJobConfigWithoutBuildFakeDom(
      ~sandbox,
      ~noWorkerJobRecord=
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines=
            {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_event"
        }
      ]
    }
  ]
        |},
          ~initJobs=
            {j|
[

    {
          "name": "init_event"
    }
]
        |j},
          (),
        ),
      (),
    );

  let state = ViewTool.setCanvas(canvasDom |> Obj.magic, state);

  MainStateTool.setState(state) |> ignore;

  setBrowserFunc();

  MainStateTool.unsafeGetState();
};