'use strict';


function buildDisposeData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var geometryNeedDisposeVboBufferArr = $staropt$star !== undefined ? $staropt$star : /* array */[];
  var sourceInstanceNeedDisposeVboBufferArr = $staropt$star$1 !== undefined ? $staropt$star$1 : /* array */[];
  var needDisposedBasicSourceTextureIndexArray = $staropt$star$2 !== undefined ? $staropt$star$2 : /* array */[];
  var needDisposedArrayBufferViewTextureIndexArray = $staropt$star$3 !== undefined ? $staropt$star$3 : /* array */[];
  return {
          operateType: "DISPOSE",
          geometryNeedDisposeVboBufferArr: geometryNeedDisposeVboBufferArr,
          sourceInstanceNeedDisposeVboBufferArr: sourceInstanceNeedDisposeVboBufferArr,
          needDisposedBasicSourceTextureIndexArray: needDisposedBasicSourceTextureIndexArray,
          needDisposedArrayBufferViewTextureIndexArray: needDisposedArrayBufferViewTextureIndexArray
        };
}

exports.buildDisposeData = buildDisposeData;
/* No side effect */
