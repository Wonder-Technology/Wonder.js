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
          |> expect == source##width;
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
          |> expect == source##height;
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
        let wrap = SourceTextureType.MIRRORED_REPEAT;
        let state = state |> setBasicSourceTextureWrapS(texture, wrap);
        getBasicSourceTextureWrapS(texture, state) |> expect == wrap;
      })
    );
    describe("setBasicSourceTextureWrapT", () =>
      test("test", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        let wrap = SourceTextureType.MIRRORED_REPEAT;
        let state = state |> setBasicSourceTextureWrapT(texture, wrap);
        getBasicSourceTextureWrapT(texture, state) |> expect == wrap;
      })
    );
    describe("setBasicSourceTextureMagFilter", () =>
      test("test", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        let filter = SourceTextureType.LINEAR;
        let state = state |> setBasicSourceTextureMagFilter(texture, filter);
        getBasicSourceTextureMagFilter(texture, state) |> expect == filter;
      })
    );
    describe("setBasicSourceTextureMinFilter", () =>
      test("test", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        let filter = SourceTextureType.LINEAR;
        let state = state |> setBasicSourceTextureMinFilter(texture, filter);
        getBasicSourceTextureMinFilter(texture, state) |> expect == filter;
      })
    );
    describe("setBasicSourceTextureFormat", () =>
      test("test", () => {
        let (state, texture) = createBasicSourceTexture(state^);
        let format = SourceTextureType.RGB;
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
  });