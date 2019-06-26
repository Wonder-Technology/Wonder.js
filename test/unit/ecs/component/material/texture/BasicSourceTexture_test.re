open BasicSourceTextureAPI;

open Wonder_jest;

let _ =
  describe("BasicSourceTexture", () => {
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

    describe("createBasicSourceTexture", () => {
      test("create a new texture which is just index(int)", () => {
        let (_, texture) = createBasicSourceTexture(state^);
        expect(texture) == 0;
      });
      test("shouldn't exceed buffer count", () => {
        let state =
          TestTool.initWithoutBuildFakeDom(
            ~sandbox,
            ~buffer=
              SettingTool.buildBufferConfigStr(
                ~basicSourceTextureCount=2,
                (),
              ),
            (),
          );
        let (_, texture) = createBasicSourceTexture(state);
        let (_, texture) = createBasicSourceTexture(state);
        expect(() => {
          let (_, texture) = createBasicSourceTexture(state);
          ();
        })
        |> toThrowMessage("expect index: 2 <= maxIndex: 1, but actual not");
      });
    });

    describe("test default data", () => {
      describe("is need updates", () =>
        test("default is need update", () => {
          let (state, texture) = createBasicSourceTexture(state^);
          BasicSourceTextureTool.isNeedUpdate(texture, state)
          |> expect == true;
        })
      );

      describe("is flipY", () =>
        test("default is true", () => {
          let (state, texture) = createBasicSourceTexture(state^);
          BasicSourceTextureAPI.getBasicSourceTextureFlipY(texture, state)
          |> expect == true;
        })
      );
    });

    describe("getBasicSourceTextureWidth", () => {
      describe("if set source", () => {
        let _prepare = state => {
          let (state, texture) = createBasicSourceTexture(state^);
          let source = Obj.magic({"width": 100});
          let state =
            state
            |> BasicSourceTextureAPI.setBasicSourceTextureSource(
                 texture,
                 source,
               );
          (state, texture, source);
        };
        test("return source.width", () => {
          let (state, texture, source) = _prepare(state);
          getBasicSourceTextureWidth(texture, state)
          |> expect ==
          source##width;
        });
      });
      test("else, fatal", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        expect(() =>
          getBasicSourceTextureWidth(texture, state)
        )
        |> toThrowMessage("source should exist");
      });
    });

    describe("getBasicSourceTextureHeight", () => {
      describe("if set source", () => {
        let _prepare = state => {
          let (state, texture) = createBasicSourceTexture(state^);
          let source = Obj.magic({"height": 100});
          let state =
            state
            |> BasicSourceTextureAPI.setBasicSourceTextureSource(
                 texture,
                 source,
               );
          (state, texture, source);
        };
        test("return source.height", () => {
          let (state, texture, source) = _prepare(state);
          getBasicSourceTextureHeight(texture, state)
          |> expect ==
          source##height;
        });
      });
      test("else, fatal", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        expect(() =>
          getBasicSourceTextureHeight(texture, state)
        )
        |> toThrowMessage("source should exist");
      });
    });

    describe("setBasicSourceTextureWrapS", () =>
      test("test", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        let wrap = TextureType.Mirrored_repeat;
        let state = state |> setBasicSourceTextureWrapS(texture, wrap);
        getBasicSourceTextureWrapS(texture, state) |> expect == wrap;
      })
    );

    describe("setBasicSourceTextureWrapT", () =>
      test("test", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        let wrap = TextureType.Mirrored_repeat;
        let state = state |> setBasicSourceTextureWrapT(texture, wrap);
        getBasicSourceTextureWrapT(texture, state) |> expect == wrap;
      })
    );

    describe("setBasicSourceTextureMagFilter", () =>
      test("test", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        let filter = TextureType.Linear;
        let state = state |> setBasicSourceTextureMagFilter(texture, filter);
        getBasicSourceTextureMagFilter(texture, state) |> expect == filter;
      })
    );

    describe("setBasicSourceTextureMinFilter", () =>
      test("test", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        let filter = TextureType.Linear;
        let state = state |> setBasicSourceTextureMinFilter(texture, filter);
        getBasicSourceTextureMinFilter(texture, state) |> expect == filter;
      })
    );

    describe("setBasicSourceTextureFormat", () =>
      test("test", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        let format = TextureType.Rgb;
        let state = state |> setBasicSourceTextureFormat(texture, format);
        getBasicSourceTextureFormat(texture, state) |> expect == format;
      })
    );

    describe("setBasicSourceTextureType", () =>
      test("test", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        let type_ = 1;
        let state = state |> setBasicSourceTextureType(texture, type_);
        getBasicSourceTextureType(texture, state) |> expect == type_;
      })
    );

    describe("setBasicSourceTextureFlipY", () =>
      test("test", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        let state = state |> setBasicSourceTextureFlipY(texture, false);
        getBasicSourceTextureFlipY(texture, state) |> expect == false;
      })
    );

    describe("getAllTextures", () =>
      test("get all created textures", () => {
        let (state, texture1) = createBasicSourceTexture(state^);
        let (state, texture2) = createBasicSourceTexture(state);

        BasicSourceTextureAPI.getAllTextures(state)
        |> expect == [|texture1, texture2|];
      })
    );

    describe("dispose from material", () => {
      beforeEach(() =>
        state :=
          state^
          |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()))
      );

      describe("remove material from group", () =>
        test("test light material", () => {
          let (state, material1, (diffuseMap, specularMap, source1, source2)) =
            LightMaterialTool.createMaterialWithMap(state^);
          let (state, material2) =
            LightMaterialAPI.createLightMaterial(state);
          let (state, _) =
            LightMaterialTool.setMaps(
              material2,
              diffuseMap,
              specularMap,
              state,
            );

          let state =
            LightMaterialAPI.batchDisposeLightMaterial([|material1|], state);

          (
            BasicSourceTextureTool.unsafeGetMaterialDataArr(diffuseMap, state)
            |> Js.Array.length,
            BasicSourceTextureTool.unsafeGetMaterialDataArr(
              specularMap,
              state,
            )
            |> Js.Array.length,
          )
          |> expect == (1, 1);
        })
      );

      test("if other materials use the texture, not dispose texture data", () => {
        let (state, material1, (diffuseMap, specularMap, source1, source2)) =
          LightMaterialTool.createMaterialWithMap(state^);
        let (state, material2) = LightMaterialAPI.createLightMaterial(state);
        let (state, _) =
          LightMaterialTool.setMaps(
            material2,
            diffuseMap,
            specularMap,
            state,
          );

        let state =
          LightMaterialAPI.batchDisposeLightMaterial([|material1|], state);

        (
          BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
            diffuseMap,
            state,
          ),
          BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
            specularMap,
            state,
          ),
        )
        |> expect == (source1, source2);
      });

      test("if is remove texture, not dispose data", () => {
        let (state, material1, (diffuseMap, specularMap, source1, source2)) =
          LightMaterialTool.createMaterialWithMap(state^);

        let state =
          LightMaterialAPI.batchDisposeLightMaterialRemoveTexture(
            [|material1|],
            state,
          );

        BasicSourceTextureTool.getBasicSourceTextureSource(diffuseMap, state)
        |> Js.Option.isNone
        |> expect == false;
      });

      describe("else", () => {
        test("remove from sourceMap, nameMap", () => {
          let (state, material1, (diffuseMap, specularMap, source1, source2)) =
            LightMaterialTool.createMaterialWithMap(state^);
          let state =
            state
            |> BasicSourceTextureAPI.setBasicSourceTextureName(
                 diffuseMap,
                 "name",
               );

          let state =
            LightMaterialAPI.batchDisposeLightMaterial([|material1|], state);

          (
            BasicSourceTextureAPI.getBasicSourceTextureName(diffuseMap, state),
            BasicSourceTextureTool.getBasicSourceTextureSource(
              diffuseMap,
              state,
            ),
          )
          |> expect == (None, None);
        });

        describe("test remove from type array", () => {
          let _testRemoveFromTypeArr =
              (
                state,
                (value1, value2),
                defaultValue,
                (disposeMaterialFunc, getValueFunc, setValueFunc),
              ) => {
            open Wonder_jest;
            open Expect;
            open Expect.Operators;
            open Sinon;

            let (state, material1, (texture1, source1)) =
              LightMaterialTool.createMaterialWithDiffuseMap(state^);
            let (state, material2, (texture2, source2)) =
              LightMaterialTool.createMaterialWithDiffuseMap(state);

            let state = state |> setValueFunc(texture1, value1);
            let state = state |> setValueFunc(texture2, value2);
            let state = state |> disposeMaterialFunc(material1);
            (getValueFunc(texture1, state), getValueFunc(texture2, state))
            |> expect == (defaultValue, value2);
          };

          test("remove from wrapSs", () =>
            _testRemoveFromTypeArr(
              state,
              (TextureType.Repeat, TextureType.Mirrored_repeat),
              BufferBasicSourceTextureService.getDefaultWrapS(),
              (
                LightMaterialTool.disposeLightMaterial,
                BasicSourceTextureAPI.getBasicSourceTextureWrapS,
                BasicSourceTextureAPI.setBasicSourceTextureWrapS,
              ),
            )
          );
          test("remove from wrapTs", () =>
            _testRemoveFromTypeArr(
              state,
              (TextureType.Repeat, TextureType.Mirrored_repeat),
              BufferBasicSourceTextureService.getDefaultWrapT(),
              (
                LightMaterialTool.disposeLightMaterial,
                BasicSourceTextureAPI.getBasicSourceTextureWrapT,
                BasicSourceTextureAPI.setBasicSourceTextureWrapT,
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
              BufferBasicSourceTextureService.getDefaultMagFilter(),
              (
                LightMaterialTool.disposeLightMaterial,
                BasicSourceTextureAPI.getBasicSourceTextureMagFilter,
                BasicSourceTextureAPI.setBasicSourceTextureMagFilter,
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
              BufferBasicSourceTextureService.getDefaultMinFilter(),
              (
                LightMaterialTool.disposeLightMaterial,
                BasicSourceTextureAPI.getBasicSourceTextureMinFilter,
                BasicSourceTextureAPI.setBasicSourceTextureMinFilter,
              ),
            )
          );
          test("remove from formats", () =>
            _testRemoveFromTypeArr(
              state,
              (TextureType.Rgba, TextureType.Alpha),
              BufferBasicSourceTextureService.getDefaultFormat(),
              (
                LightMaterialTool.disposeLightMaterial,
                BasicSourceTextureAPI.getBasicSourceTextureFormat,
                BasicSourceTextureAPI.setBasicSourceTextureFormat,
              ),
            )
          );
          test("remove from types", () =>
            _testRemoveFromTypeArr(
              state,
              (
                TextureTypeService.getUnsignedShort4444(),
                TextureTypeService.getUnsignedShort5551(),
              ),
              BufferBasicSourceTextureService.getDefaultType(),
              (
                LightMaterialTool.disposeLightMaterial,
                BasicSourceTextureAPI.getBasicSourceTextureType,
                BasicSourceTextureAPI.setBasicSourceTextureType,
              ),
            )
          );
          test("remove from isNeedUpdates", () =>
            _testRemoveFromTypeArr(
              state,
              (true, false),
              true,
              (
                LightMaterialTool.disposeLightMaterial,
                BasicSourceTextureTool.getIsNeedUpdate,
                BasicSourceTextureTool.setIsNeedUpdate,
              ),
            )
          );
          test("remove from flipYs", () =>
            _testRemoveFromTypeArr(
              state,
              (true, false),
              true,
              (
                LightMaterialTool.disposeLightMaterial,
                BasicSourceTextureAPI.getBasicSourceTextureFlipY,
                BasicSourceTextureAPI.setBasicSourceTextureFlipY,
              ),
            )
          );
        });

        /* describe("remove from glTextureMap", () => {
             let _prepareAndExec = state => {
               let (
                 state,
                 material1,
                 (diffuseMap, specularMap, source1, source2),
               ) =
                 LightMaterialTool.createMaterialWithMap(state^);
               let glTexture = Obj.magic(100);
               let state =
                 state
                 |> BasicSourceTextureTool.setGlTexture(diffuseMap, glTexture);
               let gl = DeviceManagerAPI.unsafeGetGl(state) |> Obj.magic;

               let state =
                 LightMaterialAPI.batchDisposeLightMaterial(
                   [|material1|],
                   state,
                 );

               (state, gl, glTexture, diffuseMap);
             };

             test("delete gl texture", () => {
               let (state, gl, glTexture, _) = _prepareAndExec(state);

               gl##deleteTexture |> expect |> toCalledWith([|glTexture|]);
             });
             test("remove from glTextureMap", () => {
               let (state, gl, _, diffuseMap) = _prepareAndExec(state);

               BasicSourceTextureTool.getTexture(diffuseMap, state)
               |> expect == None;
             });
           }); */

        describe("test remove worker data", () => {
          test("remove from needAddedSourceArray", () => {
            let state = TestWorkerTool.markUseWorker(state^);
            let (
              state,
              material1,
              (diffuseMap, specularMap, source1, source2),
            ) =
              LightMaterialTool.createMaterialWithMap(state);

            let state =
              LightMaterialAPI.batchDisposeLightMaterial(
                [|material1|],
                state,
              );

            BasicSourceTextureTool.getNeedAddedSourceArray(state)
            |> Js.Array.length
            |> expect == 0;
          });
          test("remove from needInitedTextureIndexArray", () => {
            let (
              state,
              material1,
              (diffuseMap, specularMap, source1, source2),
            ) =
              LightMaterialTool.createMaterialWithMap(state^);
            let needInitedTextureIndexArray =
              BasicSourceTextureTool.getNeedInitedTextureIndexArray(state);
            let needInitedTextureIndexArray =
              needInitedTextureIndexArray
              |> ArrayService.push(diffuseMap)
              |> ArrayService.push(specularMap);

            let state =
              LightMaterialAPI.batchDisposeLightMaterial(
                [|material1|],
                state,
              );

            BasicSourceTextureTool.getNeedInitedTextureIndexArray(state)
            |> Js.Array.length
            |> expect == 0;
          });
        });
      });
    });

    describe("disposeBasicSourceTexture", () => {
      test("clear texture's materials", () => {
        let (state, material1, (diffuseMap, specularMap, source1, source2)) =
          LightMaterialTool.createMaterialWithMap(state^);
        let (state, material2) = LightMaterialAPI.createLightMaterial(state);
        let (state, (diffuseMap, specularMap)) =
          state
          |> LightMaterialTool.setMaps(material2, diffuseMap, specularMap);

        let state =
          state
          |> BasicSourceTextureAPI.disposeBasicSourceTexture(
               specularMap,
               false,
             );

        (
          BasicSourceTextureTool.getMaterialDataArr(diffuseMap, state)
          |> OptionService.unsafeGet
          |> Js.Array.length,
          BasicSourceTextureTool.getMaterialDataArr(specularMap, state)
          |> Js.Option.isNone,
        )
        |> expect == (2, true);
      });

      test("if is remove texture, not dispose data", () => {
        let (state, material1, (diffuseMap, specularMap, source1, source2)) =
          LightMaterialTool.createMaterialWithMap(state^);

        let state =
          state
          |> BasicSourceTextureAPI.disposeBasicSourceTexture(
               specularMap,
               true,
             );

        BasicSourceTextureTool.getBasicSourceTextureSource(specularMap, state)
        |> Js.Option.isNone
        |> expect == false;
      });
      test("else, dispose data", () => {
        let (state, material1, (diffuseMap, specularMap, source1, source2)) =
          LightMaterialTool.createMaterialWithMap(state^);

        let state =
          state
          |> BasicSourceTextureAPI.disposeBasicSourceTexture(
               specularMap,
               false,
             );

        BasicSourceTextureTool.getBasicSourceTextureSource(specularMap, state)
        |> Js.Option.isNone
        |> expect == true;
      });
    });
  });