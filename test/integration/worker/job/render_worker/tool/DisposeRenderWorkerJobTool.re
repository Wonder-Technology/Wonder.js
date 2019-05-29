let buildDisposeData =
    (
      ~geometryNeedDisposeVboBufferArr=[||],
      ~sourceInstanceNeedDisposeVboBufferArr=[||],
      ~needDisposedBasicSourceTextureIndexArray=[||],
      ~needDisposedArrayBufferViewTextureIndexArray=[||],
      (),
    ) => {
  "operateType": "DISPOSE",
  "geometryNeedDisposeVboBufferArr": geometryNeedDisposeVboBufferArr,
  "sourceInstanceNeedDisposeVboBufferArr": sourceInstanceNeedDisposeVboBufferArr,
  "needDisposedBasicSourceTextureIndexArray": needDisposedBasicSourceTextureIndexArray,
  "needDisposedArrayBufferViewTextureIndexArray": needDisposedArrayBufferViewTextureIndexArray,
};