open Wonder_jest;

open PerspectiveCameraProjectionRunAPI;

let _ =
  describe("PerspectiveCameraProjection", () => {
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
      test("create a new cameraProjection", () => {
        let cameraProjection = create();

        expect(cameraProjection)
        == 0->PerspectiveCameraProjectionEntity.create;
      });

      describe("change po", () =>
        test("po->index + 1", () => {
          let _ = create();

          PerspectiveCameraProjectionTool.getMaxIndex()->expect == 1;
        })
      );
      test("add to dirty list", () => {
        let cameraProjection = create();

        PerspectiveCameraProjectionTool.getUniqueDirtyList()->expect
        == [cameraProjection];
      });
      test("set empty pMatrix", () => {
        let cameraProjection = create();

        getPMatrix(cameraProjection)->OptionSt.getExn->expect
        == Matrix4.createIdentityMatrix4()->ProjectionMatrixVO.create;
      });
    });

    describe("markDirty", () =>
      test("mark dirty", () => {
        let (gameObject1, _, (_, cameraProjection1)) =
          CameraTool.createCameraGameObject();

        PerspectiveCameraProjectionTool.clearDirtyList();
        markDirty(cameraProjection1);

        PerspectiveCameraProjectionTool.getUniqueDirtyList()->expect
        == [cameraProjection1];
      })
    );

    describe("markNotDirty", () =>
      test("mark not dirty", () => {
        let (gameObject1, _, (_, cameraProjection1)) =
          CameraTool.createCameraGameObject();
        let (gameObject2, _, (_, cameraProjection2)) =
          CameraTool.createCameraGameObject();

        setFar(cameraProjection1, 2.->FarVO.create);
        markNotDirty(cameraProjection1);

        PerspectiveCameraProjectionTool.getUniqueDirtyList()->expect
        == [cameraProjection2];
      })
    );

    describe("getGameObject", () =>
      test("get cameraProjection's gameObject", () => {
        let cameraProjection = create();
        let gameObject1 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;
        let gameObject2 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;

        GameObjectRunAPI.addPerspectiveCameraProjection(
          gameObject1,
          cameraProjection,
        )
        ->ResultTool.getExnSuccessValueIgnore;
        GameObjectRunAPI.addPerspectiveCameraProjection(
          gameObject2,
          cameraProjection,
        )
        ->ResultTool.getExnSuccessValueIgnore;

        getGameObject(cameraProjection)->OptionSt.getExn->expect
        == gameObject2;
      })
    );

    describe("getFovy", () =>
      test("test", () => {
        let cameraProjection = create();
        let fovy = 65.->FovyVO.create;

        setFovy(cameraProjection, fovy);

        getFovy(cameraProjection)->OptionSt.getExn->expect == fovy;
      })
    );

    describe("getAspect", () =>
      test("test", () => {
        let cameraProjection = create();
        let aspect = 1.->AspectVO.create;

        setAspect(cameraProjection, aspect);

        getAspect(cameraProjection)->OptionSt.getExn->expect == aspect;
      })
    );

    describe("getNear", () =>
      test("test", () => {
        let cameraProjection = create();
        let near = 0.1->NearVO.create;

        setNear(cameraProjection, near);

        getNear(cameraProjection)->OptionSt.getExn->expect == near;
      })
    );

    describe("getFar", () =>
      test("test", () => {
        let cameraProjection = create();
        let far = 1000.->FarVO.create;

        setFar(cameraProjection, far);

        getFar(cameraProjection)->OptionSt.getExn->expect == far;
      })
    );
  });
