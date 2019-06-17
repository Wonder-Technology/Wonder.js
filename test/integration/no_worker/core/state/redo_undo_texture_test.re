open Wonder_jest;

let _ =
  describe("test redo,undo texture", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.initWithJobConfig(~sandbox, ());

      state :=
        state^ |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test basic source texture", () =>
      describe(
        {|
    create texture t1;
    set t1->glTexture to g1;
    copy state to s1;
    dispose t1;
    restore state to s1;
    |},
        () => {
          let _prepareAndExec = state => {
            let (state, texture) =
              BasicSourceTextureAPI.createBasicSourceTexture(state^);
            let glTexture = Obj.magic(2);
            let state =
              state |> BasicSourceTextureTool.setGlTexture(texture, glTexture);

            let copiedState = StateAPI.deepCopyForRestore(state);

            let state =
              state
              |> BasicSourceTextureAPI.disposeBasicSourceTexture(
                   texture,
                   false,
                 );
            let restoredState = MainStateTool.restore(state, copiedState);

            (restoredState, texture, glTexture);
          };

          test("t1->glTexture should be g1", () => {
            let (restoredState, texture, glTexture) = _prepareAndExec(state);

            BasicSourceTextureTool.unsafeGetTexture(texture, restoredState)
            |> expect == glTexture;
          });
          test("t1->glTexture shouldn't be deleted", () => {
            let deleteTexture =
              Obj.magic(DeviceManagerAPI.unsafeGetGl(state^))##deleteTexture;

            let (restoredState, texture, glTexture) = _prepareAndExec(state);

            deleteTexture |> expect |> not_ |> toCalledWith([|glTexture|]);
          });
        },
      )
    );

    describe("test array buffer view source texture", () =>
      describe(
        {|
            create material m1;
    create texture t1, t2;
    set t1,t2 to be m1->map;
    set t1->glTexture to g1;
    set t2->glTexture to g2;
    copy state to s1;
    dispose m1;
    restore state to s1;
    |},
        () => {
          let _prepareAndExec = state => {
            let (
              state,
              material1,
              (diffuseMap1, specularMap1, source1_1, source1_2),
            ) =
              LightMaterialTool.createMaterialWithArrayBufferViewMap(state^);
            let glTexture1 = Obj.magic(2);
            let glTexture2 = Obj.magic(3);
            let state =
              state
              |> ArrayBufferViewSourceTextureTool.setGlTexture(
                   diffuseMap1,
                   glTexture1,
                 );
            let state =
              state
              |> ArrayBufferViewSourceTextureTool.setGlTexture(
                   specularMap1,
                   glTexture2,
                 );

            let copiedState = StateAPI.deepCopyForRestore(state);

            let state =
              LightMaterialAPI.batchDisposeLightMaterial(
                [|material1|],
                state,
              );
            let restoredState = MainStateTool.restore(state, copiedState);

            (
              restoredState,
              diffuseMap1,
              specularMap1,
              glTexture1,
              glTexture2,
            );
          };

          beforeEach(() => state := AllMaterialTool.pregetGLSLData(state^));

          test("t1->glTexture should be g1", () => {
            let (
              restoredState,
              diffuseMap1,
              specularMap1,
              glTexture1,
              glTexture2,
            ) =
              _prepareAndExec(state);

            ArrayBufferViewSourceTextureTool.unsafeGetTexture(
              diffuseMap1,
              restoredState,
            )
            |> expect == glTexture1;
          });
          test("t1->glTexture shouldn't be deleted", () => {
            let deleteTexture =
              Obj.magic(DeviceManagerAPI.unsafeGetGl(state^))##deleteTexture;

            let (
              restoredState,
              diffuseMap1,
              specularMap1,
              glTexture1,
              glTexture2,
            ) =
              _prepareAndExec(state);

            deleteTexture |> expect |> not_ |> toCalledWith([|glTexture1|]);
          });
        },
      )
    );
  });