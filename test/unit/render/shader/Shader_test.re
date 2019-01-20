open Wonder_jest;

let _ =
  describe("Shader", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        InitBasicMaterialJobTool.initWithJobConfigWithoutBuildFakeDom(
          sandbox,
          /* InitRenderJobTool.buildNoWorkerJobConfig(), */

  NoWorkerJobConfigTool.buildNoWorkerJobConfig(
    ~initPipelines={|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_camera"
        },
        {
          "name": "start_time"
        },
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_state"
        },
        {
          "name": "init_basic_material"
        },
        {
          "name": "init_light_material"
        },
        {
          "name": "init_texture"
        }
        ]
    }
]
        |},
    ~initJobs=NoWorkerJobConfigTool.buildNoWorkerInitJobConfigWithoutInitMain(),
    ()
  )
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("init material shader", () => {
      test(
        "if the material with the same shaderLibDataArr is already inited, not init",
        () => {
        let (state, _, _, material1) =
          InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
        let (state, _, _, material2) =
          InitBasicMaterialJobTool.prepareGameObject(sandbox, state);
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let state = state |> InitBasicMaterialJobTool.exec;

        BasicMaterialTool.getShaderIndex(material1, state)
        |> expect == BasicMaterialTool.getShaderIndex(material2, state);
      });
      describe("generate shaderIndex", () => {
        test("set to material record", () => {
          let (state, _, _, material1) =
            InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
          InitBasicMaterialJobTool.prepareGameObject(sandbox, state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let state = state |> InitBasicMaterialJobTool.exec;
          BasicMaterialTool.getShaderIndex(material1, state) |> expect == 0;
        });
        test("if equal default shader index, error", () => {
          let (state, _, _, material1) =
            InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
          InitBasicMaterialJobTool.prepareGameObject(sandbox, state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let state = {
            ...state,
            shaderRecord: {
              ...ShaderTool.getShaderRecord(state),
              index: DefaultTypeArrayValueService.getDefaultShaderIndex(),
            },
          };
          expect(() => {
            let state = state |> InitBasicMaterialJobTool.exec;
            ();
          })
          |> toThrowMessage("expect not equal default shader index");
        });
      });
      test("create program", () => {
        let (state, _, _, _) =
          InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
        let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ()),
             );
        let state = state |> InitBasicMaterialJobTool.exec;
        getCallCount(createProgram) |> expect == 1;
      });
      test("register program", () => {
        let (state, _, _, material) =
          InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
        let program = Obj.magic(100);
        let createProgram =
          createEmptyStubWithJsObjSandbox(sandbox) |> returns(program);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~createProgram, ()),
             );
        let state = state |> InitBasicMaterialJobTool.exec;
        let shaderIndex = BasicMaterialTool.getShaderIndex(material, state);
        state
        |> ProgramTool.getProgram(shaderIndex)
        |> OptionTool.unsafeGet
        |> expect == program;
      });
      describe("init shader", () => {
        test("create vs shader", () => {
          let (state, _, _, _) =
            InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
          let vertex_shader = 1;
          let createShader = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~vertex_shader,
                   ~createShader,
                   (),
                 ),
               );
          let state = state |> InitBasicMaterialJobTool.exec;
          withOneArg(vertex_shader, createShader) |> expect |> toCalledOnce;
        });
        test("create fs shader", () => {
          let (state, _, _, _) =
            InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
          let fragment_shader = 1;
          let createShader = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~fragment_shader,
                   ~createShader,
                   (),
                 ),
               );
          let state = state |> InitBasicMaterialJobTool.exec;
          withOneArg(fragment_shader, createShader) |> expect |> toCalledOnce;
        });
        describe("compile shader", () => {
          test("compile vs and fs shader", () => {
            let (state, _, _, _) =
              InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
            let shaderSource = createEmptyStubWithJsObjSandbox(sandbox);
            let compileShader = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~shaderSource,
                     ~compileShader,
                     (),
                   ),
                 );
            let state = state |> InitBasicMaterialJobTool.exec;
            (getCallCount(shaderSource), getCallCount(compileShader))
            |> expect == (2, 2);
          });
          describe("check COMPILE_STATUS", () => {
            let _nowShowTrace = () =>
              createMethodStubWithJsObjSandbox(
                sandbox,
                Console.console,
                "trace",
              )
              |> ignore;
            test("if gl.getShaderParameter return false, log shader info", () => {
              let (state, _, _, _) =
                InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
              let compile_status = 0;
              let shader1 = 1;
              let shader2 = 2;
              let createShader =
                createEmptyStubWithJsObjSandbox(sandbox)
                |> onCall(0)
                |> returns(shader1)
                |> onCall(1)
                |> returns(shader2);
              let getShaderParameter =
                createEmptyStubWithJsObjSandbox(sandbox)
                |> withTwoArgs(shader1, compile_status)
                |> returns(false)
                |> withTwoArgs(shader2, compile_status)
                |> returns(false);
              let getShaderInfoLog = createEmptyStubWithJsObjSandbox(sandbox);
              let log =
                createMethodStubWithJsObjSandbox(
                  sandbox,
                  Console.console,
                  "log",
                );
              _nowShowTrace();
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~compile_status,
                       ~getShaderParameter,
                       ~createShader,
                       ~getShaderInfoLog,
                       (),
                     ),
                   );
              let state = state |> InitBasicMaterialJobTool.exec;
              (getCallCount(log), getCallCount(getShaderInfoLog))
              |> expect == (4, 2);
            });
          });
          test("attach vs and fs shader", () => {
            let (state, _, _, _) =
              InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
            let attachShader = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~attachShader, ()),
                 );
            let state = state |> InitBasicMaterialJobTool.exec;
            getCallCount(attachShader) |> expect == 2;
          });
          test(
            {|avoid "Attribute 0 is disabled."(because this has significant performance penalty)|},
            () => {
              let (state, _, _, _) =
                InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
              let bindAttribLocation =
                createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~bindAttribLocation,
                       (),
                     ),
                   );
              let state = state |> InitBasicMaterialJobTool.exec;
              getCallCount(
                bindAttribLocation |> withThreeArgs(matchAny, 0, "a_position"),
              )
              |> expect == 1;
            },
          );
          describe("link program", () => {
            test("test", () => {
              let (state, _, _, _) =
                InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
              let linkProgram = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~linkProgram, ()),
                   );
              let state = state |> InitBasicMaterialJobTool.exec;
              getCallCount(linkProgram) |> expect == 1;
            });
            describe("contract check", () =>
              test("if getProgramParameter returns false, error", () => {
                let (state, _, _, _) =
                  InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                let link_status = 0;
                let getProgramParameter =
                  createEmptyStubWithJsObjSandbox(sandbox)
                  |> withTwoArgs(matchAny, link_status)
                  |> returns(false);
                let programInfo = "err";
                let getProgramInfoLog =
                  createEmptyStubWithJsObjSandbox(sandbox)
                  |> returns(programInfo);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(
                         ~sandbox,
                         ~link_status,
                         ~getProgramParameter,
                         ~getProgramInfoLog,
                         (),
                       ),
                     );
                expect(() =>
                  state |> InitBasicMaterialJobTool.exec |> ignore
                )
                |> toThrowMessageRe(
                     [%re {|/link\sprogram\serror[\s\S]+err/img|}],
                   );
              })
            );
          });
          test("delete vs and fs shader after link", () => {
            let (state, _, _, _) =
              InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
            let deleteShader = createEmptyStubWithJsObjSandbox(sandbox);
            let linkProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~deleteShader,
                     ~linkProgram,
                     (),
                   ),
                 );
            let state = state |> InitBasicMaterialJobTool.exec;
            (
              getCallCount(deleteShader),
              calledAfter(
                deleteShader |> getCall(0),
                linkProgram |> getCall(0),
              ),
              calledAfter(
                deleteShader |> getCall(1),
                linkProgram |> getCall(0),
              ),
            )
            |> expect == (2, true, true);
          });
        });
      });
    });

    describe("clearInitShaderCache", () =>
      describe("clear shader cache", () =>
        test(
          {|1.create material1 and init;
          2.dispose material1;
          3.create material2 and init;

          material2's shaderIndex should not equal material1's shaderIndex|},
          () => {
            let state =
              FakeGlTool.setFakeGl(
                FakeGlTool.buildFakeGl(~sandbox, ()),
                state^,
              );
            let state = AllMaterialTool.pregetGLSLData(state);
            let (state, gameObject1, material1) =
              LightMaterialTool.createGameObject(state);
            let state = GameObjectAPI.initGameObject(gameObject1, state);

            let shaderIndex1 =
              LightMaterialTool.getShaderIndex(material1, state);

            let state = GameObjectTool.disposeGameObject(gameObject1, state);

            let state = ShaderAPI.clearInitShaderCache(state);

            let (state, gameObject2, material2) =
              LightMaterialTool.createGameObject(state);

            let state = GameObjectAPI.initGameObject(gameObject2, state);

            LightMaterialTool.getShaderIndex(material2, state)
            |> expect
            |> not_
            |> toEqual(shaderIndex1);
          },
        )
      )
    );
  });