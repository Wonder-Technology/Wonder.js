open Js.Promise;

open Js.Typed_array;

let _checkAndWarn = (({meshes}: GLTFType.gltf) as gltf) => {
  let hasTexCoord_1 = ref(false);

  meshes
  |> WonderCommonlib.ArrayService.forEach((. {primitives}: GLTFType.mesh) => {
       let {attributes}: GLTFType.primitive =
         Array.unsafe_get(primitives, 0);

       attributes.texCoord_1 |> Js.Option.isSome ?
         {
           hasTexCoord_1 := true;

           ();
         } :
         ();
     });

  hasTexCoord_1^ ? WonderLog.Log.warn({j|not support texCoord_1|j}) : ();

  gltf;
};

let _buildWDBJsonUint8Array = (gltf: GLTFType.gltf) => {
  let gltf = _checkAndWarn(gltf);
  let ({asset, scenes, scene, nodes, extensions}: GLTFType.gltf) as gltf =
    gltf |> ConvertMultiPrimitivesSystem.convertMultiPrimitivesToNodes;

  let transforms = ConvertTransformsSystem.convertToTransforms(gltf);

  let (bufferViewDataArr, streamChunkArr, gltf) =
    gltf |> BuildGLTFJsonDataSystem.buildJsonData(transforms);

  let (ambientLightArr, directionLightArr, pointLightArr) =
    ConvertLightsSystem.convertToLights(gltf);

  let indices = ConvertIndicesSystem.convertToIndices(gltf);

  let encoder = TextEncoder.newTextEncoder();

  (
    bufferViewDataArr,
    streamChunkArr,
    encoder
    |> TextEncoder.encodeUint8Array(
         (
           {
             asset: {
               version: asset.version,
               generator: GLTFUtils.getGenerator(),
             },
             scene: ConvertSceneSystem.convertToScene(ambientLightArr, gltf),
             gameObjects: ConvertGameObjectsSystem.convert(gltf),
             indices,
             transforms,
             basicCameraViews:
               ConvertCamerasSystem.convertToBasicCameraViews(gltf),
             perspectiveCameraProjections:
               ConvertCamerasSystem.convertToPerspectiveCameraProjections(
                 gltf,
               ),
             flyCameraControllers:
               ConvertCamerasSystem.convertToFlyCameraControllers(gltf),
             arcballCameraControllers:
               ConvertCamerasSystem.convertToArcballCameraControllers(gltf),
             basicMaterials:
               ConvertMaterialsSystem.convertToBasicMaterials(gltf),
             lightMaterials:
               ConvertMaterialsSystem.convertToLightMaterials(gltf),
             geometrys: ConvertGeometrysSystem.convertToGeometrys(gltf),
             meshRenderers:
               ConvertMeshRenderersSystem.convertToMeshRenderers(
                 indices.gameObjectIndices.geometryGameObjectIndexData,
                 gltf,
               ),
             basicSourceTextures:
               ConvertTexturesSystem.convertToBasicSourceTextures(gltf),
             cubemapTextures:
               ConvertTexturesSystem.convertToCubemapTextures(gltf),
             samplers: ConvertTexturesSystem.convertToSamplers(gltf),
             images: ConvertImagesSystem.convertToImages(gltf),
             accessors: ConvertBuffersSystem.convertToAccessors(gltf),
             bufferViews: ConvertBuffersSystem.convertToBufferViews(gltf),
             buffers: ConvertBuffersSystem.convertToBuffers(gltf),
             directionLights: directionLightArr,
             pointLights: pointLightArr,
             scripts: ConvertScriptsSystem.convertToScripts(gltf),
           }: WDType.wd
         )
         |> Obj.magic
         |> Js.Json.stringify,
       ),
  );
};

let _writeHeader =
    (
      (
        totalByteLength,
        jsonChunkByteLength,
        streamChunkByteLength,
        binBufferChunkByteLength,
      ),
      dataView,
    ) =>
  dataView
  |> DataViewCommon.writeUint32_1(0x46546C68, 0)
  |> DataViewCommon.writeUint32_1(1, _, dataView)
  |> DataViewCommon.writeUint32_1(totalByteLength, _, dataView)
  |> DataViewCommon.writeUint32_1(jsonChunkByteLength, _, dataView)
  |> DataViewCommon.writeUint32_1(streamChunkByteLength, _, dataView)
  |> DataViewCommon.writeUint32_1(binBufferChunkByteLength, _, dataView);

