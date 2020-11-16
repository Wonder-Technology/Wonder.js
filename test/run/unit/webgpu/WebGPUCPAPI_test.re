open Wonder_jest;

let _ =
  describe("WebGPUCPAPI", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(~sandbox, ());
    });

    describe("getTextureArrayLayerSize", () => {
      test("test default", () => {
        WebGPUCPAPI.getTextureArrayLayerSize()->expect == (2048, 2048)
      })
    });

    describe("setTextureArrayLayerSize", () => {
      test("set layer width, height", () => {
        let (width, height) = (4096, 512);

        WebGPUCPAPI.setTextureArrayLayerSize(width, height);

        WebGPUCPAPI.getTextureArrayLayerSize()->expect == (width, height);
      })
    });
  });
