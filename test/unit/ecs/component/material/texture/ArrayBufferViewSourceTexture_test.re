open ArrayBufferViewSourceTextureAPI;

open Wonder_jest;

let _ =
  describe("ArrayBufferViewTexture", () => {
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
    describe("createArrayBufferViewSourceTexture", () => {
      test(
        "create a new texture which starts from arrayBufferViewSourceTextureIndexOffset",
        () => {
          let (state, texture) = createArrayBufferViewSourceTexture(state^);
          expect(texture)
          == ArrayBufferViewSourceTextureTool.generateArrayBufferViewSourceTextureIndex(
               0,
               state,
             );
        },
      );
      test("shouldn't exceed buffer count", () => {
        let state =
          TestTool.initWithoutBuildFakeDom(
            ~sandbox,
            ~buffer=
              SettingTool.buildBufferConfigStr(
                ~arrayBufferViewSourceTextureCount=2,
                (),
              ),
            (),
          );
        let (_, texture) = createArrayBufferViewSourceTexture(state);
        let (_, texture) = createArrayBufferViewSourceTexture(state);
        expect(() => {
          let (_, texture) = createArrayBufferViewSourceTexture(state);
          ();
        })
        |> toThrowMessage("expect index: 52 <= maxIndex: 51, but actual not");
      });
    });
    describe("test default data", () => {
      describe("is need updates", () =>
        test("default is need update", () => {
          let (state, texture) = createArrayBufferViewSourceTexture(state^);
          ArrayBufferViewSourceTextureTool.isNeedUpdate(texture, state)
          |> expect == true;
        })
      );

      describe("is flipY", () =>
        test("default is true", () => {
          let (state, texture) = createArrayBufferViewSourceTexture(state^);
          ArrayBufferViewSourceTextureAPI.getArrayBufferViewSourceTextureFlipY(
            texture,
            state,
          )
          |> expect == true;
        })
      );
    });
    describe("setArrayBufferViewSourceTextureSource", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let source = ArrayBufferViewSourceTextureTool.buildSource();
        let state =
          state |> setArrayBufferViewSourceTextureSource(texture, source);
        unsafeGetArrayBufferViewSourceTextureSource(texture, state)
        |> expect == source;
      })
    );
    describe("setArrayBufferViewSourceTextureWidth", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let width = 5;
        let state =
          state |> setArrayBufferViewSourceTextureWidth(texture, width);
        getArrayBufferViewSourceTextureWidth(texture, state)
        |> expect == width;
      })
    );
    describe("setArrayBufferViewSourceTextureHeight", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let height = 5;
        let state =
          state |> setArrayBufferViewSourceTextureHeight(texture, height);
        getArrayBufferViewSourceTextureHeight(texture, state)
        |> expect == height;
      })
    );
    describe("setArrayBufferViewSourceTextureWrapS", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let wrap = SourceTextureType.MIRRORED_REPEAT;
        let state =
          state |> setArrayBufferViewSourceTextureWrapS(texture, wrap);
        getArrayBufferViewSourceTextureWrapS(texture, state) |> expect == wrap;
      })
    );
    describe("setArrayBufferViewSourceTextureWrapT", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let wrap = SourceTextureType.MIRRORED_REPEAT;
        let state =
          state |> setArrayBufferViewSourceTextureWrapT(texture, wrap);
        getArrayBufferViewSourceTextureWrapT(texture, state) |> expect == wrap;
      })
    );
    describe("setArrayBufferViewSourceTextureMagFilter", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let filter = SourceTextureType.LINEAR;
        let state =
          state |> setArrayBufferViewSourceTextureMagFilter(texture, filter);
        getArrayBufferViewSourceTextureMagFilter(texture, state)
        |> expect == filter;
      })
    );
    describe("setArrayBufferViewSourceTextureMinFilter", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let filter = SourceTextureType.LINEAR;
        let state =
          state |> setArrayBufferViewSourceTextureMinFilter(texture, filter);
        getArrayBufferViewSourceTextureMinFilter(texture, state)
        |> expect == filter;
      })
    );
    describe("setArrayBufferViewSourceTextureFormat", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let format = 1;
        let state =
          state |> setArrayBufferViewSourceTextureFormat(texture, format);
        getArrayBufferViewSourceTextureFormat(texture, state)
        |> expect == format;
      })
    );
    describe("setArrayBufferViewSourceTextureType", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let type_ = 1;
        let state =
          state |> setArrayBufferViewSourceTextureType(texture, type_);
        getArrayBufferViewSourceTextureType(texture, state) |> expect == type_;
      })
    );
    describe("setArrayBufferViewSourceTextureFlipY", () =>
      test("test", () => {
        let (state, texture) = createArrayBufferViewSourceTexture(state^);
        let state =
          state |> setArrayBufferViewSourceTextureFlipY(texture, false);
        getArrayBufferViewSourceTextureFlipY(texture, state)
        |> expect == false;
      })
    );
  });