let _writeJson =
    (
      byteOffset,
      (emptyEncodedUint8Data, jsonChunkByteLength, jsonUint8Array),
      dataView,
    ) =>
  BufferUtils.copyUint8ArrayToArrayBuffer(
    byteOffset,
    (emptyEncodedUint8Data, jsonChunkByteLength, jsonUint8Array),
    dataView,
  );

let _getEmptyEncodedUint8Data = () => {
  let encoder = TextEncoder.newTextEncoder();
  let emptyUint8DataArr = encoder |> TextEncoder.encodeUint8Array(" ");

  TypeArrayService.getUint8_1(0, emptyUint8DataArr);
};

let _convertGLBToWDB = (gltf: GLTFType.gltf, binBuffer): ArrayBuffer.t => {
  let (bufferViewDataArr, streamChunkArr, jsonUint8Array) =
    _buildWDBJsonUint8Array(gltf);

  let jsonChunkByteLength = jsonUint8Array |> Uint8Array.byteLength;

  let jsonChunkAlignedByteLength =
    jsonChunkByteLength |> BufferUtils.alignedLength;

  let totalByteLength =
    BufferUtils.getWDBHeaderTotalByteLength()
    + jsonChunkAlignedByteLength
    + (
      ConvertStreamSystem.getStreamChunkTotalByteLength(streamChunkArr)
      |> BufferUtils.alignedLength
    )
    + ConvertStreamSystem.getBinBufferChunkTotalAlignedByteLength(
        bufferViewDataArr,
      );

  let wdb = ArrayBuffer.make(totalByteLength);
  let dataView = DataViewCommon.create(wdb);

  let byteOffset =
    _writeHeader(
      (
        totalByteLength,
        jsonChunkByteLength,
        ConvertStreamSystem.getStreamChunkTotalByteLength(streamChunkArr),
        ConvertStreamSystem.getBinBufferChunkTotalAlignedByteLength(
          bufferViewDataArr,
        ),
      ),
      dataView,
    );

  let emptyEncodedUint8Data = _getEmptyEncodedUint8Data();

  let (byteOffset, _, dataView) =
    _writeJson(
      byteOffset,
      (emptyEncodedUint8Data, jsonChunkAlignedByteLength, jsonUint8Array),
      dataView,
    );

  let (byteOffset, dataView) =
    ConvertStreamSystem.buildStreamChunk(
      byteOffset,
      streamChunkArr,
      dataView,
    );

  let (byteOffset, dataView) =
    ConvertStreamSystem.buildBinBufferChunk(
      byteOffset,
      bufferViewDataArr,
      binBuffer,
      dataView,
    );

  wdb;
};

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

let _fixGLTF = (gltf: GLTFType.gltf) => {
  open GLTFType;

  let nodeMaxIndex = (gltf.nodes |> Js.Array.length) - 1;

  {
    ...gltf,
    scenes:
      gltf.scenes
      |> Js.Array.map((scene: scene) =>
           (
             {
               ...scene,
               nodes:
                 scene.nodes
                 |> Js.Option.map((. nodes) =>
                      nodes
                      |> Js.Array.filter(nodeIndex =>
                           nodeIndex <= nodeMaxIndex
                         )
                    ),
             }: scene
           )
         ),
  };
};

let convertGLBData = (gltf: Js.Json.t, binBuffer) =>
  _convertGLBToWDB(
    ConvertGLTFJsonToRecordSystem.convert(gltf)->_fixGLTF,
    binBuffer,
  );

let convertGLB = (glb: ArrayBuffer.t) => {
  let (gltfFileContent, binBuffer) = BufferUtils.decodeGLB(glb, _checkGLB);

  convertGLBData(gltfFileContent |> Js.Json.parseExn, binBuffer);
};
