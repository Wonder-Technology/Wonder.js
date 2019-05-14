open Js.Typed_array;

let _writeUint32DataToUint8Array = uint32Data =>
  Uint8Array.fromBuffer(
    Uint32Array.make([|uint32Data|]) |> Uint32Array.buffer,
  );

let generateSAB =
    (
      (
        (imageBufferViewArr, geometryBufferViewArr),
        imageUint8ArrayArr,
        geometryArrayBufferArr,
      ),
      bufferTotalAlignedByteLength,
      jsonUint8Array,
    ) =>
  GenerateSingleABUtils.generateAB(
    (
      (
        imageBufferViewArr
        |> Js.Array.map(({byteOffset, byteLength}: WDType.bufferView) =>
             (byteOffset, byteLength)
           ),
        geometryBufferViewArr
        |> Js.Array.map(({byteOffset, byteLength}: WDType.bufferView) =>
             (byteOffset, byteLength)
           ),
      ),
      imageUint8ArrayArr,
      geometryArrayBufferArr,
    ),
    bufferTotalAlignedByteLength,
    jsonUint8Array,
  );

let generateSingleSAB = (sceneGameObject, imageUint8ArrayMap, state) => {
  let (gltf, imageResultUint8ArrayMap, binBuffer) =
    GenerateGLBSystem.generateGLBData(
      (sceneGameObject, imageUint8ArrayMap),
      (
        (
          VerticesGeometryMainService.getVertices,
          NormalsGeometryMainService.getNormals,
          TexCoordsGeometryMainService.getTexCoords,
          IndicesGeometryMainService.getIndices16,
          IndicesGeometryMainService.getIndices32,
        ),
        imageUint8Array => imageUint8Array,
      ),
      state,
    );

  ConvertGLBSystem.convertGLBData(gltf, binBuffer);
};