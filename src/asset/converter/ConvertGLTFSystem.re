open Js.Promise;

let _convertToScene = ({scenes, scene}: GLTFType.gltf) : WDType.scene => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|only has one scene|j},
                ~actual={j|not|j},
              ),
              () =>
              scenes |> Js.Array.length == 1
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  let scene =
    switch (scene) {
    | None => 0
    | Some(scene) => scene
    };
  {
    gameObjects:
      Array.unsafe_get(scenes, scene).nodes |> OptionService.unsafeGet,
  };
};

let _convertGLTFToWD = (gltf: GLTFType.gltf) : WDType.wd => {
  let ({asset, scenes, scene, nodes}: GLTFType.gltf) as gltf =
    gltf
    |> ConvertMultiPrimitivesSystem.convertMultiPrimitivesToNodes
    |> ConvertDefaultMaterialSystem.convert;

  {
    asset: {
      version: asset.version,
      generator: GLTFUtils.getGenerator(),
    },
    scene: _convertToScene(gltf),
    gameObjects: ConvertGameObjectsSystem.convert(gltf),
    indices: ConvertIndicesSystem.convertToIndices(gltf),
    transforms: ConvertTransformsSystem.convertToTransforms(gltf),
    basicCameraViews: ConvertCamerasSystem.convertToBasicCameraViews(gltf),
    perspectiveCameraProjections:
      ConvertCamerasSystem.convertToPerspectiveCameraProjections(gltf),
    lightMaterials: ConvertMaterialsSystem.convertToLightMaterials(gltf),
    customGeometrys: ConvertGeometrysSystem.convertToGeometrys(gltf),
    basicSourceTextures:
      ConvertTexturesSystem.convertToBasicSourceTextures(gltf),
    samplers: ConvertTexturesSystem.convertToSamplers(gltf),
    images: ConvertImagesSystem.convertToImages(gltf),
    accessors: ConvertBuffersSystem.convertToAccessors(gltf),
    bufferViews: ConvertBuffersSystem.convertToBufferViews(gltf),
    buffers: ConvertBuffersSystem.convertToBuffers(gltf),
  };
};

let convert = (gltfFileContent: string) => {
  let gltf =
    ConvertGLTFJsonToRecordSystem.convert(
      gltfFileContent |> Js.Json.parseExn,
    );
  /* ConvertImagesSystem.buildImageArray(gltf)
     |> then_(imageArr =>
          (
            _convertGLTFToWD(gltf),
            imageArr,
            ConvertBuffersSystem.buildBufferArray(gltf),
          )
          |> resolve
        )
     |> Most.fromPromise; */
  _convertGLTFToWD(gltf);
};