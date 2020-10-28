open Wonder_jest;

let _ =
  describe("test pipeline api", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("get/set pipeline stream", () => {
      test("test", () => {
        let (pipeline, pipelineStream) =
          (
            {
              name: "init",
              firstGroup: "frame",
              groups: [{name: "frame", link: Concat, elements: []}],
            }: PipelineVOType.pipelineData
          )
          ->PipelineRunAPI.parsePipelineData
          ->ResultTool.getExnSuccessValue;

        PipelineRunAPI.setPipelineStream(pipeline, pipelineStream);

        PipelineRunAPI.getPipelineStream(pipeline)->expect
        == pipelineStream->Some;
      })
    });

    describe("exec pipeline stream", () => {
      let _createJob = (~jobName, ~execFunc) => {
        (jobName->JobEntity.create, execFunc);
      };

      let _execPipelineStream =
          (
            ~pipelineData,
            ~handleSuccessFunc,
            ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
            (),
          ) => {
        let (_, pipelineStream) =
          pipelineData
          ->PipelineRunAPI.parsePipelineData
          ->ResultTool.getExnSuccessValue;

        PipelineTool.execPipelineStream(
          ~pipelineStream,
          ~handleSuccessFunc,
          ~handleFailFunc,
          (),
        );
      };

      testPromise("test exec single job success", () => {
        let x = ref(-1);
        let value = 10;

        PipelineTool.registerJobs(
          ~jobs=[
            _createJob(~jobName="job1", ~execFunc=() => {
              x := value;

              Result.succeed()->WonderBsMost.Most.just;
            }),
          ],
          (),
        );

        _execPipelineStream(
          ~pipelineData={
                          name: "init",
                          firstGroup: "frame",
                          groups: [
                            {
                              name: "frame",
                              link: Concat,
                              elements: [{name: "job1", type_: Job}],
                            },
                          ],
                        }: PipelineVOType.pipelineData,
          ~handleSuccessFunc=() => {(x^)->expect == value},
          (),
        );
      });
      // TODO test merge jobs
      testPromise("test concat two jobs", () => {
        let x = ref(-1);
        let value1 = 1;
        let value2 = 2;
        PipelineTool.registerJobs(
          ~jobs=[
            _createJob(~jobName="job2", ~execFunc=() => {
              x := value2;

              Result.succeed()->WonderBsMost.Most.just;
            }),
            _createJob(~jobName="job1", ~execFunc=() => {
              x := value1;

              Result.succeed()->WonderBsMost.Most.just;
            }),
          ],
          (),
        );

        _execPipelineStream(
          ~pipelineData={
                          name: "init",
                          firstGroup: "frame",
                          groups: [
                            {
                              name: "frame",
                              link: Concat,
                              elements: [
                                {name: "job1", type_: Job},
                                {name: "job2", type_: Job},
                              ],
                            },
                          ],
                        }: PipelineVOType.pipelineData,
          ~handleSuccessFunc=() => {(x^)->expect == value2},
          (),
        );
      });
      testPromise("exec single job fail", () => {
        let message = "fail!";
        PipelineTool.registerJobs(
          ~jobs=[
            _createJob(~jobName="fail", ~execFunc=() => {
              Result.failWith(message)->WonderBsMost.Most.just
            }),
          ],
          (),
        );

        ExpectStreamTool.toFail(
          ~execFunc=
            _execPipelineStream(
              ~pipelineData={
                              name: "init",
                              firstGroup: "frame",
                              groups: [
                                {
                                  name: "frame",
                                  link: Concat,
                                  elements: [{name: "fail", type_: Job}],
                                },
                              ],
                            }: PipelineVOType.pipelineData,
            ),
          ~message,
        );
      });
      testPromise("if one job fail, then not exec the remain jobs", () => {
        let value = ref(0);
        let message = "fail";
        PipelineTool.registerJobs(
          ~jobs=[
            _createJob(~jobName="fail", ~execFunc=() => {
              Result.failWith(message)->WonderBsMost.Most.just
            }),
            _createJob(~jobName="do", ~execFunc=() => {
              value := 10;
              Result.succeed()->WonderBsMost.Most.just;
            }),
          ],
          (),
        );

        ExpectStreamTool.testAfterFail(
          ~execFunc=
            _execPipelineStream(
              ~pipelineData={
                              name: "init",
                              firstGroup: "frame",
                              groups: [
                                {
                                  name: "frame",
                                  link: Concat,
                                  elements: [
                                    {name: "fail", type_: Job},
                                    {name: "do", type_: Job},
                                  ],
                                },
                              ],
                            }: PipelineVOType.pipelineData,
            ),
          ~handleFunc=errMessage => {
          (errMessage, value^)->expect == (message, 0)
        });
      });
    });
  });
