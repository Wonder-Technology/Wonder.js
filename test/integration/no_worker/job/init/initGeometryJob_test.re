open Wonder_jest;

open BoxGeometryAPI;

open BoxGeometryAPI;

let _ =
  describe(
    "test init geometry job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_boxGeometry"
        }
      ]
    }
  ]
        |},
          ~initJobs={|
[
        {
          "name": "init_boxGeometry"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~isDebug="true",
              ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "init all geometrys",
        () => {
          let _prepare = () => {
            let (state, geometry1) = createBoxGeometry(state^);
            let (state, geometry2) = createBoxGeometry(state);
            let state = state |> BoxGeometryTool.setDefaultConfigData(geometry1);
            let state = state |> BoxGeometryTool.setDefaultConfigData(geometry2);
            (state, geometry1, geometry2)
          };
          test(
            "compute and set vertices",
            () => {
              let (state, geometry1, geometry2) = _prepare();
              let state = state |> BoxGeometryTool.initGeometrys;
              (getBoxGeometryVertices(geometry1, state), getBoxGeometryVertices(geometry2, state))
              |>
              expect == (
                          BoxGeometryTool.getDefaultVertices(),
                          BoxGeometryTool.getDefaultVertices()
                        )
            }
          );
          test(
            "compute and set normals",
            () => {
              let (state, geometry1, geometry2) = _prepare();
              let state = state |> BoxGeometryTool.initGeometrys;
              (getBoxGeometryNormals(geometry1, state), getBoxGeometryNormals(geometry2, state))
              |>
              expect == (BoxGeometryTool.getDefaultNormals(), BoxGeometryTool.getDefaultNormals())
            }
          );
          test(
            "compute and set indices",
            () => {
              let (state, geometry1, geometry2) = _prepare();
              let state = state |> BoxGeometryTool.initGeometrys;
              (getBoxGeometryIndices(geometry1, state), getBoxGeometryIndices(geometry2, state))
              |>
              expect == (BoxGeometryTool.getDefaultIndices(), BoxGeometryTool.getDefaultIndices())
            }
          )
        }
      );
      describe(
        "contract check",
        () =>
          test(
            "shouldn't dispose any geometry before init",
            () => {
              let (state, geometry1) = BoxGeometryTool.createBoxGeometry(state^);
              let (state, geometry2) = BoxGeometryTool.createBoxGeometry(state);
              let state =
                VboBufferTool.passBufferShouldExistCheckWhenDisposeBoxGeometry(geometry1, state);
              expect(() => state |> BoxGeometryTool.dispose(geometry1) |> BoxGeometryTool.initGeometrys)
              |> toThrowMessage("not dispose any geometry before init")
            }
          )
      )
    }
  );