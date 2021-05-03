

import * as Most from "most";
import * as Caml_option from "./../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ImageUtils$Wonderjs from "../utils/ImageUtils.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as AssembleUtils$Wonderjs from "../utils/AssembleUtils.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _build(_completeStreamChunkTotalLoadedAlignedByteLength, totalLoadedByteLength, _nextStreamChunkIndex, streamChunkArr, loadedArrayBuffer, images, _loadedStreamChunkDataArr) {
  while(true) {
    var loadedStreamChunkDataArr = _loadedStreamChunkDataArr;
    var nextStreamChunkIndex = _nextStreamChunkIndex;
    var completeStreamChunkTotalLoadedAlignedByteLength = _completeStreamChunkTotalLoadedAlignedByteLength;
    var match = nextStreamChunkIndex >= streamChunkArr.length;
    if (match) {
      return /* tuple */[
              nextStreamChunkIndex,
              loadedStreamChunkDataArr
            ];
    } else {
      var match$1 = streamChunkArr[nextStreamChunkIndex];
      var type_ = match$1[/* type_ */2];
      var index = match$1[/* index */1];
      var nextCompleteStreamChunkTotalLoadedByteLength = completeStreamChunkTotalLoadedAlignedByteLength + match$1[/* byteLength */0] | 0;
      var match$2 = nextCompleteStreamChunkTotalLoadedByteLength > totalLoadedByteLength;
      if (match$2) {
        return /* tuple */[
                nextStreamChunkIndex,
                loadedStreamChunkDataArr
              ];
      } else {
        var loadedStreamChunkDataArr$1;
        if (type_ >= 4) {
          var match$3 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(images)[index];
          loadedStreamChunkDataArr$1 = ArrayService$Wonderjs.push(/* record */[
                /* geometryData */undefined,
                /* imageData *//* record */[
                  /* name */match$3[/* name */0],
                  /* imageIndex */index,
                  /* mimeType */match$3[/* mimeType */2],
                  /* arrayBuffer */loadedArrayBuffer.slice(completeStreamChunkTotalLoadedAlignedByteLength, nextCompleteStreamChunkTotalLoadedByteLength)
                ],
                /* type_ */type_
              ], loadedStreamChunkDataArr);
        } else {
          loadedStreamChunkDataArr$1 = ArrayService$Wonderjs.push(/* record */[
                /* geometryData *//* record */[
                  /* meshIndex */index,
                  /* arrayBuffer */loadedArrayBuffer.slice(completeStreamChunkTotalLoadedAlignedByteLength, nextCompleteStreamChunkTotalLoadedByteLength),
                  /* componentType */match$1[/* componentType */3]
                ],
                /* imageData */undefined,
                /* type_ */type_
              ], loadedStreamChunkDataArr);
        }
        _loadedStreamChunkDataArr = loadedStreamChunkDataArr$1;
        _nextStreamChunkIndex = nextStreamChunkIndex + 1 | 0;
        _completeStreamChunkTotalLoadedAlignedByteLength = BufferUtils$Wonderjs.alignedLength(nextCompleteStreamChunkTotalLoadedByteLength);
        continue ;
      }
    }
  };
}

function _splitLoadedStreamChunkArrByJudgeHasAllGeometryPointDataOrHasImageData(nextStreamChunkIndex, streamChunkArr, loadedStreamChunkDataArr) {
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, data) {
          var loadedStreamChunkDataArrWhichHasAllData = param[1];
          var loadedStreamChunkArrWhichNotHasAllData = param[0];
          if (data[/* type_ */2] >= 3) {
            return /* tuple */[
                    /* array */[],
                    loadedStreamChunkDataArrWhichHasAllData.concat(ArrayService$Wonderjs.push(data, loadedStreamChunkArrWhichNotHasAllData))
                  ];
          } else {
            return /* tuple */[
                    ArrayService$Wonderjs.push(data, loadedStreamChunkArrWhichNotHasAllData),
                    loadedStreamChunkDataArrWhichHasAllData
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[]
      ], loadedStreamChunkDataArr);
  var loadedStreamChunkDataArrWhichHasAllData = match[1];
  var loadedStreamChunkArrWhichNotHasAllData = match[0];
  var match$1 = nextStreamChunkIndex === streamChunkArr.length || streamChunkArr[nextStreamChunkIndex][/* type_ */2] === /* Vertex */0;
  if (match$1) {
    return /* tuple */[
            /* array */[],
            loadedStreamChunkDataArrWhichHasAllData.concat(loadedStreamChunkArrWhichNotHasAllData)
          ];
  } else {
    return /* tuple */[
            loadedStreamChunkArrWhichNotHasAllData,
            loadedStreamChunkDataArrWhichHasAllData
          ];
  }
}

