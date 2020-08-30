open Wonder_jest;

let _ =
  describe("test update_transform job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~runPipelineData={
          name: "run",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "update_transform", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("update all transforms", () => {
      testPromise("test", () => {
        open TransformRunAPI;

        let parent = create()->ResultTool.getExnSuccessValue;
        let child = create()->ResultTool.getExnSuccessValue;
        let pos1 = (1., 2., 3.)->PositionTool.create;
        let pos2 = (5., 10., 30.)->PositionTool.create;
        setParent(parent, child)->ResultTool.getExnSuccessValue;
        setLocalPosition(parent, pos1)->ResultTool.getExnSuccessValue;
        setLocalPosition(child, pos2)->ResultTool.getExnSuccessValue;

        DirectorCPTool.initAndRun(
          ~handleSuccessFunc=
            () => {
              getPosition(child)->expect == PositionTool.add(pos1, pos2)
            },
          (),
        );
      })
    });
  });
