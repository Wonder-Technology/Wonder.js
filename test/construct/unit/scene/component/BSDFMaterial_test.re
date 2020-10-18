open Wonder_jest;

open BSDFMaterialRunAPI;

let _ =
  describe("BSDFMaterial", () => {
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
      test("create a new material", () => {
        let material = create()->ResultTool.getExnSuccessValue;

        expect(material) == 0->BSDFMaterialEntity.create;
      });

      describe("change po", () =>
        test("po->index + 1", () => {
          let _ = create()->ResultTool.getExnSuccessValue;

          BSDFMaterialTool.getMaxIndex()->expect == 1;
        })
      );
    });

    describe("getGameObjects", () =>
      test("get material's gameObjects", () => {
        let material = create()->ResultTool.getExnSuccessValue;
        let gameObject1 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;
        let gameObject2 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;

        GameObjectRunAPI.addBSDFMaterial(gameObject1, material)
        ->ResultTool.getExnSuccessValueIgnore;
        GameObjectRunAPI.addBSDFMaterial(gameObject2, material)
        ->ResultTool.getExnSuccessValueIgnore;

        getGameObjects(material)->OptionSt.getExn->expect
        == [gameObject2, gameObject1];
      })
    );

    describe("operate data", () => {
      test(
        "get the data from array buffer may not equal to the value which is setted",
        () => {
        let material = create()->ResultTool.getExnSuccessValue;
        let color = (0.2, 0.3, 0.5)->BSDFMaterialTool.createDiffuseColor;

        setDiffuseColor(material, color)->ResultTool.getExnSuccessValueIgnore;

        getDiffuseColor(material)->expect
        == (0.20000000298023224, 0.30000001192092896, 0.5)
           ->BSDFMaterialTool.createDiffuseColor;
      });

      describe("getDiffuseColor", () =>
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getDiffuseColor(material)->expect
          == (1., 1., 1.)->BSDFMaterialTool.createDiffuseColor;
        })
      );

      describe("setDiffuseColor", () =>
        test("set color", () => {
          let material = create()->ResultTool.getExnSuccessValue;
          let color = (0.2, 0.3, 0.5)->BSDFMaterialTool.createDiffuseColor;

          setDiffuseColor(material, color)
          ->ResultTool.getExnSuccessValueIgnore;

          getDiffuseColor(material)
          ->BSDFMaterialTool.truncateDiffuseColor
          ->expect
          == color;
        })
      );

      describe("getSpecular", () =>
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getSpecular(material)->expect == 1.0->SpecularVO.create;
        })
      );

      describe("setSpecular", () =>
        test("set specular", () => {
          let material = create()->ResultTool.getExnSuccessValue;
          let specular = 0.5->SpecularVO.create;

          setSpecular(material, specular)
          ->ResultTool.getExnSuccessValueIgnore;

          getSpecular(material)->expect == specular;
        })
      );

      describe("getSpecularColor", () =>
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getSpecularColor(material)->expect
          == (1., 1., 1.)->BSDFMaterialTool.createSpecularColor;
        })
      );

      describe("setSpecularColor", () =>
        test("set color", () => {
          let material = create()->ResultTool.getExnSuccessValue;
          let color = (0.2, 0.3, 0.5)->BSDFMaterialTool.createSpecularColor;

          setSpecularColor(material, color)
          ->ResultTool.getExnSuccessValueIgnore;

          getSpecularColor(material)
          ->BSDFMaterialTool.truncateSpecularColor
          ->expect
          == color;
        })
      );

      describe("getRoughness", () =>
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getRoughness(material)->expect == 1.0->RoughnessVO.create;
        })
      );

      describe("setRoughness", () =>
        test("set roughness", () => {
          let material = create()->ResultTool.getExnSuccessValue;
          let roughness = 0.5->RoughnessVO.create;

          setRoughness(material, roughness)
          ->ResultTool.getExnSuccessValueIgnore;

          getRoughness(material)->expect == roughness;
        })
      );

      describe("getMetalness", () =>
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getMetalness(material)->expect == 1.0->MetalnessVO.create;
        })
      );

      describe("setMetalness", () =>
        test("set metalness", () => {
          let material = create()->ResultTool.getExnSuccessValue;
          let metalness = 0.5->MetalnessVO.create;

          setMetalness(material, metalness)
          ->ResultTool.getExnSuccessValueIgnore;

          getMetalness(material)->expect == metalness;
        })
      );

      describe("getTransmission", () =>
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getTransmission(material)->expect == 0.0->TransmissionVO.create;
        })
      );

      describe("setTransmission", () =>
        test("set transmission", () => {
          let material = create()->ResultTool.getExnSuccessValue;
          let transmission = 0.5->TransmissionVO.create;

          setTransmission(material, transmission)
          ->ResultTool.getExnSuccessValueIgnore;

          getTransmission(material)->expect == transmission;
        })
      );

      describe("getIOR", () =>
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getIOR(material)->expect == 1.5->IORVO.create;
        })
      );

      describe("setIOR", () =>
        test("set ior", () => {
          let material = create()->ResultTool.getExnSuccessValue;
          let ior = 0.5->IORVO.create;

          setIOR(material, ior)->ResultTool.getExnSuccessValueIgnore;

          getIOR(material)->expect == ior;
        })
      );

      describe("getDiffuseMapImageId", () => {
        test("test default", () => {
          let material = create()->ResultTool.getExnSuccessValue;

          getDiffuseMapImageId(material)->expect == None;
        })
      });

      describe("set map's image id", () => {
        let _buildImageId = () => "image1"->ImageIdVO.create;

        describe("setDiffuseMapImageId", () => {
          test("set map's image id", () => {
            let material = create()->ResultTool.getExnSuccessValue;
            let id = _buildImageId();

            setDiffuseMapImageId(material, id);

            getDiffuseMapImageId(material)->OptionSt.getExn->expect == id;
          })
        });

        describe("setChannelRoughnessMetallicMapImageId", () => {
          test("set map's image id", () => {
            let material = create()->ResultTool.getExnSuccessValue;
            let id = _buildImageId();

            setChannelRoughnessMetallicMapImageId(material, id);

            getChannelRoughnessMetallicMapImageId(material)
            ->OptionSt.getExn
            ->expect
            == id;
          })
        });

        describe("setEmissionMapImageId", () => {
          test("set map's image id", () => {
            let material = create()->ResultTool.getExnSuccessValue;
            let id = _buildImageId();

            setEmissionMapImageId(material, id);

            getEmissionMapImageId(material)->OptionSt.getExn->expect == id;
          })
        });

        describe("setNormalMapImageId", () => {
          test("set map's image id", () => {
            let material = create()->ResultTool.getExnSuccessValue;
            let id = _buildImageId();

            setNormalMapImageId(material, id);

            getNormalMapImageId(material)->OptionSt.getExn->expect == id;
          })
        });

        describe("setTransmissionMapImageId", () => {
          test("set map's image id", () => {
            let material = create()->ResultTool.getExnSuccessValue;
            let id = _buildImageId();

            setTransmissionMapImageId(material, id);

            getTransmissionMapImageId(material)->OptionSt.getExn->expect == id;
          })
        });

        describe("setSpecularMapImageId", () => {
          test("set map's image id", () => {
            let material = create()->ResultTool.getExnSuccessValue;
            let id = _buildImageId();

            setSpecularMapImageId(material, id);

            getSpecularMapImageId(material)->OptionSt.getExn->expect == id;
          })
        });
      });
    });
  });
