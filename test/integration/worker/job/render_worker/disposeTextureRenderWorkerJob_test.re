open Wonder_jest;

open Js.Promise;

open RenderWorkerSourceInstanceType;

let _ =
  describe("DisposeTextureRenderWorkerJob", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestMainWorkerTool.initWithJobConfig(
          ~sandbox,
          ~buffer=SettingTool.buildBufferConfigStr(),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("dispose texture data", () => {
      let _test = (judgeFunc, state) => {
        TestMainWorkerTool.closeContractCheck();

        let (state, material1, (map, source)) =
          BasicMaterialTool.createMaterialWithMap(state^);

        let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
        createBuffer |> returns(Obj.magic(1));
        let state =
          state
          |> FakeGlWorkerTool.setFakeGl(
               FakeGlWorkerTool.buildFakeGl(~sandbox, ~createBuffer, ()),
             );
        let state = MainStateTool.setState(state);

        let glTexture = Obj.magic(100);

        MainStateTool.unsafeGetState()
        |> BasicMaterialAPI.batchDisposeBasicMaterial([|material1|])
        |> MainStateTool.setState;

        RenderJobsRenderWorkerTool.init(
          state => {
            let renderWorkerState = RenderWorkerStateTool.getState();

            renderWorkerState
            |> BasicSourceTextureRenderWorkerTool.setGlTexture(
                 map,
                 glTexture,
               )
            |> RenderWorkerStateTool.setState
            |> ignore;

            RenderJobsRenderWorkerTool.mainLoopAndDispose(
              ~state,
              ~sandbox,
              ~completeFunc=
                _ => {
                  let renderWorkerState =
                    RenderWorkerStateTool.unsafeGetState();
                  judgeFunc(map, glTexture, renderWorkerState) |> resolve;
                },
              (),
            );
          },
          state,
        );
      };

      describe("dispose basic source texture data", () => {
        testPromise("delete gl texture", () =>
          _test(
            (texture, glTexture, renderWorkerState) => {
              let gl =
                DeviceManagerRenderWorkerTool.unsafeGetGl(renderWorkerState);

              gl##deleteTexture |> expect |> toCalledWith([|glTexture|]);
            },
            state,
          )
        );
        testPromise("remove from glTextureMap", () =>
          _test(
            (texture, glTexture, renderWorkerState) => {
              let gl =
                DeviceManagerRenderWorkerTool.unsafeGetGl(renderWorkerState);

              BasicSourceTextureRenderWorkerTool.getTexture(
                texture,
                renderWorkerState,
              )
              |> expect == None;
            },
            state,
          )
        );
      });
    });
  });