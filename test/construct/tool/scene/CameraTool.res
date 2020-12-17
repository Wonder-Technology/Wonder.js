open Wonderjs

let buildRepoWithOneBasicCameraViewAndOnePerspectiveCameraProjection = sandbox => {
  let gameObject = 10->Obj.magic

  let cameraView = 11->Obj.magic
  let cameraProjection = 12->Obj.magic

  let viewWorldToCameraMatrix = Js.Typed_array.Float32Array.make([
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
  ])

  let near = 0.1
  let far = 1000.
  let fovy = 60.
  let aspect = 1.0
  let pMatrix =
    Matrix4.createIdentityMatrix4()
    ->Matrix4.invert(
      Js.Typed_array.Float32Array.make([
        0.5773502588272095,
        -0.,
        -0.,
        -0.,
        -0.,
        0.5773502588272095,
        0.,
        -0.,
        -0.,
        -0.,
        -0.,
        -4.999500274658203,
        -0.,
        -0.,
        -1.,
        5.000500202178955,
      ]),
    )
    ->ResultTool.getExnSuccessValue

  (
    (
      SceneGraphRepoDependencyTool.buildGameObjectRepo(
        ~sandbox,
        ~getPerspectiveCameraProjection=gameObject => cameraProjection,
        (),
      ),
      SceneGraphRepoDependencyTool.buildBasicCameraViewRepo(
        ~sandbox,
        ~getGameObject=cameraView => gameObject,
        ~getViewWorldToCameraMatrix=cameraView => viewWorldToCameraMatrix,
        ~getActiveBasicCameraView=sceneGameObject => cameraView,
        (),
      ),
      SceneGraphRepoDependencyTool.buildPerspectiveCameraProjectionRepo(
        ~sandbox,
        ~getPMatrix=cameraProjection => pMatrix,
        ~getFovy=cameraProjection => fovy,
        ~getNear=cameraProjection => near,
        ~getFar=cameraProjection => far,
        ~getAspect=cameraProjection => aspect,
        (),
      ),
    ),
    (gameObject, (cameraView, cameraProjection)),
  )
}
