open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "test init custom geometry job",
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
          "name": "init_custom_geometry"
        }
      ]
    }
  ]
        |},
          ~initJobs={|
[
        {
          "name": "init_custom_geometry"
        }
]
        |},
          ()
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.initWithJobConfig(~sandbox, ~noWorkerJobRecord=_buildNoWorkerJobConfig(), ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "if not has normals",
        () =>
          describe(
            "compute vertex normals",
            () =>
              test(
                "compute average vertex normal",
                () => {
                  let (state, gameObject, geometry) =
                    InitCustomGeometryJobTool.prepareGameObject(
                      sandbox,
                      (
                        Float32Array.make([|1., (-1.), 0., 0., 1., 0., 0., 0., 1., 2., 3., (-2.)|]),
                        Float32Array.make([||]),
                        Float32Array.make([||]),
                        Uint16Array.make([|0, 2, 1, 2, 3, 1|])
                      ),
                      state^
                    );
                  let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                  let state = state |> InitCustomGeometryJobTool.exec;
                  CustomGeometryAPI.getCustomGeometryNormals(geometry, state)
                  |>
                  expect == Float32Array.make([|
                              (-0.8164966106414795),
                              (-0.40824830532073975),
                              (-0.40824830532073975),
                              (-0.8164966106414795),
                              0.40824830532073975,
                              0.40824830532073975,
                              (-0.8164966106414795),
                              0.40824830532073975,
                              0.40824830532073975,
                              0.,
                              0.7071067690849304,
                              0.7071067690849304
                            |])
                }
              )
          )
      );
      describe(
        "else",
        () =>
          test(
            "test normals",
            () => {
              let normals =
                Float32Array.make([|10., 20., 0., 0., 1., 0., 0., 0., 1., 2., 3.5, (-2.)|]);
              let (state, gameObject, geometry) =
                InitCustomGeometryJobTool.prepareGameObject(
                  sandbox,
                  (
                    Float32Array.make([||]),
                    normals,
                    Float32Array.make([||]),
                    Uint16Array.make([||])
                  ),
                  state^
                );
              let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
              let state = state |> InitCustomGeometryJobTool.exec;
              CustomGeometryAPI.getCustomGeometryNormals(geometry, state) |> expect == normals
            }
          )
      )
    }
  );