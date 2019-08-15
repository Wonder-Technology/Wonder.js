open StateDataMainType;

let buildKeyboardEvent =
    (
      ~ctrlKey=false,
      ~altKey=false,
      ~shiftKey=false,
      ~metaKey=false,
      ~keyCode=8,
      (),
    ) => {
  "ctrlKey": ctrlKey,
  "altKey": altKey,
  "shiftKey": shiftKey,
  "metaKey": metaKey,
  "keyCode": keyCode,
};

let prepare =
    (
      ~sandbox,
      /* ~offsetLeft=1,
         ~offsetTop=2,
         ~offsetParent=Js.Nullable.undefined, */
      ~setBrowserFunc=BrowserDetectTool.setChrome,
      (),
    ) => {
  let canvasDom = EventTool.buildFakeCanvas((0, 0, Js.Nullable.null));

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

  state |> setBrowserFunc;
};