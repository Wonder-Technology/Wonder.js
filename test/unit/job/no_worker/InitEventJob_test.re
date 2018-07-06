open Wonder_jest;

open EventType;

let _ =
  describe("InitEventJob", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _prepare =
        (
          ~offsetLeft=1,
          ~offsetTop=2,
          ~offsetParent=Js.Nullable.undefined,
          ~setBrowserFunc=BrowserDetectTool.setChrome,
          (),
        ) => {
      let canvasDom =
        EventTool.buildFakeCanvas((offsetLeft, offsetTop, offsetParent));

      state :=
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

      let state = ViewTool.setCanvas(canvasDom |> Obj.magic, state^);

      MainStateTool.setState(state) |> ignore;

      setBrowserFunc();

      MainStateTool.unsafeGetState();
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("bind dom event", () =>
      describe("bind mouse event", () =>
        describe("bind mousedown event", () =>
          test("test bind", () => {
            let state = _prepare();
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);
            let state =
              ManageEventAPI.onDomEvent(
                MouseDown,
                0,
                (event: mouseEvent, state) => {
                  let (x, y) = event.location;
                  value := value^ + x + y;
                  state;
                },
                state,
              );

            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              EventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
            );

            value^ |> expect == 10 + 20;
          })
        )
      )
    );
    /* describe(
       "test mouse event",
       (
       () => {
         describe(
         "test locationInView",
         (
         () => {
           test(
           "test view has offsetParent",
           (
           () => {

           })
           );

         })
         );

       })
       );

       */
    /* describe
       ("if browser is not chrome and firefox, fatal",
       (
       () => {

       })
       ); */
    /* describe
       ("bind mouseup event",
       (
       () => {

       })
       ); */
    /* describe
       ("bind dom event to trigger point event",
       (
       () => {

       })
       ); */
  });