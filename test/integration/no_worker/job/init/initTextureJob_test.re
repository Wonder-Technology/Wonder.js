open Wonder_jest;

let _ =
  describe("test init texture job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    let _buildNoWorkerJobConfig = () =>
      NoWorkerJobConfigTool.buildNoWorkerJobConfig(
        ~initPipelines=
          {|
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
        ~initJobs=
          {|
[
        {
          "name": "init_texture"
        }
]
        |},
        (),
      );
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        InitBasicMaterialJobTool.initWithJobConfig(
          sandbox,
          _buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("init all textures", () => {
      describe("test basic source texture", () => {
        describe("test init one texture", () =>
          describe("create gl texture, save to glTextureMap", () => {
            let _prepare = state => {
              let (state, map) =
                BasicSourceTextureAPI.createBasicSourceTexture(state);
              let glTexture = Obj.magic(1);
              let createTexture =
                Sinon.createEmptyStubWithJsObjSandbox(sandbox);
              createTexture |> returns(glTexture);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()),
                   );
              (state, map, glTexture, createTexture);
            };
            test("test create", () => {
              let (state, map, glTexture, _) = _prepare(state^);
              let state = state |> InitRenderJobTool.exec;
              BasicSourceTextureTool.unsafeGetTexture(map, state)
              |> expect == glTexture;
            });
            test("if created before, not create", () => {
              let (state, map, _, createTexture) = _prepare(state^);
              let state = state |> InitRenderJobTool.exec;
              let state = state |> InitRenderJobTool.exec;
              createTexture |> expect |> toCalledOnce;
            });
          })
        );

        describe("test init two textures", () =>
          test("test create", () => {
            let (state, map1) =
              BasicSourceTextureAPI.createBasicSourceTexture(state^);
            let (state, map2) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let glTexture1 = Obj.magic(1);
            let glTexture2 = Obj.magic(2);
            let createTexture =
              Sinon.createEmptyStubWithJsObjSandbox(sandbox);
            createTexture |> onCall(0) |> returns(glTexture1);
            createTexture |> onCall(1) |> returns(glTexture2);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()),
                 );
            let state = state |> InitRenderJobTool.exec;
            (
              BasicSourceTextureTool.unsafeGetTexture(map1, state),
              BasicSourceTextureTool.unsafeGetTexture(map2, state),
            )
            |> expect == (glTexture1, glTexture2);
          })
        );
      });

      describe("test arrayBufferView source texture", () =>
        describe("test init two textures", () =>
          test(
            "test create", () => {
            let (state, map1) =
              ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
                state^,
              );
            let (state, map2) =
              ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
                state,
              );
            let glTexture1 = Obj.magic(1);
            let glTexture2 = Obj.magic(2);
            let createTexture =
              Sinon.createEmptyStubWithJsObjSandbox(sandbox);
            createTexture |> onCall(0) |> returns(glTexture1);
            createTexture |> onCall(1) |> returns(glTexture2);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()),
                 );

            let state = state |> InitRenderJobTool.exec;

            (
              ArrayBufferViewSourceTextureTool.unsafeGetTexture(map1, state),
              ArrayBufferViewSourceTextureTool.unsafeGetTexture(map2, state),
            )
            |> expect == (glTexture1, glTexture2);
          })
        )
      );
    });
  });