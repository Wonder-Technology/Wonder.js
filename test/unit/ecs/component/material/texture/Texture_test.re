open TextureAPI;

open Wonder_jest;

let _ =
  describe(
    "Texture",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(CreateStateMainService.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "createTexture",
        () => {
          test(
            "create a new texture which is just index(int)",
            () => {
              let (_, texture) = createTexture(state^);
              expect(texture) == 0
            }
          );
          test(
            "shouldn't exceed buffer count",
            () => {
              let state =
                TestTool.initWithoutBuildFakeDom(
                  ~sandbox,
                  ~buffer=SettingTool.buildBufferConfigStr(~textureCount=1, ()),
                  ()
                );
              let (_, texture) = createTexture(state);
              expect(
                () => {
                  let (_, texture) = createTexture(state);
                  ()
                }
              )
              |> toThrowMessage("expect index: 1 <= maxIndex: 0, but actual not")
            }
          )
        }
      );
      describe(
        "test default data",
        () =>
          /* describe(
               "get width",
               () =>
                 test(
                   "default is 0",
                   () => {
                     let (state, texture) = createTexture(state^);
                     getTextureWidth(texture, state) |> expect == 0
                   }
                 )
             );
             describe(
               "get height",
               () =>
                 test(
                   "default is 0",
                   () => {
                     let (state, texture) = createTexture(state^);
                     getTextureHeight(texture, state) |> expect == 0
                   }
                 )
             ); */
          describe(
            "is need updates",
            () =>
              test(
                "default is need update",
                () => {
                  let (state, texture) = createTexture(state^);
                  TextureTool.isNeedUpdate(texture, state) |> expect == true
                }
              )
          )
      );
      describe(
        "getTextureWidth",
        () => {
          describe(
            "if set source",
            () => {
              let _prepare = (state) => {
                let (state, texture) = createTexture(state^);
                let source = Obj.magic({"width": 100});
                let state = state |> TextureAPI.setTextureSource(texture, source);
                (state, texture, source)
              };
              test(
                "return source.width",
                () => {
                  let (state, texture, source) = _prepare(state);
                  getTextureWidth(texture, state) |> expect == source##width
                }
              )
            }
          );
          test(
            "else, fatal",
            () => {
              let (state, texture) = createTexture(state^);
              expect(() => getTextureWidth(texture, state))
              |> toThrowMessage("source should exist")
            }
          )
        }
      );
      describe(
        "getTextureHeight",
        () => {
          describe(
            "if set source",
            () => {
              let _prepare = (state) => {
                let (state, texture) = createTexture(state^);
                let source = Obj.magic({"height": 100});
                let state = state |> TextureAPI.setTextureSource(texture, source);
                (state, texture, source)
              };
              test(
                "return source.height",
                () => {
                  let (state, texture, source) = _prepare(state);
                  getTextureHeight(texture, state) |> expect == source##height
                }
              )
            }
          );
          test(
            "else, fatal",
            () => {
              let (state, texture) = createTexture(state^);
              expect(() => getTextureHeight(texture, state))
              |> toThrowMessage("source should exist")
            }
          )
        }
      );
      describe(
        "setTextureWrapS",
        () =>
          test(
            "test",
            () => {
              let (state, texture) = createTexture(state^);
              let wrap = 1;
              let state = state |> setTextureWrapS(texture, wrap);
              getTextureWrapS(texture, state) |> expect == wrap
            }
          )
      );
      describe(
        "setTextureWrapT",
        () =>
          test(
            "test",
            () => {
              let (state, texture) = createTexture(state^);
              let wrap = 1;
              let state = state |> setTextureWrapT(texture, wrap);
              getTextureWrapT(texture, state) |> expect == wrap
            }
          )
      );
      describe(
        "setTextureMagFilter",
        () =>
          test(
            "test",
            () => {
              let (state, texture) = createTexture(state^);
              let filter = 1;
              let state = state |> setTextureMagFilter(texture, filter);
              getTextureMagFilter(texture, state) |> expect == filter
            }
          )
      );
      describe(
        "setTextureMinFilter",
        () =>
          test(
            "test",
            () => {
              let (state, texture) = createTexture(state^);
              let filter = 1;
              let state = state |> setTextureMinFilter(texture, filter);
              getTextureMinFilter(texture, state) |> expect == filter
            }
          )
      );
      describe(
        "setTextureFormat",
        () =>
          test(
            "test",
            () => {
              let (state, texture) = createTexture(state^);
              let format = 1;
              let state = state |> setTextureFormat(texture, format);
              getTextureFormat(texture, state) |> expect == format
            }
          )
      );
      describe(
        "setTextureType",
        () =>
          test(
            "test",
            () => {
              let (state, texture) = createTexture(state^);
              let type_ = 1;
              let state = state |> setTextureType(texture, type_);
              getTextureType(texture, state) |> expect == type_
            }
          )
      )
    }
  );