open Wonder_jest;

open GameObjectRunAPI;

let _ =
  describe("GameObject", () => {
    open Expect;
    open! Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("createGameObject", () => {
      test("create a new gameObject", () => {
        let gameObject = create()->ResultTool.getExnSuccessValue;

        expect(gameObject) == 0->GameObjectEntity.create;
      });
      test("add new transform component", () => {
        let gameObject = create()->ResultTool.getExnSuccessValue;

        hasTransform(gameObject) |> expect == true;
      });

      describe("change po", () =>
        test("po->uid + 1", () => {
          let _ = create()->ResultTool.getExnSuccessValue;

          GameObjectTool.getMaxUID()->expect == 1;
        })
      );
    });

    describe("test operate component", () => {
      describe("test transform component", () => {
        describe("addTransform", () => {
          test("if this type of component is already exist, fail", () => {
            let gameObject = create()->ResultTool.getExnSuccessValue;

            let transform =
              TransformRunAPI.create()->ResultTool.getExnSuccessValue;

            addTransform(gameObject, transform)
            ->ExpectTool.toFail(
                "expect this type of the component shouldn't be added before, but actual not",
              );
          });
          test("can get component's gameObject", () => {
            let gameObject = create()->ResultTool.getExnSuccessValue;

            TransformRunAPI.getGameObject(
              getTransform(gameObject)->OptionSt.getExn,
            )
            ->expect
            == gameObject->Some;
          });
        });

        describe("getTransform", () =>
          test("get transform component", () => {
            let gameObject = create()->ResultTool.getExnSuccessValue;

            getTransform(gameObject)
            ->OptionSt.getExn
            ->TransformTool.isTransform;
          })
        );

        describe("hasTransform", () =>
          test("has transform component", () => {
            let gameObject = create()->ResultTool.getExnSuccessValue;

            hasTransform(gameObject)->expect == true;
          })
        );
      });

      describe("test pbrMaterial component", () => {
        let _createAndAddComponent = () => {
          let gameObject = create()->ResultTool.getExnSuccessValue;

          let pbrMaterial =
            PBRMaterialRunAPI.create()->ResultTool.getExnSuccessValue;

          addPBRMaterial(gameObject, pbrMaterial)
          ->ResultTool.getExnSuccessValue;
        };

        describe("addPBRMaterial", () => {
          test("if this type of component is already exist, fail", () => {
            let gameObject = _createAndAddComponent();

            let pbrMaterial =
              PBRMaterialRunAPI.create()->ResultTool.getExnSuccessValue;

            addPBRMaterial(gameObject, pbrMaterial)
            ->ExpectTool.toFail(
                "expect this type of the component shouldn't be added before, but actual not",
              );
          })
        });

        describe("getPBRMaterial", () =>
          test("get pbrMaterial component", () => {
            let gameObject = _createAndAddComponent();

            getPBRMaterial(gameObject)
            ->OptionSt.getExn
            ->PBRMaterialTool.isPBRMaterial;
          })
        );

        describe("hasPBRMaterial", () =>
          test("has pbrMaterial component", () => {
            let gameObject = _createAndAddComponent();

            hasPBRMaterial(gameObject)->expect == true;
          })
        );
      });

      describe("test geometry component", () => {
        let _createAndAddComponent = () => {
          let gameObject = create()->ResultTool.getExnSuccessValue;

          let geometry =
            GeometryRunAPI.create()->ResultTool.getExnSuccessValue;

          addGeometry(gameObject, geometry)->ResultTool.getExnSuccessValue;
        };

        describe("addGeometry", () => {
          test("if this type of component is already exist, fail", () => {
            let gameObject = _createAndAddComponent();

            let geometry =
              GeometryRunAPI.create()->ResultTool.getExnSuccessValue;

            addGeometry(gameObject, geometry)
            ->ExpectTool.toFail(
                "expect this type of the component shouldn't be added before, but actual not",
              );
          })
        });

        describe("getGeometry", () =>
          test("get geometry component", () => {
            let gameObject = _createAndAddComponent();

            getGeometry(gameObject)->OptionSt.getExn->GeometryTool.isGeometry;
          })
        );

        describe("hasGeometry", () =>
          test("has geometry component", () => {
            let gameObject = _createAndAddComponent();

            hasGeometry(gameObject)->expect == true;
          })
        );
      });

      describe("test directionLight component", () => {
        let _createAndAddComponent = () => {
          let gameObject = create()->ResultTool.getExnSuccessValue;

          let directionLight =
            DirectionLightRunAPI.create()->ResultTool.getExnSuccessValue;

          addDirectionLight(gameObject, directionLight)
          ->ResultTool.getExnSuccessValue;
        };

        describe("addDirectionLight", () => {
          test("if this type of component is already exist, fail", () => {
            let gameObject = _createAndAddComponent();

            let directionLight =
              DirectionLightRunAPI.create()->ResultTool.getExnSuccessValue;

            addDirectionLight(gameObject, directionLight)
            ->ExpectTool.toFail(
                "expect this type of the component shouldn't be added before, but actual not",
              );
          })
        });

        describe("getDirectionLight", () =>
          test("get directionLight component", () => {
            let gameObject = _createAndAddComponent();

            getDirectionLight(gameObject)
            ->OptionSt.getExn
            ->DirectionLightTool.isDirectionLight;
          })
        );

        describe("hasDirectionLight", () =>
          test("has directionLight component", () => {
            let gameObject = _createAndAddComponent();

            hasDirectionLight(gameObject)->expect == true;
          })
        );
      });

      describe("test basicCameraView component", () => {
        let _createAndAddComponent = () => {
          let gameObject = create()->ResultTool.getExnSuccessValue;

          let basicCameraView = BasicCameraViewRunAPI.create();

          addBasicCameraView(gameObject, basicCameraView)
          ->ResultTool.getExnSuccessValue;
        };

        describe("addBasicCameraView", () => {
          test("if this type of component is already exist, fail", () => {
            let gameObject = _createAndAddComponent();

            let basicCameraView = BasicCameraViewRunAPI.create();

            addBasicCameraView(gameObject, basicCameraView)
            ->ExpectTool.toFail(
                "expect this type of the component shouldn't be added before, but actual not",
              );
          })
        });

        describe("getBasicCameraView", () =>
          test("get basicCameraView component", () => {
            let gameObject = _createAndAddComponent();

            getBasicCameraView(gameObject)
            ->OptionSt.getExn
            ->BasicCameraViewTool.isBasicCameraView;
          })
        );

        describe("hasBasicCameraView", () =>
          test("has basicCameraView component", () => {
            let gameObject = _createAndAddComponent();

            hasBasicCameraView(gameObject)->expect == true;
          })
        );
      });

      describe("test PerspectiveCameraProjection component", () => {
        let _createAndAddComponent = () => {
          let gameObject = create()->ResultTool.getExnSuccessValue;

          let perspectiveCameraProjection =
            PerspectiveCameraProjectionRunAPI.create();

          addPerspectiveCameraProjection(
            gameObject,
            perspectiveCameraProjection,
          )
          ->ResultTool.getExnSuccessValue;
        };

        describe("addPerspectiveCameraProjection", () => {
          test("if this type of component is already exist, fail", () => {
            let gameObject = _createAndAddComponent();

            let perspectiveCameraProjection =
              PerspectiveCameraProjectionRunAPI.create();

            addPerspectiveCameraProjection(
              gameObject,
              perspectiveCameraProjection,
            )
            ->ExpectTool.toFail(
                "expect this type of the component shouldn't be added before, but actual not",
              );
          })
        });

        describe("getPerspectiveCameraProjection", () =>
          test("get perspectiveCameraProjection component", () => {
            let gameObject = _createAndAddComponent();

            getPerspectiveCameraProjection(gameObject)
            ->OptionSt.getExn
            ->PerspectiveCameraProjectionTool.isPerspectiveCameraProjection;
          })
        );

        describe("hasPerspectiveCameraProjection", () =>
          test("has perspectiveCameraProjection component", () => {
            let gameObject = _createAndAddComponent();

            hasPerspectiveCameraProjection(gameObject)->expect == true;
          })
        );
      });
    });
  });
