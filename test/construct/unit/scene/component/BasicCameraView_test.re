open Wonder_jest;

open BasicCameraViewRunAPI;

let _ =
  describe("BasicCameraView", () => {
    open Expect;
    open! Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("create", () => {
      test("create a new cameraView", () => {
        let cameraView = create();

        expect(cameraView) == 0->BasicCameraViewEntity.create;
      });

      describe("change po", () =>
        test("po->index + 1", () => {
          let _ = create();

          BasicCameraViewTool.getMaxIndex()->expect == 1;
        })
      );
    });

    describe("getGameObject", () =>
      test("get cameraView's gameObject", () => {
        let cameraView = create();
        let gameObject1 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;
        let gameObject2 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;

        GameObjectRunAPI.addBasicCameraView(gameObject1, cameraView)
        ->ResultTool.getExnSuccessValueIgnore;
        GameObjectRunAPI.addBasicCameraView(gameObject2, cameraView)
        ->ResultTool.getExnSuccessValueIgnore;

        getGameObject(cameraView)->OptionSt.getExn->expect == gameObject2;
      })
    );

    describe("isActive", () =>
      test("test", () => {
        let cameraView = create();

        setActive(cameraView, false);

        isActive(cameraView)->expect == false;
      })
    );

    describe("active", () =>
      describe("ensure only has one active basicCameraView", () =>
        test("active this one, unactive other ones", () => {
          let cameraView1 = create();
          let cameraView2 = create();
          let cameraView3 = create();

          setActive(cameraView1, true);
          setActive(cameraView2, true);
          setActive(cameraView3, false);
          active(cameraView3);

          (
            isActive(cameraView1),
            isActive(cameraView2),
            isActive(cameraView3),
          )
          ->expect
          == (false, false, true);
        })
      )
    );

    describe("unactive", () =>
      test("unactive this one(not affect other ones)", () => {
        let cameraView1 = create();
        let cameraView2 = create();

        setActive(cameraView1, true);
        setActive(cameraView2, true);
        unactive(cameraView2);

        (isActive(cameraView1), isActive(cameraView2))->expect
        == (true, false);
      })
    );

    describe("getActiveBasicCameraView", () => {
      test("test has none", () => {
        let cameraView1 = create();
        let cameraView2 = create();

        setActive(cameraView1, false);
        setActive(cameraView2, false);

        getActiveBasicCameraView()->ResultTool.getExnSuccessValue->expect
        == None;
      });
      test("test has one", () => {
        let cameraView1 = create();
        let cameraView2 = create();

        setActive(cameraView1, true);
        setActive(cameraView2, false);

        getActiveBasicCameraView()->ResultTool.getExnSuccessValue->expect
        == Some(cameraView1);
      });
      test("if has >= 2, contract error", () => {
        let cameraView1 = create();
        let cameraView2 = create();

        setActive(cameraView1, true);
        setActive(cameraView2, true);

        getActiveBasicCameraView()
        ->ExpectTool.toFail("expect only has one active cameraView at most");
      });
    });

    describe("getViewWorldToCameraMatrix", () => {
      test("get vMatrix", () => {
        let (_, transform, (cameraView, cameraProjection)) =
          CameraTool.createCameraGameObject();

        let pos = (1., 2., 3.)->PositionTool.create;
        TransformRunAPI.setLocalPosition(transform, pos)
        ->ResultTool.getExnSuccessValue;
        let rotation = (1., 2., 3., 2.5)->RotationTool.create;
        TransformRunAPI.setLocalRotation(transform, rotation)
        ->ResultTool.getExnSuccessValue;

        TransformTool.update(transform);

        getViewWorldToCameraMatrix(cameraView)
        ->ResultTool.getExnSuccessValue
        ->OptionSt.getExn
        ->WorldToCameraMatrixVO.value
        ->expect
        == Js.Typed_array.Float32Array.make([|
             0.048192769289016724,
             0.1325301229953766,
             0.22891566157341003,
             0.,
             0.16033364832401276,
             0.26784059405326843,
             0.43466171622276306,
             0.,
             0.21037998795509338,
             0.4439295530319214,
             0.6339203119277954,
             0.,
             (-1.),
             (-2.),
             (-3.),
             1.,
           |]);
      })
    });
  });
