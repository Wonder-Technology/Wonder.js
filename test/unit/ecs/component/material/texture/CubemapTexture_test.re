open CubemapTextureAPI;

open Wonder_jest;

let _ =
  describe("CubemapTexture", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("createCubemapTexture", () => {
      test("create a new texture which is just index(int)", () => {
        let (_, texture) = createCubemapTexture(state^);
        expect(texture) == 0;
      });
      test("shouldn't exceed buffer count", () => {
        let state =
          TestTool.initWithoutBuildFakeDom(
            ~sandbox,
            ~buffer=
              SettingTool.buildBufferConfigStr(~cubemapTextureCount=2, ()),
            (),
          );
        let (_, texture) = createCubemapTexture(state);
        let (_, texture) = createCubemapTexture(state);
        expect(() => {
          let (_, texture) = createCubemapTexture(state);
          ();
        })
        |> toThrowMessage("expect index: 2 <= maxIndex: 1, but actual not");
      });
    });

    describe("test default data", () => {
      describe("is need updates", () =>
        test("default is need update", () => {
          let (state, texture) = createCubemapTexture(state^);
          CubemapTextureTool.isNeedUpdate(texture, state) |> expect == true;
        })
      );

      describe("is flipY", () =>
        test("default is false", () => {
          let (state, texture) = createCubemapTexture(state^);

          CubemapTextureAPI.getCubemapTextureFlipY(texture, state)
          |> expect == false;
        })
      );
    });

    describe("setCubemapTextureWrapS", () =>
      test("test", () => {
        let (state, texture) = createCubemapTexture(state^);
        let wrap = TextureType.Mirrored_repeat;

        let state = state |> setCubemapTextureWrapS(texture, wrap);

        getCubemapTextureWrapS(texture, state) |> expect == wrap;
      })
    );

    describe("setCubemapTextureWrapT", () =>
      test("test", () => {
        let (state, texture) = createCubemapTexture(state^);
        let wrap = TextureType.Mirrored_repeat;

        let state = state |> setCubemapTextureWrapT(texture, wrap);

        getCubemapTextureWrapT(texture, state) |> expect == wrap;
      })
    );

    describe("setCubemapTextureMagFilter", () =>
      test("test", () => {
        let (state, texture) = createCubemapTexture(state^);
        let filter = TextureType.Linear;

        let state = state |> setCubemapTextureMagFilter(texture, filter);

        getCubemapTextureMagFilter(texture, state) |> expect == filter;
      })
    );

    describe("setCubemapTextureMinFilter", () =>
      test("test", () => {
        let (state, texture) = createCubemapTexture(state^);
        let filter = TextureType.Linear;

        let state = state |> setCubemapTextureMinFilter(texture, filter);

        getCubemapTextureMinFilter(texture, state) |> expect == filter;
      })
    );

    describe("setCubemapTexturePXFormat", () =>
      test("test", () => {
        let (state, texture) = createCubemapTexture(state^);
        let format = TextureType.Rgbas3tcdxt1;

        let state = state |> setCubemapTexturePXFormat(texture, format);

        getCubemapTexturePXFormat(texture, state) |> expect == format;
      })
    );

    describe("setCubemapTextureNZFormat", () =>
      test("test", () => {
        let (state, texture) = createCubemapTexture(state^);
        let format = TextureType.Rgbas3tcdxt1;

        let state = state |> setCubemapTextureNZFormat(texture, format);

        getCubemapTextureNZFormat(texture, state) |> expect == format;
      })
    );

    describe("setCubemapTexturePXType", () =>
      test("test", () => {
        let (state, texture) = createCubemapTexture(state^);
        let type_ = 1;

        let state = state |> setCubemapTexturePXType(texture, type_);

        getCubemapTexturePXType(texture, state) |> expect == type_;
      })
    );

    describe("setCubemapTextureNYType", () =>
      test("test", () => {
        let (state, texture) = createCubemapTexture(state^);
        let type_ = 1;

        let state = state |> setCubemapTextureNYType(texture, type_);

        getCubemapTextureNYType(texture, state) |> expect == type_;
      })
    );

    describe("setCubemapTexturePXSource", () =>
      test("test", () => {
        let (state, texture) = createCubemapTexture(state^);
        let source = CubemapTextureTool.buildSource();

        let state = state |> setCubemapTexturePXSource(texture, source);

        unsafeGetCubemapTexturePXSource(texture, state) |> expect == source;
      })
    );

    describe("setCubemapTextureNYSource", () =>
      test("test", () => {
        let (state, texture) = createCubemapTexture(state^);
        let source = CubemapTextureTool.buildSource();

        let state = state |> setCubemapTextureNYSource(texture, source);

        unsafeGetCubemapTextureNYSource(texture, state) |> expect == source;
      })
    );

    describe("setCubemapTextureFlipY", () =>
      test("test", () => {
        let (state, texture) = createCubemapTexture(state^);

        let state = state |> setCubemapTextureFlipY(texture, false);

        getCubemapTextureFlipY(texture, state) |> expect == false;
      })
    );

    describe("getAllTextures", () =>
      test("get all created textures", () => {
        let (state, texture1) = createCubemapTexture(state^);
        let (state, texture2) = createCubemapTexture(state);

        CubemapTextureAPI.getAllTextures(state)
        |> expect == [|texture1, texture2|];
      })
    );

    describe("initCubemapTexture", () =>
      describe("create gl texture, save to glTextureMap", () => {
        let _prepare = state => {
          let (state, texture) =
            CubemapTextureAPI.createCubemapTexture(state);
          let glTexture = Obj.magic(1);
          let createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          createTexture |> returns(glTexture);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~createTexture, ()),
               );
          (state, texture, glTexture, createTexture);
        };

        test("test create", () => {
          let (state, texture, glTexture, _) = _prepare(state^);

          let state = CubemapTextureAPI.initCubemapTexture(texture, state);

          CubemapTextureTool.unsafeGetTexture(texture, state)
          |> expect == glTexture;
        });
        test("if created before, not create", () => {
          let (state, texture, _, createTexture) = _prepare(state^);

          let state = CubemapTextureAPI.initCubemapTexture(texture, state);
          let state = CubemapTextureAPI.initCubemapTexture(texture, state);

          createTexture |> expect |> toCalledOnce;
        });
      })
    );

    describe("disposeCubemapTexture", () => {
      test("if is remove texture, not dispose data", () => {
        let (state, texture) = createCubemapTexture(state^);
        let source = CubemapTextureTool.buildSource();
        let state = state |> setCubemapTexturePXSource(texture, source);

        let state =
          state |> CubemapTextureAPI.disposeCubemapTexture(texture, true);

        CubemapTextureTool.getCubemapTexturePXSource(texture, state)
        |> Js.Option.isNone
        |> expect == false;
      });

      describe("else, dispose data", () => {
        test("remove from nameMap", () => {
          let (state, texture) = createCubemapTexture(state^);
          let state =
            state |> CubemapTextureAPI.setCubemapTextureName(texture, "name");

          let state =
            state |> CubemapTextureAPI.disposeCubemapTexture(texture, false);

          CubemapTextureAPI.getCubemapTextureName(texture, state)
          |> expect == None;
        });
        test(
          "remove from pxSourceMap, nxSourceMap, pySourceMap, nySourceMap, pzSourceMap, nzSourceMap",
          () => {
            let (state, texture) = createCubemapTexture(state^);
            let state =
              CubemapTextureTool.setAllSources(~state, ~texture, ());

            let state =
              state |> CubemapTextureAPI.disposeCubemapTexture(texture, false);

            (
              CubemapTextureTool.getCubemapTexturePXSource(texture, state),
              CubemapTextureTool.getCubemapTextureNZSource(texture, state),
            )
            |> expect == (None, None);
          },
        );

        describe("test remove from type array", () => {
          let _testRemoveFromTypeArr =
              (
                state,
                (value1, value2),
                defaultValue,
                (disposeTextureFunc, getValueFunc, setValueFunc),
              ) => {
            open Wonder_jest;
            open Expect;
            open Expect.Operators;
            open Sinon;

            let (state, texture1) = createCubemapTexture(state^);
            let (state, texture2) = createCubemapTexture(state);

            let state = state |> setValueFunc(texture1, value1);
            let state = state |> setValueFunc(texture2, value2);
            let state = state |> disposeTextureFunc(texture1, false);

            (getValueFunc(texture1, state), getValueFunc(texture2, state))
            |> expect == (defaultValue, value2);
          };

          test("remove from wrapSs", () =>
            _testRemoveFromTypeArr(
              state,
              (TextureType.Repeat, TextureType.Mirrored_repeat),
              BufferCubemapTextureService.getDefaultWrapS(),
              (
                CubemapTextureAPI.disposeCubemapTexture,
                CubemapTextureAPI.getCubemapTextureWrapS,
                CubemapTextureAPI.setCubemapTextureWrapS,
              ),
            )
          );
          test("remove from wrapTs", () =>
            _testRemoveFromTypeArr(
              state,
              (TextureType.Repeat, TextureType.Mirrored_repeat),
              BufferCubemapTextureService.getDefaultWrapT(),
              (
                CubemapTextureAPI.disposeCubemapTexture,
                CubemapTextureAPI.getCubemapTextureWrapT,
                CubemapTextureAPI.setCubemapTextureWrapT,
              ),
            )
          );
          test("remove from magFilters", () =>
            _testRemoveFromTypeArr(
              state,
              (
                TextureType.Linear_mipmap_nearest,
                TextureType.Nearest_mipmap_linear,
              ),
              BufferCubemapTextureService.getDefaultMagFilter(),
              (
                CubemapTextureAPI.disposeCubemapTexture,
                CubemapTextureAPI.getCubemapTextureMagFilter,
                CubemapTextureAPI.setCubemapTextureMagFilter,
              ),
            )
          );
          test("remove from minFilters", () =>
            _testRemoveFromTypeArr(
              state,
              (
                TextureType.Linear_mipmap_nearest,
                TextureType.Nearest_mipmap_linear,
              ),
              BufferCubemapTextureService.getDefaultMinFilter(),
              (
                CubemapTextureAPI.disposeCubemapTexture,
                CubemapTextureAPI.getCubemapTextureMinFilter,
                CubemapTextureAPI.setCubemapTextureMinFilter,
              ),
            )
          );

          describe("remove from formats", () => {
            test("remove from pxFormats", () =>
              _testRemoveFromTypeArr(
                state,
                (TextureType.Rgbas3tcdxt3, TextureType.Alpha),
                BufferCubemapTextureService.getDefaultFormat(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTexturePXFormat,
                  CubemapTextureAPI.setCubemapTexturePXFormat,
                ),
              )
            );
            test("remove from nxFormats", () =>
              _testRemoveFromTypeArr(
                state,
                (TextureType.Rgbas3tcdxt3, TextureType.Alpha),
                BufferCubemapTextureService.getDefaultFormat(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTextureNXFormat,
                  CubemapTextureAPI.setCubemapTextureNXFormat,
                ),
              )
            );
            test("remove from pyFormats", () =>
              _testRemoveFromTypeArr(
                state,
                (TextureType.Rgbas3tcdxt3, TextureType.Alpha),
                BufferCubemapTextureService.getDefaultFormat(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTexturePYFormat,
                  CubemapTextureAPI.setCubemapTexturePYFormat,
                ),
              )
            );
            test("remove from nyFormats", () =>
              _testRemoveFromTypeArr(
                state,
                (TextureType.Rgbas3tcdxt3, TextureType.Alpha),
                BufferCubemapTextureService.getDefaultFormat(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTextureNYFormat,
                  CubemapTextureAPI.setCubemapTextureNYFormat,
                ),
              )
            );
            test("remove from pzFormats", () =>
              _testRemoveFromTypeArr(
                state,
                (TextureType.Rgbas3tcdxt3, TextureType.Alpha),
                BufferCubemapTextureService.getDefaultFormat(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTexturePZFormat,
                  CubemapTextureAPI.setCubemapTexturePZFormat,
                ),
              )
            );
            test("remove from nzFormats", () =>
              _testRemoveFromTypeArr(
                state,
                (TextureType.Rgbas3tcdxt3, TextureType.Alpha),
                BufferCubemapTextureService.getDefaultFormat(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTextureNZFormat,
                  CubemapTextureAPI.setCubemapTextureNZFormat,
                ),
              )
            );
          });

          describe("remove from types", () => {
            test("remove from pxTypes", () =>
              _testRemoveFromTypeArr(
                state,
                (
                  TextureTypeService.getUnsignedShort4444(),
                  TextureTypeService.getUnsignedShort5551(),
                ),
                BufferCubemapTextureService.getDefaultType(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTexturePXType,
                  CubemapTextureAPI.setCubemapTexturePXType,
                ),
              )
            );
            test("remove from nxTypes", () =>
              _testRemoveFromTypeArr(
                state,
                (
                  TextureTypeService.getUnsignedShort4444(),
                  TextureTypeService.getUnsignedShort5551(),
                ),
                BufferCubemapTextureService.getDefaultType(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTextureNXType,
                  CubemapTextureAPI.setCubemapTextureNXType,
                ),
              )
            );
            test("remove from pyTypes", () =>
              _testRemoveFromTypeArr(
                state,
                (
                  TextureTypeService.getUnsignedShort4444(),
                  TextureTypeService.getUnsignedShort5551(),
                ),
                BufferCubemapTextureService.getDefaultType(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTexturePYType,
                  CubemapTextureAPI.setCubemapTexturePYType,
                ),
              )
            );
            test("remove from nyTypes", () =>
              _testRemoveFromTypeArr(
                state,
                (
                  TextureTypeService.getUnsignedShort4444(),
                  TextureTypeService.getUnsignedShort5551(),
                ),
                BufferCubemapTextureService.getDefaultType(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTextureNYType,
                  CubemapTextureAPI.setCubemapTextureNYType,
                ),
              )
            );
            test("remove from pzTypes", () =>
              _testRemoveFromTypeArr(
                state,
                (
                  TextureTypeService.getUnsignedShort4444(),
                  TextureTypeService.getUnsignedShort5551(),
                ),
                BufferCubemapTextureService.getDefaultType(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTexturePZType,
                  CubemapTextureAPI.setCubemapTexturePZType,
                ),
              )
            );
            test("remove from nzTypes", () =>
              _testRemoveFromTypeArr(
                state,
                (
                  TextureTypeService.getUnsignedShort4444(),
                  TextureTypeService.getUnsignedShort5551(),
                ),
                BufferCubemapTextureService.getDefaultType(),
                (
                  CubemapTextureAPI.disposeCubemapTexture,
                  CubemapTextureAPI.getCubemapTextureNZType,
                  CubemapTextureAPI.setCubemapTextureNZType,
                ),
              )
            );
          });

          test("remove from isNeedUpdates", () =>
            _testRemoveFromTypeArr(
              state,
              (true, false),
              CubemapTextureTool.getDefaultIsNeedUpdateBool(),
              (
                CubemapTextureAPI.disposeCubemapTexture,
                CubemapTextureTool.getIsNeedUpdate,
                CubemapTextureTool.setIsNeedUpdate,
              ),
            )
          );
          test("remove from flipYs", () =>
            _testRemoveFromTypeArr(
              state,
              (true, false),
              BufferCubemapTextureService.getDefaultFlipY()
              |> BufferTextureService.getFlipYFromTypeArrayValue,
              (
                CubemapTextureAPI.disposeCubemapTexture,
                CubemapTextureAPI.getCubemapTextureFlipY,
                CubemapTextureAPI.setCubemapTextureFlipY,
              ),
            )
          );
        });

        describe("test remove worker data", () => {
          test("remove from needAddedSourceArray", () => {
            let state = TestWorkerTool.markUseWorker(state^);
            let (state, texture) = createCubemapTexture(state);
            let state =
              CubemapTextureTool.setAllSources(~state, ~texture, ());

            let state =
              CubemapTextureAPI.disposeCubemapTexture(texture, false, state);

            CubemapTextureTool.getNeedAddedAllSourceArray(state)
            |> Js.Array.map(needAddedSourceArray =>
                 needAddedSourceArray |> Js.Array.length
               )
            |> expect == [|0, 0, 0, 0, 0, 0|];
          });
          test("remove from needInitedTextureIndexArray", () => {
            let (state, texture) = createCubemapTexture(state^);
            let state =
              CubemapTextureTool.setAllSources(~state, ~texture, ());
            let needInitedTextureIndexArray =
              CubemapTextureTool.getNeedInitedTextureIndexArray(state);
            let needInitedTextureIndexArray =
              needInitedTextureIndexArray |> ArrayService.push(texture);

            let state =
              CubemapTextureAPI.disposeCubemapTexture(texture, false, state);

            CubemapTextureTool.getNeedInitedTextureIndexArray(state)
            |> Js.Array.length
            |> expect == 0;
          });
        });
      });
    });
  });