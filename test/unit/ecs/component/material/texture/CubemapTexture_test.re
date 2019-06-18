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
        test("default is true", () => {
          let (state, texture) = createCubemapTexture(state^);

          CubemapTextureAPI.getCubemapTextureFlipY(texture, state)
          |> expect == true;
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

    /* TODO test after add skybox material

     describe("dispose from material", () => {
          beforeEach(() =>
            state :=
              state^
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()))
          );


        });


     describe("disposeCubemapTexture", () => {
     });
        */
  });