function _loadBlobImageFromImageArrayBufferData(loadedStreamChunkDataArr, loadBlobImageMap) {
  var resultLoadedStreamChunkDataArr = /* array */[];
  return Most.drain(Most.concatMap((function (param) {
                      var type_ = param[/* type_ */2];
                      if (type_ >= 4) {
                        var match = OptionService$Wonderjs.unsafeGet(param[/* imageData */1]);
                        var imageIndex = match[/* imageIndex */1];
                        var name = match[/* name */0];
                        var match$1 = MutableSparseMapService$WonderCommonlib.get(imageIndex, loadBlobImageMap);
                        if (match$1 !== undefined) {
                          ArrayService$Wonderjs.push(/* record */[
                                /* geometryData */undefined,
                                /* imageData *//* record */[
                                  /* imageIndex */imageIndex,
                                  /* image */Caml_option.valFromOption(match$1)
                                ],
                                /* type_ */type_
                              ], resultLoadedStreamChunkDataArr);
                          return Most.empty();
                        } else {
                          return Most.map((function (param) {
                                        return /* () */0;
                                      }), Most.tap((function (image) {
                                            ImageUtils$Wonderjs.setImageName(image, name);
                                            ArrayService$Wonderjs.push(/* record */[
                                                  /* geometryData */undefined,
                                                  /* imageData *//* record */[
                                                    /* imageIndex */imageIndex,
                                                    /* image */image
                                                  ],
                                                  /* type_ */type_
                                                ], resultLoadedStreamChunkDataArr);
                                            MutableSparseMapService$WonderCommonlib.set(imageIndex, image, loadBlobImageMap);
                                            return /* () */0;
                                          }), AssembleUtils$Wonderjs.buildLoadImageStream(match[/* arrayBuffer */3], match[/* mimeType */2], "load image error. imageName: " + (String(name) + ""))));
                        }
                      } else {
                        ArrayService$Wonderjs.push(/* record */[
                              /* geometryData */param[/* geometryData */0],
                              /* imageData */undefined,
                              /* type_ */type_
                            ], resultLoadedStreamChunkDataArr);
                        return Most.empty();
                      }
                    }), Most.from(loadedStreamChunkDataArr))).then((function (param) {
                return Promise.resolve(/* tuple */[
                            resultLoadedStreamChunkDataArr,
                            loadBlobImageMap
                          ]);
              }));
}

function buildBinBufferChunkData(nextStreamChunkIndex, loadedStreamChunkArrWhichNotHasAllData, completeStreamChunkTotalLoadedAlignedByteLength, totalLoadedByteLength, loadedArrayBuffer, streamChunkArr, loadBlobImageMap, images) {
  var match = _build(completeStreamChunkTotalLoadedAlignedByteLength, totalLoadedByteLength, nextStreamChunkIndex, streamChunkArr, loadedArrayBuffer, images, loadedStreamChunkArrWhichNotHasAllData);
  var nextStreamChunkIndex$1 = match[0];
  var match$1 = _splitLoadedStreamChunkArrByJudgeHasAllGeometryPointDataOrHasImageData(nextStreamChunkIndex$1, streamChunkArr, match[1]);
  var loadedStreamChunkArrWhichNotHasAllData$1 = match$1[0];
  return _loadBlobImageFromImageArrayBufferData(match$1[1], loadBlobImageMap).then((function (param) {
                return Promise.resolve(/* tuple */[
                            param[0],
                            nextStreamChunkIndex$1,
                            loadedStreamChunkArrWhichNotHasAllData$1,
                            param[1]
                          ]);
              }));
}

export {
  _build ,
  _splitLoadedStreamChunkArrByJudgeHasAllGeometryPointDataOrHasImageData ,
  _loadBlobImageFromImageArrayBufferData ,
  buildBinBufferChunkData ,
  
}
/* most Not a pure module */
