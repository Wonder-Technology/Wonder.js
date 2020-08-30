open Wonder_jest;

let _ =
  describe("test create_all_po_ecs_buffers job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~initPipelineData={
          name: "init",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "create_all_po_ecs_buffers", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("create transform po", () => {
      testPromise("should create localPositions", () => {
        let transformCount = 5;
        POConfigCPTool.setTransformCount(transformCount);

        DirectorCPTool.init(
          ~handleSuccessFunc=
            () => {
              TransformCPTool.getTransformPO().localPositions
              ->Js.Typed_array.Float32Array.length
              ->expect
              == transformCount
              * 3
            },
          (),
        );
      })
    });
  });
