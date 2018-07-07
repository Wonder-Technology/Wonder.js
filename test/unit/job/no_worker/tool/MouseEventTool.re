open StateDataMainType;

let setLastXY = (lastX, lastY, {eventRecord} as state) => {
  ...state,
  eventRecord: MouseEventService.setLastXY(lastX, lastY, eventRecord),
};

let buildMouseEvent =
    (
      ~pageX=10,
      ~pageY=20,
      ~button=0,
      ~movementX=1,
      ~movementY=2,
      ~detail=Js.Nullable.undefined,
      ~wheelDelta=Js.Nullable.undefined,
      (),
    ) => {
  "pageX": pageX,
  "pageY": pageY,
  "button": button,
  "movementX": movementX,
  "movementY": movementY,
  "detail": detail,
  "wheelDelta": wheelDelta,
};

let setPointerLocked = [%raw () => {|
 document.pointerLockElement = {};
  |}];

let setNotPointerLocked = [%raw
  () => {|
 document.pointerLockElement = undefined;
  |}
];

let prepare =
    (
      ~sandbox,
      ~offsetLeft=1,
      ~offsetTop=2,
      ~offsetParent=Js.Nullable.undefined,
      ~setBrowserFunc=BrowserDetectTool.setChrome,
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