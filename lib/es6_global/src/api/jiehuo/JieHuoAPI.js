

import * as Most from "most";
import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as RayUtils$Wonderjs from "../../jiehuo/RayUtils.js";
import * as MeshUtils$Wonderjs from "../../jiehuo/MeshUtils.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function checkIntersectMesh(ray, geometry, localToWorldMatrixTypeArray, cull, state) {
  return MeshUtils$Wonderjs.checkIntersectMesh(ray, /* tuple */[
              geometry,
              localToWorldMatrixTypeArray,
              cull
            ], state);
}

var isIntersectWithMesh = Js_option.isSome;

var getIntersectedPointWithMesh = OptionService$Wonderjs.unsafeGet;

function _loadImage (url,errorInfo,resolve,reject){
                    var image = new Image();

                    image.src = url;

                    image.onload = (function () {
                        return resolve(image);
                      });

                    image.onerror = (function (e) {
                      console.trace();
                              return reject(new Error(errorInfo));
                            });

  };

function loadImage(src, errorInfo) {
  return Most.fromPromise(new Promise((function (resolve, reject) {
                    return _loadImage(src, errorInfo, resolve, reject);
                  })));
}

function loadImageDataArr(imageDataArr) {
  ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  return Most.reduce((function (resultMap, param) {
                return ImmutableHashMapService$WonderCommonlib.set(param[1], param[0], resultMap);
              }), ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0), Most.mergeArray(imageDataArr.map((function (param) {
                        var imageId = param[1];
                        var imageSrc = param[0];
                        return Most.map((function (image) {
                                      return /* tuple */[
                                              image,
                                              imageId
                                            ];
                                    }), loadImage(imageSrc, "load image(src = " + (String(imageSrc) + ") error")));
                      }))));
}

var createPerspectiveCameraRayFromEvent = RayUtils$Wonderjs.createPerspectiveCameraRayFromEvent;

export {
  createPerspectiveCameraRayFromEvent ,
  checkIntersectMesh ,
  isIntersectWithMesh ,
  getIntersectedPointWithMesh ,
  _loadImage ,
  loadImage ,
  loadImageDataArr ,
  
}
/* most Not a pure module */
