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
                  ~buffer=SettingTool.buildBufferConfigStr(~textureDataBufferCount=1, ()),
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
        () => {
          describe(
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
          );
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
        }
      );
      describe(
        "getTextureWidth",
        () => {
          describe(
            "if set source",
            () => {
              let _prepare = (state, width) => {
                let (state, texture) = createTexture(state^);
                let source = Obj.magic({"width": 100});
                let state = state |> TextureAPI.setTextureSource(texture, source);
                let state = state |> setTextureWidth(texture, width);
                (state, texture, source)
              };
              test(
                "if width is 0, return source.width",
                () => {
                  let (state, texture, source) = _prepare(state, 0);
                  getTextureWidth(texture, state) |> expect == source##width
                }
              );
              test(
                "else, return width",
                () => {
                  let (state, texture, source) = _prepare(state, 50);
                  getTextureWidth(texture, state) |> expect == 50
                }
              )
            }
          );
          test(
            "else, return width",
            () => {
              let (state, texture) = createTexture(state^);
              let state = state |> setTextureWidth(texture, 50);
              getTextureWidth(texture, state) |> expect == 50
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
              let _prepare = (state, height) => {
                let (state, texture) = createTexture(state^);
                let source = Obj.magic({"height": 200});
                let state = state |> TextureAPI.setTextureSource(texture, source);
                let state = state |> setTextureHeight(texture, height);
                (state, texture, source)
              };
              test(
                "if height is 0, return source.height",
                () => {
                  let (state, texture, source) = _prepare(state, 0);
                  getTextureHeight(texture, state) |> expect == source##height
                }
              );
              test(
                "else, return height",
                () => {
                  let (state, texture, source) = _prepare(state, 50);
                  getTextureHeight(texture, state) |> expect == 50
                }
              )
            }
          );
          test(
            "else, return height",
            () => {
              let (state, texture) = createTexture(state^);
              let state = state |> setTextureHeight(texture, 50);
              getTextureHeight(texture, state) |> expect == 50
            }
          )
        }
      )
    }
  );