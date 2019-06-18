open Wonder_jest;

open Js.Typed_array;

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

    describe("deep copy texture record", () => {
      describe("deep copy basic source texture record", () =>
        test(
          "shadow copy sourceMap,glTextureMap, \n                     disposedIndexArray,needAddedSourceArray,needInitedTextureIndexArray
            materialsMap, needDisposedTextureIndexArray
            \n                    \n                    ",
          () =>
          StateDataMainType.(
            BasicSourceTextureType.(
              MainStateTool.testShadowCopyArrayLikeMapData(
                state => {
                  let {
                    sourceMap,
                    glTextureMap,
                    disposedIndexArray,
                    needAddedSourceArray,
                    needInitedTextureIndexArray,
                    materialsMap,
                    needDisposedTextureIndexArray,
                  } =
                    BasicSourceTextureTool.getRecord(state);
                  [|
                    sourceMap |> Obj.magic,
                    glTextureMap |> Obj.magic,
                    disposedIndexArray |> Obj.magic,
                    needAddedSourceArray |> Obj.magic,
                    needInitedTextureIndexArray |> Obj.magic,
                    materialsMap |> Obj.magic,
                    needDisposedTextureIndexArray |> Obj.magic,
                  |];
                },
                state^,
              )
            )
          )
        )
      );

      describe("deep copy arrayBufferView source texture record", () =>
        test(
          "shadow copy sourceMap,glTextureMap, \n                     disposedIndexArray,needAddedSourceArray,needInitedTextureIndexArray, materialsMap, needDisposedTextureIndexArray\n                    \n                    ",
          () =>
          StateDataMainType.(
            ArrayBufferViewSourceTextureType.(
              MainStateTool.testShadowCopyArrayLikeMapData(
                state => {
                  let {
                    sourceMap,
                    glTextureMap,
                    disposedIndexArray,
                    needAddedSourceArray,
                    needInitedTextureIndexArray,
                    materialsMap,
                    needDisposedTextureIndexArray,
                  } =
                    ArrayBufferViewSourceTextureTool.getRecord(state);
                  [|
                    sourceMap |> Obj.magic,
                    glTextureMap |> Obj.magic,
                    disposedIndexArray |> Obj.magic,
                    needAddedSourceArray |> Obj.magic,
                    needInitedTextureIndexArray |> Obj.magic,
                    materialsMap |> Obj.magic,
                    needDisposedTextureIndexArray |> Obj.magic,
                  |];
                },
                state^,
              )
            )
          )
        )
      );

      describe("deep copy cubemap texture record", () =>
        test(
          "shadow copy pxSourceMap,nxSourceMap,pySourceMap,nySourceMap, pzSourceMap,nzSourceMap,

          glTextureMap, \n                     disposedIndexArray,

          needAddedPXSourceArray,
          needAddedNXSourceArray,
          needAddedPYSourceArray,
          needAddedNYSourceArray,
          needAddedPZSourceArray,
          needAddedNZSourceArray,

          needInitedTextureIndexArray
            materialsMap, needDisposedTextureIndexArray
            \n                    \n                    ",
          () =>
          StateDataMainType.(
            CubemapTextureType.(
              MainStateTool.testShadowCopyArrayLikeMapData(
                state => {
                  let {
                    pxSourceMap,
                    nxSourceMap,
                    pySourceMap,
                    nySourceMap,
                    pzSourceMap,
                    nzSourceMap,
                    glTextureMap,
                    disposedIndexArray,
                    needAddedPXSourceArray,
                    needAddedNXSourceArray,
                    needAddedPYSourceArray,
                    needAddedNYSourceArray,
                    needAddedPZSourceArray,
                    needAddedNZSourceArray,
                    needInitedTextureIndexArray,
                    materialsMap,
                    needDisposedTextureIndexArray,
                  } =
                    CubemapTextureTool.getRecord(state);
                  [|
                    pxSourceMap |> Obj.magic,
                    nxSourceMap |> Obj.magic,
                    pySourceMap |> Obj.magic,
                    nySourceMap |> Obj.magic,
                    pzSourceMap |> Obj.magic,
                    nzSourceMap |> Obj.magic,
                    glTextureMap |> Obj.magic,
                    disposedIndexArray |> Obj.magic,
                    needAddedPXSourceArray |> Obj.magic,
                    needAddedNXSourceArray |> Obj.magic,
                    needAddedPYSourceArray |> Obj.magic,
                    needAddedNYSourceArray |> Obj.magic,
                    needAddedPZSourceArray |> Obj.magic,
                    needAddedNZSourceArray |> Obj.magic,
                    needInitedTextureIndexArray |> Obj.magic,
                    materialsMap |> Obj.magic,
                    needDisposedTextureIndexArray |> Obj.magic,
                  |];
                },
                state^,
              )
            )
          )
        )
      );
    });

    describe("restore texture record to target state", () => {
      describe("test restore basic source texture record", () => {
        let _prepareBasicSourceTextureData = state => {
          open BasicSourceTextureAPI;
          open Js.Typed_array;
          open TextureType;
          let (state, texture1) = createBasicSourceTexture(state);
          let (state, texture2) = createBasicSourceTexture(state);
          let (state, texture3) = createBasicSourceTexture(state);
          let state = AllMaterialTool.prepareForInit(state);
          let state =
            state |> setBasicSourceTextureWrapS(texture2, Mirrored_repeat);
          let state =
            state |> setBasicSourceTextureWrapT(texture2, Mirrored_repeat);
          let state =
            state |> setBasicSourceTextureMagFilter(texture2, Linear);
          let state =
            state |> setBasicSourceTextureMinFilter(texture2, Linear);
          let state = state |> setBasicSourceTextureType(texture2, 1);
          let state = state |> setBasicSourceTextureFormat(texture2, Alpha);
          (state, texture1, texture2, texture3);
        };

        test("test restore typeArrays", () => {
          open BasicSourceTextureType;
          state :=
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~basicSourceTextureCount=4,
                  (),
                ),
              (),
            );

          let (state, texture1, texture2, texture3) =
            _prepareBasicSourceTextureData(state^);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let (currentState, texture4) =
            BasicSourceTextureAPI.createBasicSourceTexture(state);
          let currentState =
            BasicSourceTextureAPI.setBasicSourceTextureWrapT(
              texture4,
              TextureType.Mirrored_repeat,
              currentState,
            );
          let currentState = AllMaterialTool.pregetGLSLData(currentState);
          let _ = MainStateTool.restore(currentState, copiedState);
          let defaultWrapS =
            BasicSourceTextureTool.getDefaultWrapS() |> TextureType.wrapToUint8;

          let defaultWrapT =
            BasicSourceTextureTool.getDefaultWrapT() |> TextureType.wrapToUint8;
          let defaultMagFilter =
            BasicSourceTextureTool.getDefaultMagFilter()
            |> TextureType.filterToUint8;

          let defaultMinFilter =
            BasicSourceTextureTool.getDefaultMinFilter()
            |> TextureType.filterToUint8;
          let defaultFormat =
            BasicSourceTextureTool.getDefaultFormat()
            |> TextureType.formatToUint8;
          let defaultType = BasicSourceTextureTool.getDefaultType();
          let defaultIsNeedUpdate =
            BasicSourceTextureTool.getDefaultIsNeedUpdate();
          let {
            wrapSs,
            wrapTs,
            magFilters,
            minFilters,
            formats,
            types,
            isNeedUpdates,
          } =
            MainStateTool.unsafeGetState() |> BasicSourceTextureTool.getRecord;
          (
            wrapSs,
            wrapTs,
            magFilters,
            minFilters,
            formats,
            types,
            isNeedUpdates,
          )
          |> expect
          == (
               Uint8Array.make([|
                 defaultWrapS,
                 1,
                 defaultWrapS,
                 defaultWrapS,
               |]),
               Uint8Array.make([|
                 defaultWrapT,
                 1,
                 defaultWrapT,
                 defaultWrapT,
               |]),
               Uint8Array.make([|
                 defaultMagFilter,
                 1,
                 defaultMagFilter,
                 defaultMagFilter,
               |]),
               Uint8Array.make([|
                 defaultMinFilter,
                 1,
                 defaultMinFilter,
                 defaultMinFilter,
               |]),
               Uint8Array.make([|
                 defaultFormat,
                 2,
                 defaultFormat,
                 defaultFormat,
               |]),
               Uint8Array.make([|defaultType, 1, defaultType, defaultType|]),
               Uint8Array.make([|
                 defaultIsNeedUpdate,
                 defaultIsNeedUpdate,
                 defaultIsNeedUpdate,
                 defaultIsNeedUpdate,
               |]),
             );
        });
      });
      describe("test restore arrayBufferView source texture record", () => {
        let _prepareArrayBufferViewSourceTextureData = state => {
          open ArrayBufferViewSourceTextureAPI;
          open Js.Typed_array;
          open TextureType;
          let (state, texture1) = createArrayBufferViewSourceTexture(state);
          let (state, texture2) = createArrayBufferViewSourceTexture(state);
          let (state, texture3) = createArrayBufferViewSourceTexture(state);
          let state = AllMaterialTool.prepareForInit(state);
          let state =
            state
            |> setArrayBufferViewSourceTextureWrapS(texture2, Mirrored_repeat);
          let state =
            state
            |> setArrayBufferViewSourceTextureWrapT(texture2, Mirrored_repeat);
          let state =
            state
            |> setArrayBufferViewSourceTextureMagFilter(texture2, Linear);
          let state =
            state
            |> setArrayBufferViewSourceTextureMinFilter(texture2, Linear);
          let state =
            state |> setArrayBufferViewSourceTextureType(texture2, 1);
          let state =
            state
            |> setArrayBufferViewSourceTextureFormat(
                 texture2,
                 TextureType.Alpha,
               );
          let state =
            state |> setArrayBufferViewSourceTextureWidth(texture2, 2);
          let state =
            state |> setArrayBufferViewSourceTextureHeight(texture2, 4);
          (state, texture1, texture2, texture3);
        };

        test("test restore typeArrays", () => {
          open ArrayBufferViewSourceTextureType;
          state :=
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~arrayBufferViewSourceTextureCount=4,
                  (),
                ),
              (),
            );

          let (state, texture1, texture2, texture3) =
            _prepareArrayBufferViewSourceTextureData(state^);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let (currentState, texture4) =
            ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
              state,
            );
          let currentState =
            ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureWrapT(
              texture4,
              TextureType.Mirrored_repeat,
              currentState,
            );
          let currentState = AllMaterialTool.pregetGLSLData(currentState);
          let _ = MainStateTool.restore(currentState, copiedState);
          let defaultWrapS =
            ArrayBufferViewSourceTextureTool.getDefaultWrapS()
            |> TextureType.wrapToUint8;
          let defaultWrapT =
            ArrayBufferViewSourceTextureTool.getDefaultWrapT()
            |> TextureType.wrapToUint8;
          let defaultMagFilter =
            ArrayBufferViewSourceTextureTool.getDefaultMagFilter()
            |> TextureType.filterToUint8;
          let defaultMinFilter =
            ArrayBufferViewSourceTextureTool.getDefaultMinFilter()
            |> TextureType.filterToUint8;
          let defaultFormat =
            ArrayBufferViewSourceTextureTool.getDefaultFormat()
            |> TextureType.formatToUint8;
          let defaultType = ArrayBufferViewSourceTextureTool.getDefaultType();
          let defaultIsNeedUpdate =
            ArrayBufferViewSourceTextureTool.getDefaultIsNeedUpdate();
          let defaultWidth =
            ArrayBufferViewSourceTextureTool.getDefaultWidth();
          let defaultHeight =
            ArrayBufferViewSourceTextureTool.getDefaultHeight();
          let {
            wrapSs,
            wrapTs,
            magFilters,
            minFilters,
            formats,
            types,
            isNeedUpdates,
            widths,
            heights,
          } =
            MainStateTool.unsafeGetState()
            |> ArrayBufferViewSourceTextureTool.getRecord;
          (
            wrapSs,
            wrapTs,
            magFilters,
            minFilters,
            formats,
            types,
            isNeedUpdates,
            widths,
            heights,
          )
          |> expect
          == (
               Uint8Array.make([|
                 defaultWrapS,
                 1,
                 defaultWrapS,
                 defaultWrapS,
               |]),
               Uint8Array.make([|
                 defaultWrapT,
                 1,
                 defaultWrapT,
                 defaultWrapT,
               |]),
               Uint8Array.make([|
                 defaultMagFilter,
                 1,
                 defaultMagFilter,
                 defaultMagFilter,
               |]),
               Uint8Array.make([|
                 defaultMinFilter,
                 1,
                 defaultMinFilter,
                 defaultMinFilter,
               |]),
               Uint8Array.make([|
                 defaultFormat,
                 2,
                 defaultFormat,
                 defaultFormat,
               |]),
               Uint8Array.make([|defaultType, 1, defaultType, defaultType|]),
               Uint8Array.make([|
                 defaultIsNeedUpdate,
                 defaultIsNeedUpdate,
                 defaultIsNeedUpdate,
                 defaultIsNeedUpdate,
               |]),
               Uint16Array.make([|
                 defaultWidth,
                 2,
                 defaultWidth,
                 defaultWidth,
               |]),
               Uint16Array.make([|
                 defaultHeight,
                 4,
                 defaultHeight,
                 defaultHeight,
               |]),
             );
        });
      });

      describe("test restore cubemap texture record", () =>
        describe("test restore typeArrays", () => {
          open CubemapTextureType;
          open CubemapTextureAPI;
          open TextureType;

          beforeEach(() => {
            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(
                    ~cubemapTextureCount=4,
                    (),
                  ),
                (),
              );

            state :=
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()))
              |> AllMaterialTool.prepareForInit;
          });

          test(
            "test restore wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates, flipYs",
            () => {
            let (state, texture1) = createCubemapTexture(state^);
            let (state, texture2) = createCubemapTexture(state);
            let (state, texture3) = createCubemapTexture(state);
            let state =
              state |> setCubemapTextureWrapS(texture2, Mirrored_repeat);
            let state =
              state |> setCubemapTextureWrapT(texture2, Mirrored_repeat);
            let state = state |> setCubemapTextureMagFilter(texture2, Linear);
            let state = state |> setCubemapTextureMinFilter(texture2, Linear);
            let state = state |> setCubemapTextureFlipY(texture2, true);

            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, texture4) =
              CubemapTextureAPI.createCubemapTexture(state);
            let currentState =
              CubemapTextureAPI.setCubemapTextureWrapT(
                texture4,
                TextureType.Mirrored_repeat,
                currentState,
              );
            let currentState =
              CubemapTextureAPI.setCubemapTextureMagFilter(
                texture4,
                TextureType.Linear_mipmap_linear,
                currentState,
              );
            let currentState =
              CubemapTextureAPI.setCubemapTextureFlipY(
                texture4,
                true,
                currentState,
              );
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let defaultWrapS =
              CubemapTextureTool.getDefaultWrapS() |> TextureType.wrapToUint8;

            let defaultWrapT =
              CubemapTextureTool.getDefaultWrapT() |> TextureType.wrapToUint8;
            let defaultMagFilter =
              CubemapTextureTool.getDefaultMagFilter()
              |> TextureType.filterToUint8;

            let defaultMinFilter =
              CubemapTextureTool.getDefaultMinFilter()
              |> TextureType.filterToUint8;
            let defaultIsNeedUpdate =
              CubemapTextureTool.getDefaultIsNeedUpdate();
            let defaultFlipY = CubemapTextureTool.getDefaultFlipY();
            let {
              wrapSs,
              wrapTs,
              magFilters,
              minFilters,
              isNeedUpdates,
              flipYs,
            } =
              MainStateTool.unsafeGetState() |> CubemapTextureTool.getRecord;
            (wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates, flipYs)
            |> expect
            == (
                 Uint8Array.make([|
                   defaultWrapS,
                   1,
                   defaultWrapS,
                   defaultWrapS,
                 |]),
                 Uint8Array.make([|
                   defaultWrapT,
                   1,
                   defaultWrapT,
                   defaultWrapT,
                 |]),
                 Uint8Array.make([|
                   defaultMagFilter,
                   1,
                   defaultMagFilter,
                   defaultMagFilter,
                 |]),
                 Uint8Array.make([|
                   defaultMinFilter,
                   1,
                   defaultMinFilter,
                   defaultMinFilter,
                 |]),
                 Uint8Array.make([|
                   defaultIsNeedUpdate,
                   defaultIsNeedUpdate,
                   defaultIsNeedUpdate,
                   defaultIsNeedUpdate,
                 |]),
                 Uint8Array.make([|
                   defaultFlipY,
                   defaultFlipY,
                   defaultFlipY,
                   defaultFlipY,
                 |]),
               );
          });
          test("test restore formats and types", () => {
            let (state, texture1) = createCubemapTexture(state^);
            let (state, texture2) = createCubemapTexture(state);
            let (state, texture3) = createCubemapTexture(state);
            let state =
              state |> setCubemapTexturePXFormat(texture2, Rgbas3tcdxt3);
            let state =
              state |> setCubemapTexturePYFormat(texture2, LuminanceAlpha);
            let state =
              state |> setCubemapTextureNZFormat(texture2, Rgbs3tcdxt1);

            let state = state |> setCubemapTexturePXType(texture2, 1);
            let state = state |> setCubemapTexturePYType(texture2, 2);
            let state = state |> setCubemapTextureNZType(texture2, 1);

            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, texture4) =
              CubemapTextureAPI.createCubemapTexture(state);
            let currentState =
              CubemapTextureAPI.setCubemapTexturePZFormat(
                texture4,
                Alpha,
                currentState,
              );
            let currentState =
              CubemapTextureAPI.setCubemapTexturePZType(
                texture4,
                2,
                currentState,
              );
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let defaultFormat =
              CubemapTextureTool.getDefaultFormat()
              |> TextureType.formatToUint8;
            let defaultType = CubemapTextureTool.getDefaultType();
            let {pxFormats, pyFormats, nzFormats, pxTypes, pyTypes, nzTypes} =
              MainStateTool.unsafeGetState() |> CubemapTextureTool.getRecord;
            (pxFormats, pyFormats, nzFormats, pxTypes, pyTypes, nzTypes)
            |> expect
            == (
                 Uint8Array.make([|
                   defaultFormat,
                   Rgbas3tcdxt3 |> formatToUint8,
                   defaultFormat,
                   defaultFormat,
                 |]),
                 Uint8Array.make([|
                   defaultFormat,
                   LuminanceAlpha |> formatToUint8,
                   defaultFormat,
                   defaultFormat,
                 |]),
                 Uint8Array.make([|
                   defaultFormat,
                   Rgbs3tcdxt1 |> formatToUint8,
                   defaultFormat,
                   defaultFormat,
                 |]),
                 Uint8Array.make([|
                   defaultType,
                   1,
                   defaultType,
                   defaultType,
                 |]),
                 Uint8Array.make([|
                   defaultType,
                   2,
                   defaultType,
                   defaultType,
                 |]),
                 Uint8Array.make([|
                   defaultType,
                   1,
                   defaultType,
                   defaultType,
                 |]),
               );
          });
        })
      );
    });

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

    describe("test cubemap texture", () =>
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
              CubemapTextureAPI.createCubemapTexture(state^);
            let glTexture = Obj.magic(2);
            let state =
              state |> CubemapTextureTool.setGlTexture(texture, glTexture);

            let copiedState = StateAPI.deepCopyForRestore(state);

            let state =
              state |> CubemapTextureAPI.disposeCubemapTexture(texture, false);
            let restoredState = MainStateTool.restore(state, copiedState);

            (restoredState, texture, glTexture);
          };

          test("t1->glTexture should be g1", () => {
            let (restoredState, texture, glTexture) = _prepareAndExec(state);

            CubemapTextureTool.unsafeGetTexture(texture, restoredState)
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
  });