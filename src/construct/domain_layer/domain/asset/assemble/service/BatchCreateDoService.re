open WDDType;

let _batchCreateEntitiesWithResult = (createFunc, count) =>
  ListSt.range(0, count - 1)
  ->ListSt.traverseReduceResultM(
      (list, _) => {
        createFunc()->Result.mapSuccess(entity => [entity, ...list])
      },
      [],
    )
  ->Result.mapSuccess(ListSt.reverse);

let _batchCreateEntitiesWithoutResult = (createFunc, count) =>
  ListSt.range(0, count - 1)
  ->ListSt.reduce([], (list, _) => {[createFunc(), ...list]})
  ->ListSt.reverse;

let _batchCreateGameObject = ({gameObjects}) =>
  _batchCreateEntitiesWithResult(
    CreateGameObjectDoService.create,
    gameObjects.count,
  );

let _batchCreateTransform = ({transforms}) =>
  _batchCreateEntitiesWithResult(
    CreateTransformDoService.create,
    transforms->ListSt.length,
  );

let _batchCreateGeometry = ({geometries}) =>
  _batchCreateEntitiesWithResult(
    CreateGeometryDoService.create,
    geometries->ListSt.length,
  );

let _batchCreateBSDFMaterial = ({bsdfMaterials}) =>
  _batchCreateEntitiesWithResult(
    CreateBSDFMaterialDoService.create,
    bsdfMaterials->ListSt.length,
  );

let _batchCreateDirectionLight = ({directionLights}) =>
  _batchCreateEntitiesWithResult(
    CreateDirectionLightDoService.create,
    directionLights->ListSt.length,
  );

let _batchCreateBasicCameraView = ({basicCameraViews}) =>
  _batchCreateEntitiesWithoutResult(
    CreateBasicCameraViewDoService.create,
    basicCameraViews->ListSt.length,
  );

let _batchCreatePerspectiveCameraProjection =
    ({perspectiveCameraProjections}) =>
  _batchCreateEntitiesWithoutResult(
    CreatePerspectiveCameraProjectionDoService.create,
    perspectiveCameraProjections->ListSt.length,
  );

let batchCreate = wdd => {
  Tuple5.collectResult(
    _batchCreateGameObject(wdd),
    _batchCreateTransform(wdd),
    _batchCreateGeometry(wdd),
    _batchCreateBSDFMaterial(wdd),
    _batchCreateDirectionLight(wdd),
  )
  ->Result.mapSuccess(
      (gameObjects, transforms, geometries, bsdfMaterials, directionLights) => {
      (
        gameObjects,
        (
          transforms,
          geometries,
          bsdfMaterials,
          directionLights,
          _batchCreateBasicCameraView(wdd),
          _batchCreatePerspectiveCameraProjection(wdd),
        ),
      )
    });
};
