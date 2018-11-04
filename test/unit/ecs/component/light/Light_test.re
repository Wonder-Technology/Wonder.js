open Wonder_jest;

let _ =
  describe("test light", () => {
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

    describe("fix bug", () =>
      describe("test operate the light which is is-render", () =>
        test("if the light exceed max count, should still work", () => {
          let (state, _) = DirectionLightAPI.createDirectionLight(state^);
          let (state, _) = DirectionLightAPI.createDirectionLight(state);
          let (state, _) = DirectionLightAPI.createDirectionLight(state);
          let (state, light3) =
            DirectionLightAPI.createDirectionLight(state);
          let lightExceedMaxCount = light3 + 10;

          let color = [|1., 0.5, 0.|];
          let state =
            DirectionLightAPI.setDirectionLightColor(
              lightExceedMaxCount,
              color,
              state,
            );

          DirectionLightAPI.getDirectionLightColor(lightExceedMaxCount, state)
          |> expect == color;
        })
      )
    );
  });