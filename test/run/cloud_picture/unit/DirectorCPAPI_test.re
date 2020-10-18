open Wonder_jest;

let _ =
  describe("DirectorCPAPI", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      OtherConfigDpRunAPI.set({getIsDebug: () => true});
    });

    describe("prepare", () => {
      describe("create and set all components' po", () => {
        describe("create and set transform po", () => {
          test("should create localPositions", () => {
            let transformCount = 5;

            DirectorCPTool.prepare(~transformCount, ());

            TransformCPTool.getTransformPO().localPositions
            ->Js.Typed_array.Float32Array.length
            ->expect
            == transformCount
            * 3;
          })
        })
      });

      test("set picture size", () => {
        let pictureSize = (10, 20);

        DirectorCPTool.prepare(~pictureSize, ());

        PictureCPTool.getSize()->OptionSt.getExn->expect == pictureSize;
      });

      test("set sample count", () => {
        let sampleCount = 111;

        DirectorCPTool.prepare(~sampleCount, ());

        PassCPTool.getSampleCount()->expect == sampleCount;
      });
    });

    describe("fix bug", () => {
      test(
        "if create gameObject(should use gameObject repo dp) before init and after prepare, should not error",
        () => {
          let sampleCount = 111;

          DirectorCPTool.prepare(~sampleCount, ());

          GameObjectCPAPI.create()->ExpectTool.judgeResult;
        },
      )
    });
  });
