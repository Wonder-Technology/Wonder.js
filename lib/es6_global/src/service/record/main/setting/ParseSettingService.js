

import * as Json_decode$WonderBsJson from "../../../../../../../node_modules/wonder-bs-json/lib/es6_global/src/Json_decode.js";

function convertToRecord(setting) {
  return /* record */[
          /* canvasId */Json_decode$WonderBsJson.optional((function (param) {
                  return Json_decode$WonderBsJson.field("canvas_id", Json_decode$WonderBsJson.string, param);
                }), setting),
          /* memory */Json_decode$WonderBsJson.optional((function (param) {
                  return Json_decode$WonderBsJson.field("memory", (function (json) {
                                return /* record */[
                                        /* maxDisposeCount */Json_decode$WonderBsJson.field("max_dispose_count", Json_decode$WonderBsJson.$$int, json),
                                        /* maxTypeArrayPoolSize */Json_decode$WonderBsJson.field("max_type_array_pool_size", Json_decode$WonderBsJson.$$int, json),
                                        /* maxBigTypeArrayPoolSize */Json_decode$WonderBsJson.field("max_big_type_array_pool_size", Json_decode$WonderBsJson.$$int, json)
                                      ];
                              }), param);
                }), setting),
          /* buffer */Json_decode$WonderBsJson.optional((function (param) {
                  return Json_decode$WonderBsJson.field("buffer", (function (json) {
                                return /* record */[
                                        /* geometryPointCount */Json_decode$WonderBsJson.field("geometry_point_count", Json_decode$WonderBsJson.$$int, json),
                                        /* geometryCount */Json_decode$WonderBsJson.field("geometry_count", Json_decode$WonderBsJson.$$int, json),
                                        /* transformCount */Json_decode$WonderBsJson.field("transform_count", Json_decode$WonderBsJson.$$int, json),
                                        /* basicMaterialCount */Json_decode$WonderBsJson.field("basic_material_count", Json_decode$WonderBsJson.$$int, json),
                                        /* lightMaterialCount */Json_decode$WonderBsJson.field("light_material_count", Json_decode$WonderBsJson.$$int, json),
                                        /* directionLightCount */Json_decode$WonderBsJson.field("direction_light_count", Json_decode$WonderBsJson.$$int, json),
                                        /* pointLightCount */Json_decode$WonderBsJson.field("point_light_count", Json_decode$WonderBsJson.$$int, json),
                                        /* textureCountPerMaterial */Json_decode$WonderBsJson.field("texture_count_per_material", Json_decode$WonderBsJson.$$int, json),
                                        /* basicSourceTextureCount */Json_decode$WonderBsJson.field("basic_source_texture_count", Json_decode$WonderBsJson.$$int, json),
                                        /* arrayBufferViewSourceTextureCount */Json_decode$WonderBsJson.field("arrayBuffer_view_source_texture_count", Json_decode$WonderBsJson.$$int, json),
                                        /* meshRendererCount */Json_decode$WonderBsJson.field("meshRenderer_count", Json_decode$WonderBsJson.$$int, json),
                                        /* instanceBuffer */Json_decode$WonderBsJson.field("instance_buffer", (function (json) {
                                                return /* record */[
                                                        /* sourceInstanceCount */Json_decode$WonderBsJson.field("sourceInstance_count", Json_decode$WonderBsJson.$$int, json),
                                                        /* objectInstanceCountPerSourceInstance */Json_decode$WonderBsJson.field("objectInstance_count_per_source_instance", Json_decode$WonderBsJson.$$int, json)
                                                      ];
                                              }), json)
                                      ];
                              }), param);
                }), setting),
          /* isDebug */Json_decode$WonderBsJson.optional((function (param) {
                  return Json_decode$WonderBsJson.field("is_debug", Json_decode$WonderBsJson.bool, param);
                }), setting),
          /* context */Json_decode$WonderBsJson.optional((function (param) {
                  return Json_decode$WonderBsJson.field("context", (function (json) {
                                return /* record */[
                                        /* alpha */Json_decode$WonderBsJson.field("alpha", Json_decode$WonderBsJson.bool, json),
                                        /* depth */Json_decode$WonderBsJson.field("depth", Json_decode$WonderBsJson.bool, json),
                                        /* stencil */Json_decode$WonderBsJson.field("stencil", Json_decode$WonderBsJson.bool, json),
                                        /* antialias */Json_decode$WonderBsJson.field("antialias", Json_decode$WonderBsJson.bool, json),
                                        /* premultipliedAlpha */Json_decode$WonderBsJson.field("premultiplied_alpha", Json_decode$WonderBsJson.bool, json),
                                        /* preserveDrawingBuffer */Json_decode$WonderBsJson.field("preserve_drawing_buffer", Json_decode$WonderBsJson.bool, json)
                                      ];
                              }), param);
                }), setting),
          /* gpu */Json_decode$WonderBsJson.optional((function (param) {
                  return Json_decode$WonderBsJson.field("gpu", (function (json) {
                                return /* record */[/* useHardwareInstance */Json_decode$WonderBsJson.field("use_hardware_instance", Json_decode$WonderBsJson.bool, json)];
                              }), param);
                }), setting),
          /* worker */Json_decode$WonderBsJson.optional((function (param) {
                  return Json_decode$WonderBsJson.field("worker", (function (json) {
                                return /* record */[/* useWorker */Json_decode$WonderBsJson.field("use_worker", Json_decode$WonderBsJson.bool, json)];
                              }), param);
                }), setting)
        ];
}

export {
  convertToRecord ,
  
}
/* No side effect */
