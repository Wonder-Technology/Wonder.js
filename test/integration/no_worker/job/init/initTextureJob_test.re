open Wonder_jest;

let _ =
  describe(
    "test init texture job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_texture"
        }
      ]
    }
  ]
        |},
          ~initJobs={|
[
        {
          "name": "init_texture"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := InitBasicMaterialJobTool.initWithJobConfig(sandbox, _buildNoWorkerJobConfig())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "init all created textures",
        () => {
          describe(
            "test init one texture",
            () =>
              describe(
                "create gl texture, save to glTextureMap",
                () => {
                  let _prepare = (state) => {
                    let (state, map) = TextureAPI.createTexture(state);
                    let glTexture = Obj.magic(1);
                    let createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                    createTexture |> returns(glTexture);
                    let state =
                      state
                      |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()));
                    (state, map, glTexture, createTexture)
                  };
                  test(
                    "test create",
                    () => {
                      let (state, map, glTexture, _) = _prepare(state^);
                      let state = state |> InitRenderJobTool.exec;
                      TextureTool.unsafeGetTexture(map, state) |> expect == glTexture
                    }
                  );
                  test(
                    "if created before, not create",
                    () => {
                      let (state, map, _, createTexture) = _prepare(state^);
                      let state = state |> InitRenderJobTool.exec;
                      let state = state |> InitRenderJobTool.exec;
                      createTexture |> expect |> toCalledOnce
                    }
                  )
                }
              )
          );
          describe(
            "test init two textures",
            () =>
              test(
                "test create",
                () => {
                  let (state, map1) = TextureAPI.createTexture(state^);
                  let (state, map2) = TextureAPI.createTexture(state);
                  let glTexture1 = Obj.magic(1);
                  let glTexture2 = Obj.magic(2);
                  let createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                  createTexture |> onCall(0) |> returns(glTexture1);
                  createTexture |> onCall(1) |> returns(glTexture2);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()));
                  let state = state |> InitRenderJobTool.exec;
                  (
                    TextureTool.unsafeGetTexture(map1, state),
                    TextureTool.unsafeGetTexture(map2, state)
                  )
                  |> expect == (glTexture1, glTexture2)
                }
              )
          )
        }
      )
    }
  );