open StateDataMainType;

let setLastXY = HandleMouseEventMainService.setLastXY;

let getIsDrag = HandleMouseEventMainService.getIsDrag;

let setIsDrag = HandleMouseEventMainService.setIsDrag;

let buildMouseEvent =
    (
      ~pageX=10,
      ~pageY=20,
      ~which=0,
      ~movementX=1,
      ~movementY=2,
      ~detail=Js.Nullable.undefined,
      ~wheelDelta=Js.Nullable.undefined,
      ~preventDefaultFunc=() => (),
      ~stopPropagationFunc=() => (),
      (),
    ) => {
  "pageX": pageX,
  "pageY": pageY,
  "which": which,
  "movementX": movementX,
  "movementY": movementY,
  "detail": detail,
  "wheelDelta": wheelDelta,
  "preventDefault": preventDefaultFunc,
  "stopPropagation": stopPropagationFunc,
};

let setPointerLocked = [%raw () => {|
 document.pointerLockElement = {};
  |}];

let setNotPointerLocked = [%raw
  () => {|
 document.pointerLockElement = undefined;
  |}
];

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

  state |> setBrowserFunc;
};

let prepare =
    (
      ~sandbox,
      ~offsetLeft=1,
      ~offsetTop=2,
      ~offsetParent=Js.Nullable.undefined,
      ~setBrowserFunc=BrowserDetectTool.setChrome,
      (),
    ) =>
  prepareWithState(
    ~sandbox,
    ~offsetLeft,
    ~offsetTop,
    ~offsetParent,
    ~setBrowserFunc,
    ~state=
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
      ),
    (),
  );

let prepareForPointerLock = (sandbox, state) => {
  open Sinon;

  let canvas = ViewTool.unsafeGetCanvas(state) |> Obj.magic;
  let requestPointerLockStub = createEmptyStubWithJsObjSandbox(sandbox);
  canvas##requestPointerLock #= requestPointerLockStub;

  (state, requestPointerLockStub);
};