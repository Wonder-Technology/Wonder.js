open Js.Promise;

open Js.Typed_array;

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

/* let _convertGLTFToWDB = (gltf: GLTFType.gltf) : WDType.wd => {
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
   }; */

let _getBinBufferByteLength = binBuffer =>
  binBuffer
  |> ArrayBuffer.byteLength
  |> WonderLog.Contract.ensureCheck(
       byteLength =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|binBuffer aligned with multiple of 4|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 byteLength mod 4 == 0
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let _copyUint8ArrayToArrayBuffer = (byteOffset, uint8Array, dataView) => {
  let byteOffset = ref(byteOffset);

  for (i in 0 to (uint8Array |> Uint8Array.length) - 1) {
    byteOffset :=
      DataViewCommon.writeUint8_1(.
        TypeArrayService.getUint8_1(i, uint8Array),
        byteOffset^,
        dataView,
      );
  };

  (byteOffset^, uint8Array, dataView);
};

let _buildWDBJsonUint8Array = gltf => {
  let ({asset, scenes, scene, nodes, extensions}: GLTFType.gltf) as gltf =
    gltf
    |> ConvertMultiPrimitivesSystem.convertMultiPrimitivesToNodes
    |> ConvertDefaultMaterialSystem.convert;

  let (ambientLightArr, directionLightArr, pointLightArr) =
    ConvertLightsSystem.convertToLights(gltf);

  let encoder = TextEncoder.newTextEncoder();

  encoder
  |> TextEncoder.encodeUint8Array(
       (
         {
           asset: {
             version: asset.version,
             generator: GLTFUtils.getGenerator(),
           },
           scene: _convertToScene(ambientLightArr, gltf),
           gameObjects: ConvertGameObjectsSystem.convert(gltf),
           indices: ConvertIndicesSystem.convertToIndices(gltf),
           transforms: ConvertTransformsSystem.convertToTransforms(gltf),
           basicCameraViews:
             ConvertCamerasSystem.convertToBasicCameraViews(gltf),
           perspectiveCameraProjections:
             ConvertCamerasSystem.convertToPerspectiveCameraProjections(gltf),
           lightMaterials:
             ConvertMaterialsSystem.convertToLightMaterials(gltf),
           customGeometrys: ConvertGeometrysSystem.convertToGeometrys(gltf),
           basicSourceTextures:
             ConvertTexturesSystem.convertToBasicSourceTextures(gltf),
           samplers: ConvertTexturesSystem.convertToSamplers(gltf),
           images: ConvertImagesSystem.convertToImages(gltf),
           accessors: ConvertBuffersSystem.convertToAccessors(gltf),
           bufferViews: ConvertBuffersSystem.convertToBufferViews(gltf),
           buffers: ConvertBuffersSystem.convertToBuffers(gltf),
           directionLights: directionLightArr,
           pointLights: pointLightArr,
         }: WDType.wd
       )
       |> Obj.magic
       |> Js.Json.stringify,
     );
};

let _convertGLBToWDB = (gltf: GLTFType.gltf, binBuffer) : ArrayBuffer.t => {
  let jsonUint8Array = _buildWDBJsonUint8Array(gltf);

  let jsonByteLength =
    jsonUint8Array |> Uint8Array.byteLength |> BinaryUtils.alignedLength;

  let binBufferByteLength = _getBinBufferByteLength(binBuffer);

  let totalByteLength =
    /* file header: magic + version + length */
    12
    /* json chunk header: json length + type */
    + 8
    + jsonByteLength
    /* bin chunk header: chunk length + type */
    + 8
    + binBufferByteLength;

  let wdb = ArrayBuffer.make(totalByteLength);

  let dataView = DataViewCommon.create(wdb);

  let byteOffset =
    dataView |> DataViewCommon.writeUint32_1BigEndian(0x46546C68, 0);
  let byteOffset =
    dataView |> DataViewCommon.writeUint32_1BigEndian(1, byteOffset);
  let byteOffset =
    dataView
    |> DataViewCommon.writeUint32_1BigEndian(totalByteLength, byteOffset);

  let byteOffset =
    dataView
    |> DataViewCommon.writeUint32_1BigEndian(jsonByteLength, byteOffset);
  let byteOffset =
    dataView |> DataViewCommon.writeUint32_1BigEndian(0x4E4F534A, byteOffset);
  let (byteOffset, uint8Array, dataView) =
    _copyUint8ArrayToArrayBuffer(byteOffset, jsonUint8Array, dataView);

  let byteOffset =
    dataView
    |> DataViewCommon.writeUint32_1BigEndian(binBufferByteLength, byteOffset);
  let byteOffset =
    dataView |> DataViewCommon.writeUint32_1BigEndian(0x004E4942, byteOffset);
  let (byteOffset, uint8Array, dataView) =
    _copyUint8ArrayToArrayBuffer(
      byteOffset,
      Uint8Array.fromBuffer(binBuffer),
      dataView,
    );

  wdb;
};

/* let convert = (gltfFileContent: string) =>
   {
     /* let (gltfFileContent, binBuffer) = BinaryUtils.decode(glb, _checkGLB); */
     _convertGLBToWDB(
       ConvertGLTFJsonToRecordSystem.convert(
         gltfFileContent |> Js.Json.parseExn,
       ),
       binBuffer,
     );

   }; */

/* _convertGLTFToWDB(
     ConvertGLTFJsonToRecordSystem.convert(
       gltfFileContent |> Js.Json.parseExn,
     ),
   ); */

let _checkGLB = dataView => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|Source file to be a GLB (glTF Binary) model|j},
          ~actual={j|not|j},
        ),
        () => {
          let (value, _) = DataViewCommon.getUint32_1(. 0, dataView);

          value == 0x46546C67;
        },
      );

      let (readVersion, _) = DataViewCommon.getUint32_1(. 4, dataView);

      test(
        Log.buildAssertMessage(
          ~expect={j|Only GLB version 2 is supported|j},
          ~actual={j|Detected version: $readVersion|j},
        ),
        () =>
        readVersion == 2
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  dataView;
};

let convertGLB = (glb: ArrayBuffer.t) => {
  let (gltfFileContent, binBuffer) = BinaryUtils.decode(glb, _checkGLB);
  _convertGLBToWDB(
    ConvertGLTFJsonToRecordSystem.convert(
      gltfFileContent |> Js.Json.parseExn,
    ),
    binBuffer,
  );
};

let convertGLBData = (gltf, binBuffer) =>
  _convertGLBToWDB(ConvertGLTFJsonToRecordSystem.convert(gltf), binBuffer);