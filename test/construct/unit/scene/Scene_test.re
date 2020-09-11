open Wonder_jest;

let _ =
  describe("Scene", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("setSceneGameObject", () =>
      test("test", () => {
        let gameObject1 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;
        let gameObject2 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;

        SceneRunAPI.setSceneGameObject(gameObject2);

        SceneRunAPI.getSceneGameObject()->expect == gameObject2->Some;
      })
    );
  });