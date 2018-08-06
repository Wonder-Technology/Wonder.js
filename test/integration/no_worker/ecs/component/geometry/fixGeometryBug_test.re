open GeometryAPI;

open GeometryType;

open GeometryType;

open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "test geometry",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.init(
              ~sandbox,
              ~buffer=SettingTool.buildBufferConfigStr(~geometryPointCount=10, ()),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "fix bug",
        () => {
          let _test = (state) => {
            let vertices1 = Float32Array.make([|10.|]);
            let vertices2 = Float32Array.make([|3., 2.|]);
            let vertices3 = Float32Array.make([|5., 3., 2.|]);
            let normals1 = Float32Array.make([|1.|]);
            let normals2 = Float32Array.make([|2., 2.|]);
            let normals3 = Float32Array.make([|5., 1., 2.|]);
            let indices1 = Uint16Array.make([|2|]);
            let indices2 = Uint16Array.make([|2, 2|]);
            let indices3 = Uint16Array.make([|3, 3, 2|]);
            let (state, gameObject1, geometry1) = GeometryTool.createGameObject(state);
            let (state, gameObject2, geometry2) = GeometryTool.createGameObject(state);
            let state = VboBufferTool.addVboBufferToGeometryBufferMap(geometry1, state);
            let state = VboBufferTool.addVboBufferToGeometryBufferMap(geometry2, state);
            let state =
              state
              |> setGeometryVertices(geometry1, vertices1)
              |> setGeometryVertices(geometry2, vertices2);
            let state =
              state
              |> setGeometryNormals(geometry1, normals1)
              |> setGeometryNormals(geometry2, normals2);
            let state =
              state
              |> setGeometryIndices(geometry1, indices1)
              |> setGeometryIndices(geometry2, indices2);
            let state =
              state
              |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
                   gameObject1,
                   geometry1
                 );
            let (state, gameObject3, geometry3) = GeometryTool.createGameObject(state);
            let state = state |> setGeometryVertices(geometry3, vertices3);
            let state = state |> setGeometryNormals(geometry3, normals3);
            let state = state |> setGeometryIndices(geometry3, indices3);
            (
              getGeometryVertices(geometry2, state),
              getGeometryNormals(geometry2, state),
              getGeometryIndices(geometry2, state),
              getGeometryVertices(geometry3, state),
              getGeometryNormals(geometry3, state),
              getGeometryIndices(geometry3, state)
            )
            |> expect == (vertices2, normals2, indices2, vertices3, normals3, indices3)
          };
          test(
            "new one after dispose(not cause reallocate) should has its own geometry point data",
            () => {
              let state = SettingTool.setMemory(state^, ~maxDisposeCount=2, ());
              _test(state)
            }
          );
          test(
            "new one after dispose(cause reallocate) should has its own geometry point data",
            () => {
              let state = SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
              _test(state)
            }
          )
        }
      )
    }
  );