open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test switch skybox", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := SkyboxTool.initWithJobConfig(sandbox);

      TestTool.closeContractCheck();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test switch skybox's cubemap texture", () => {
      let _prepare = state => {
        let textureUnit0 = 10;
        let textureCubemap = Obj.magic(8);
        let glTexture1 = Obj.magic(11);
        let glTexture2 = Obj.magic(12);
        let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
        createTexture |> onCall(0) |> returns(glTexture1);
        createTexture |> onCall(1) |> returns(glTexture2);
        let activeTexture = createEmptyStubWithJsObjSandbox(sandbox);
        let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(
                 ~sandbox,
                 ~textureUnit0,
                 ~textureCubemap,
                 ~createTexture,
                 ~activeTexture,
                 ~bindTexture,
                 (),
               ),
             );

        (
          state,
          (textureCubemap, glTexture1, glTexture2, textureUnit0),
          (activeTexture, bindTexture),
        );
      };

      test(
        {|create cubemap1;
        set cubemap1 to skybox;
        init;
        loopBody;
        create cubemap2 and init it;
        set cubemap2 to skybox;
        loopBody;

        should bind cubemap2->gl texture;
        |},
        () => {
          let (state, map1) = SkyboxTool.prepareCubemapTexture(state^);
          let (state, cameraTransform, _) =
            SkyboxTool.prepareGameObject(state);
          let (
            state,
            (textureCubemap, glTexture1, glTexture2, textureUnit0),
            (activeTexture, bindTexture),
          ) =
            _prepare(state);

          let state =
            state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

          let (state, map2) = SkyboxTool.prepareCubemapTexture(state);

          let state = state |> CubemapTextureAPI.initCubemapTexture(map2);

          let state = state |> DirectorTool.runWithDefaultTime;

          (
            bindTexture
            |> withTwoArgs(textureCubemap, glTexture1)
            |> getCallCount,
            bindTexture
            |> withTwoArgs(textureCubemap, glTexture2)
            |> getCallCount,
            calledAfter(
              bindTexture |> withTwoArgs(textureCubemap, glTexture2),
              bindTexture |> withTwoArgs(textureCubemap, glTexture1),
            ),
          )
          |> expect == (1, 1, true);
        },
      );
    });
  });