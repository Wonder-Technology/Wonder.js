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
        "init all textures",
        () => {
          describe(
            "test init one texture",
            () =>
              describe(
                "create gl texture, save to glTextureMap",
                () => {
                  let _prepare = (state) => {
                    let (state, map) = BasicSourceTextureAPI.createBasicSourceTexture(state);
                    let glTexture = Obj.magic(1);
                    let createBasicSourceTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                    createBasicSourceTexture |> returns(glTexture);
                    let state =
                      state
                      |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBasicSourceTexture, ()));
                    (state, map, glTexture, createBasicSourceTexture)
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
                      let (state, map, _, createBasicSourceTexture) = _prepare(state^);
                      let state = state |> InitRenderJobTool.exec;
                      let state = state |> InitRenderJobTool.exec;
                      createBasicSourceTexture |> expect |> toCalledOnce
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
                  let (state, map1) = BasicSourceTextureAPI.createBasicSourceTexture(state^);
                  let (state, map2) = BasicSourceTextureAPI.createBasicSourceTexture(state);
                  let glTexture1 = Obj.magic(1);
                  let glTexture2 = Obj.magic(2);
                  let createBasicSourceTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                  createBasicSourceTexture |> onCall(0) |> returns(glTexture1);
                  createBasicSourceTexture |> onCall(1) |> returns(glTexture2);
                  let state =
                    state
                    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBasicSourceTexture, ()));
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