open Js.Promise;

let _convertToScene =
    (
      ambientLightArr: array(WDType.ambientLight),
      {scenes, scene}: GLTFType.gltf,
    )
    : WDType.scene => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|only has one scene|j},
          ~actual={j|not|j},
        ),
        () =>
        scenes |> Js.Array.length == 1
      );

      test(
        Log.buildAssertMessage(
          ~expect={j|has one ambientLight at most|j},
          ~actual={j|not|j},
        ),
        () =>
        ambientLightArr |> Js.Array.length <= 1
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  let scene =
    switch (scene) {
    | None => 0
    | Some(scene) => scene
    };
  {
    gameObjects:
      ConvertCommon.getScene(scenes, scene).nodes |> OptionService.unsafeGet,
    ambientLight:
      ambientLightArr |> Js.Array.length == 1 ?
        Some({color: ambientLightArr[0].color}) : None,
  };
};

let _convertGLTFToWD = (gltf: GLTFType.gltf) : WDType.wd => {
  let ({asset, scenes, scene, nodes, extensions}: GLTFType.gltf) as gltf =
    gltf
    |> ConvertMultiPrimitivesSystem.convertMultiPrimitivesToNodes
    |> ConvertDefaultMaterialSystem.convert;

  let (ambientLightArr, directionLightArr, pointLightArr) =
    ConvertLightsSystem.convertToLights(gltf);

  {
    asset: {
      version: asset.version,
      generator: GLTFUtils.getGenerator(),
    },
    scene: _convertToScene(ambientLightArr, gltf),
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
    /* arrayBufferViewSourceTextures: None, */
    samplers: ConvertTexturesSystem.convertToSamplers(gltf),
    uriImages: ConvertImagesSystem.convertToUriImages(gltf) |. Some,
    blobImages: None,
    accessors: ConvertBuffersSystem.convertToAccessors(gltf),
    bufferViews: ConvertBuffersSystem.convertToBufferViews(gltf),
    buffers: ConvertBuffersSystem.convertToBuffers(None, gltf),
    directionLights: directionLightArr,
    pointLights: pointLightArr,
  };
};

let _convertGLBToWD = (gltf: GLTFType.gltf, binBuffer) : WDType.wd => {
  let ({asset, scenes, scene, nodes, extensions}: GLTFType.gltf) as gltf =
    gltf
    |> ConvertMultiPrimitivesSystem.convertMultiPrimitivesToNodes
    |> ConvertDefaultMaterialSystem.convert;

  let (ambientLightArr, directionLightArr, pointLightArr) =
    ConvertLightsSystem.convertToLights(gltf);

  {
    asset: {
      version: asset.version,
      generator: GLTFUtils.getGenerator(),
    },
    scene: _convertToScene(ambientLightArr, gltf),
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
    /* arrayBufferViewSourceTextures:
       ConvertTexturesSystem.convertToArrayBufferViewSourceTextures(gltf)
       |. Some, */
    samplers: ConvertTexturesSystem.convertToSamplers(gltf),
    uriImages: None,
    blobImages:
      ConvertImagesSystem.convertToBlobImages(binBuffer, gltf) |. Some,
    accessors: ConvertBuffersSystem.convertToAccessors(gltf),
    bufferViews: ConvertBuffersSystem.convertToBufferViews(gltf),
    buffers: ConvertBuffersSystem.convertToBuffers(Some(binBuffer), gltf),
    directionLights: directionLightArr,
    pointLights: pointLightArr,
  };
};

let convert = (gltfFileContent: string) =>
  _convertGLTFToWD(
    ConvertGLTFJsonToRecordSystem.convert(
      gltfFileContent |> Js.Json.parseExn,
    ),
  );

let convertGlb = (glb: Js.Typed_array.ArrayBuffer.t) => {
  let (gltfFileContent, binBuffer) = ConvertGlbToGLTFSystem.convert(glb);
  _convertGLBToWD(
    ConvertGLTFJsonToRecordSystem.convert(
      gltfFileContent |> Js.Json.parseExn,
    ),
    binBuffer,
  );
};