open Wonder_jest;

open Js.Typed_array;

open GeometryRunAPI;

let _ =
  describe("Geometry", () => {
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
      test("create a new geometry", () => {
        let geometry = create()->ResultTool.getExnSuccessValue;

        expect(geometry) == 0->GeometryEntity.create;
      });

      describe("change po", () =>
        test("po->index + 1", () => {
          let _ = create()->ResultTool.getExnSuccessValue;

          GeometryTool.getMaxIndex()->expect == 1;
        })
      );
    });

    describe("test set points", () => {
      let _testSetVertexDataWithTypeArray =
          (getFunc, setFunc, createVertexDataVOFunc) =>
        test("directly set it", () => {
          let geometry = create()->ResultTool.getExnSuccessValue;
          setFunc(
            geometry,
            Float32Array.make([|1., 2., 3.|])->createVertexDataVOFunc,
          )
          ->ResultTool.getExnSuccessValueIgnore;

          let newData =
            Float32Array.make([|3., 5., 5.|])->createVertexDataVOFunc;
          setFunc(geometry, newData)->ResultTool.getExnSuccessValueIgnore;

          getFunc(geometry)->ResultTool.getExnSuccessValue->expect == newData;
        });

      describe("set vertices with type array", () =>
        _testSetVertexDataWithTypeArray(
          getVertices,
          setVertices,
          VerticesVO.create,
        )
      );

      describe("set texCoords with type array", () => {
        test("directly set it", () => {
          let geometry = create()->ResultTool.getExnSuccessValue;
          setTexCoords(
            geometry,
            Float32Array.make([|0., 1.|])->TexCoordsVO.create,
          )
          ->ResultTool.getExnSuccessValueIgnore;

          let newData = Float32Array.make([|0.5, 0.2|])->TexCoordsVO.create;
          setTexCoords(geometry, newData)
          ->ResultTool.getExnSuccessValueIgnore;

          getTexCoords(geometry)->ResultTool.getExnSuccessValue->expect
          == newData;
        });
        test("texCoords should in [0.0, 1.0]", () => {
          let geometry = create()->ResultTool.getExnSuccessValue;

          setTexCoords(
            geometry,
            Float32Array.make([|1., 2., (-0.1), 0.5|])->TexCoordsVO.create,
          )
          ->ExpectTool.toFail("expect texCoords in [0.0, 1.0]");
        });
      });

      describe("set normals with type array", () =>
        _testSetVertexDataWithTypeArray(
          getNormals,
          setNormals,
          NormalsVO.create,
        )
      );

      describe("set tangents with type array", () =>
        _testSetVertexDataWithTypeArray(
          getTangents,
          setTangents,
          TangentsVO.create,
        )
      );

      describe("set indices with type array", () =>
        test("directly set it", () => {
          let geometry = create()->ResultTool.getExnSuccessValue;
          let newData = Uint32Array.make([|3, 5, 5|])->IndicesVO.create;

          setIndices(geometry, newData)->ResultTool.getExnSuccessValueIgnore;

          getIndices(geometry)->ResultTool.getExnSuccessValue->expect
          == newData;
        })
      );
    });

    describe("hasVertices", () =>
      test("test", () => {
        let geometry = create()->ResultTool.getExnSuccessValue;

        setVertices(
          geometry,
          Float32Array.make([|1., 2., 3.|])->VerticesVO.create,
        )
        ->ResultTool.getExnSuccessValueIgnore;

        hasVertices(geometry)->ResultTool.getExnSuccessValue->expect == true;
      })
    );

    describe("test geometry has indices", () => {
      //   let _testIndices16 = (hasIndicesFunc, result) => {
      //     let (state, geometry) = GeometryAPI.createGeometry(state^);
      //     let state =
      //       state
      //       -> GeometryAPI.setGeometryIndices16(
      //            geometry,
      //            Uint16Array.make([|1, 2, 3|]),
      //          );

      //     hasIndicesFunc(geometry, state) -> expect == result;
      //   };

      let _testIndices32 = (hasIndicesFunc, result) => {
        let geometry = create()->ResultTool.getExnSuccessValue;

        setIndices(geometry, Uint32Array.make([|1, 2, 3|])->IndicesVO.create)
        ->ResultTool.getExnSuccessValueIgnore;

        hasIndicesFunc(geometry)->ResultTool.getExnSuccessValue->expect
        == result;
      };

      describe("hasGeometryIndices", () => {
        // test("if has indices16, return true", () =>
        //   _testIndices16(GeometryAPI.hasGeometryIndices, true)
        // );
        test("if has indices32, return true", () =>
          _testIndices32(hasIndices, true)
        )
      });
      //   describe("hasGeometryIndices16", () => {
      //     test("if has indices16, return true", () =>
      //       _testIndices16(GeometryAPI.hasGeometryIndices16, true)
      //     );
      //     test("if has indices32, return false", () =>
      //       _testIndices32(GeometryAPI.hasGeometryIndices16, false)
      //     );
      //   });
      //   describe("hasGeometryIndices32", () => {
      //     test("if has indices16, return false", () =>
      //       _testIndices16(GeometryAPI.hasGeometryIndices32, false)
      //     );
      //     test("if has indices32, return true", () =>
      //       _testIndices32(GeometryAPI.hasGeometryIndices32, true)
      //     );
      //   });
    });

    describe("getGameObjects", () =>
      test("get geometry's gameObjects", () => {
        let geometry = create()->ResultTool.getExnSuccessValue;
        let gameObject1 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;
        let gameObject2 =
          GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;

        GameObjectRunAPI.addGeometry(gameObject1, geometry)
        ->ResultTool.getExnSuccessValueIgnore;
        GameObjectRunAPI.addGeometry(gameObject2, geometry)
        ->ResultTool.getExnSuccessValueIgnore;

        getGameObjects(geometry)->OptionSt.getExn->expect
        == [gameObject2, gameObject1];
      })
    );

    describe("getIndicesCount", () => {
      test("get indices' count", () => {
        let geometry = create()->ResultTool.getExnSuccessValue;

        setIndices(geometry, Uint32Array.make([|1, 2, 3|])->IndicesVO.create)
        ->ResultTool.getExnSuccessValueIgnore;

        getIndicesCount(geometry)->ResultTool.getExnSuccessValue->expect == 3;
      })
    });

    describe("computeTangents", () => {
      test("sphere's computed tangents shouldn't has NaN", () => {
        let geometry =
          createSphereGeometry(2.0, 2)->ResultTool.getExnSuccessValue;

        computeTangents(
          getVertices(geometry)->ResultTool.getExnSuccessValue,
          getTexCoords(geometry)->ResultTool.getExnSuccessValue,
          getNormals(geometry)->ResultTool.getExnSuccessValue,
          getIndices(geometry)->ResultTool.getExnSuccessValue,
        )
        ->TangentsVO.value
        ->expect
        == Float32Array.make([|
             0.,
             0.,
             0.,
             1.,
             0.,
             (-6.123234262925839e-17),
             (-1.),
             0.,
             1.8369702788777518e-16,
             (-1.),
             (-8.164312350567786e-17),
             (-2.0410780876419464e-17),
             4.898587410340671e-16,
             (-2.999519808315976e-32),
             1.,
             1.,
             8.164312350567786e-17,
             (-2.6534016462834284e-16),
             1.,
             4.898587410340671e-16,
             (-6.123234262925839e-17),
             (-1.),
             4.898587410340671e-16,
             1.8369702788777518e-16,
             (-1.),
             (-4.898587410340671e-16),
             1.4802974102831747e-16,
           |]);
      })
    });
  });
