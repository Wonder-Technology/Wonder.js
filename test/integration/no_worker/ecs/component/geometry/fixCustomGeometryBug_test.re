open CustomGeometryAPI;

open GeometryType;

open CustomGeometryType;

open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "test customGeometry",
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
              ~buffer=TestTool.buildBufferJsObj(~customGeometryPointDataBufferCount=10, ()),
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
            let (state, gameObject1, geometry1) = CustomGeometryTool.createGameObject(state);
            let (state, gameObject2, geometry2) = CustomGeometryTool.createGameObject(state);
            let state =
              VboBufferTool.passBufferShouldExistCheckWhenDisposeCustomGeometry(geometry1, state);
            let state =
              VboBufferTool.passBufferShouldExistCheckWhenDisposeCustomGeometry(geometry2, state);
            let state =
              state
              |> setCustomGeometryVertices(geometry1, vertices1)
              |> setCustomGeometryVertices(geometry2, vertices2);
            let state =
              state
              |> setCustomGeometryNormals(geometry1, normals1)
              |> setCustomGeometryNormals(geometry2, normals2);
            let state =
              state
              |> setCustomGeometryIndices(geometry1, indices1)
              |> setCustomGeometryIndices(geometry2, indices2);
            let state =
              state
              |> GameObjectAPI.disposeGameObjectCustomGeometryComponent(gameObject1, geometry1);
            let (state, gameObject3, geometry3) = CustomGeometryTool.createGameObject(state);
            let state = state |> setCustomGeometryVertices(geometry3, vertices3);
            let state = state |> setCustomGeometryNormals(geometry3, normals3);
            let state = state |> setCustomGeometryIndices(geometry3, indices3);
            (
              getCustomGeometryVertices(geometry2, state),
              getCustomGeometryNormals(geometry2, state),
              getCustomGeometryIndices(geometry2, state),
              getCustomGeometryVertices(geometry3, state),
              getCustomGeometryNormals(geometry3, state),
              getCustomGeometryIndices(geometry3, state)
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