open Wonder_jest;

let _ =
  describe("test detect gl job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let _buildNoWorkerJobConfig = () =>
      NoWorkerJobConfigTool.buildNoWorkerJobConfig(
        ~initPipelines=
          {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "detect_gl"
        }
      ]
    }
  ]
        |},
        ~initJobs=
          {|

[

        {
          "name": "detect_gl"
        }
]
        |},
        (),
      );
    let _exec = fakeGl => {
      let state =
        TestTool.initWithJobConfigWithoutBuildFakeDom(
          ~sandbox,
          ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
          (),
        )
        |> FakeGlTool.setFakeGl(fakeGl);

      TestTool.closeContractCheck();

      state |> DirectorTool.init;
    };
    let _setFakeGlData = [%bs.raw
      {|
               function(name, value, fakeGl){
                 fakeGl[name] = value;
                 return fakeGl;
               }
                |}
    ];
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("detect extension", () => {
      test("detect instanced_arrays", () => {
        let (_, fakeGl, _, _) =
          SettingTool.buildFakeDomForNotPassCanvasId(sandbox);

        let state = _exec(fakeGl);

        fakeGl##getExtension
        |> getCall(0)
        |> expect
        |> toCalledWith([|"ANGLE_instanced_arrays"|]);
      });
      test("detect element_index_uint", () => {
        let (_, fakeGl, _, _) =
          SettingTool.buildFakeDomForNotPassCanvasId(sandbox);

        let state = _exec(fakeGl);

        fakeGl##getExtension
        |> getCall(1)
        |> expect
        |> toCalledWith([|"OES_element_index_uint"|]);
      });
    });
    describe("detect capabilty", () => {
      describe("detect texture capability", () => {
        let _prepare = () => {
          open GPUDetectType;
          let (_, fakeGl, _, _) =
            SettingTool.buildFakeDomForNotPassCanvasId(sandbox);
          let maxTextureImageUnits = 4;
          let fakeGl =
            fakeGl
            |> _setFakeGlData("MAX_TEXTURE_IMAGE_UNITS", maxTextureImageUnits);
          let maxTextureUnit = 16;
          fakeGl##getParameter
          |> withOneArg(maxTextureImageUnits)
          |> returns(maxTextureUnit)
          |> ignore;
          (maxTextureUnit, fakeGl);
        };
        test("detect max texture unit", () => {
          let (maxTextureUnit, fakeGl) = _prepare();
          let state = _exec(fakeGl);
          GPUDetectTool.getRecord(state).maxTextureUnit
          |> expect == Some(maxTextureUnit);
        });
        /* describe("contract check", () =>
             test("maxTextureUnit should >= textureCountPerMaterial", () => {
               let (maxTextureUnit, fakeGl) = _prepare();
               expect(() =>
                 TestTool.initWithJobConfigWithoutBuildFakeDom(
                   ~sandbox,
                   ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
                   ~buffer=
                     SettingTool.buildBufferConfigStr(
                       ~textureCountPerMaterial=17,
                       (),
                     ),
                   (),
                 )
                 |> FakeGlTool.setFakeGl(fakeGl)
                 |> DirectorTool.init
               )
               |> toThrowMessage(
                    "expect maxTextureUnit:16 >= textureCountPerMaterial:17, but actual not",
                  );
             })
           ); */
      });
      describe("detect precision", () => {
        let _prepare = sandbox => {
          open GPUDetectType;
          let warn =
            createMethodStubWithJsObjSandbox(
              sandbox,
              Console.console,
              "warn",
            );
          let (_, fakeGl, _, _) =
            SettingTool.buildFakeDomForNotPassCanvasId(sandbox);
          let vertexShader = 0;
          let fragmentShader = 1;
          let highFloat = 2;
          let mediumFloat = 3;
          let fakeGl =
            fakeGl |> _setFakeGlData("VERTEX_SHADER", vertexShader);
          let fakeGl =
            fakeGl |> _setFakeGlData("FRAGMENT_SHADER", fragmentShader);
          let fakeGl = fakeGl |> _setFakeGlData("HIGH_FLOAT", highFloat);
          let fakeGl = fakeGl |> _setFakeGlData("MEDIUM_FLOAT", mediumFloat);
          fakeGl##getShaderPrecisionFormat
          |> returns({"precision": 0})
          |> ignore;
          (
            fakeGl,
            warn,
            vertexShader,
            fragmentShader,
            highFloat,
            mediumFloat,
          );
        };
        test("if highp is available, use highp", () => {
          let (fakeGl, _, vertexShader, fragmentShader, highFloat, _) =
            _prepare(sandbox);
          fakeGl##getShaderPrecisionFormat
          |> withTwoArgs(vertexShader, highFloat)
          |> returns({"precision": 1})
          |> ignore;
          fakeGl##getShaderPrecisionFormat
          |> withTwoArgs(fragmentShader, highFloat)
          |> returns({"precision": 1})
          |> ignore;
          let state = _exec(fakeGl);
          GPUDetectTool.getRecord(state).precision |> expect == Some(HIGHP);
        });
        test("else if mediump is available, warn and use mediump", () => {
          let (fakeGl, warn, vertexShader, fragmentShader, _, mediumFloat) =
            _prepare(sandbox);
          fakeGl##getShaderPrecisionFormat
          |> withTwoArgs(vertexShader, mediumFloat)
          |> returns({"precision": 1})
          |> ignore;
          fakeGl##getShaderPrecisionFormat
          |> withTwoArgs(fragmentShader, mediumFloat)
          |> returns({"precision": 1})
          |> ignore;
          let state = _exec(fakeGl);
          (warn |> getCallCount, GPUDetectTool.getRecord(state).precision)
          |> expect == (1, Some(MEDIUMP));
        });
        test("else, warn and use lowp", () => {
          let (fakeGl, warn, _, _, _, _) = _prepare(sandbox);
          let state = _exec(fakeGl);
          (warn |> getCallCount, GPUDetectTool.getRecord(state).precision)
          |> expect == (1, Some(LOWP));
        });
      });
    });
  });