let prepare = sandbox => {
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