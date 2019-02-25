let prepareMouseEvent = sandbox => {
  let state =
    MouseEventTool.prepareWithState(
      ~sandbox,
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
        },
        {
          "name": "init_camera"
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
    },
        {
          "name": "init_camera"
        }
]
        |j},
              (),
            ),
          (),
        ),
      (),
    );
  MouseEventTool.setPointerLocked(.);
  state;
};

let prepareTouchEvent = sandbox => {
  let state =
    TouchEventTool.prepareWithState(
      ~sandbox,
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
        },
        {
          "name": "init_camera"
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
    },
        {
          "name": "init_camera"
        }
]
        |j},
              (),
            ),
          (),
        ),
      (),
    );

  state;
};

let prepareKeyboardEvent = sandbox => KeyboardEventTool.prepare(~sandbox, ());