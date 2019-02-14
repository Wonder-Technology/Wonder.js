

import * as Json_decode$WonderBsJson from "../../../../../../../node_modules/wonder-bs-json/lib/es6_global/src/Json_decode.js";

function _convertShaderMapData(json) {
  return Json_decode$WonderBsJson.array((function (json) {
                return /* record */[
                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                        /* value */Json_decode$WonderBsJson.field("value", (function (param) {
                                return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.string, param);
                              }), json)
                      ];
              }), json);
}

function _convertDynamicBranchData(json) {
  return Json_decode$WonderBsJson.array((function (json) {
                return /* record */[
                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                        /* condition */Json_decode$WonderBsJson.field("condition", Json_decode$WonderBsJson.string, json),
                        /* pass */Json_decode$WonderBsJson.optional((function (param) {
                                return Json_decode$WonderBsJson.field("pass", Json_decode$WonderBsJson.string, param);
                              }), json),
                        /* fail */Json_decode$WonderBsJson.optional((function (param) {
                                return Json_decode$WonderBsJson.field("fail", Json_decode$WonderBsJson.string, param);
                              }), json)
                      ];
              }), json);
}

function convertShadersToRecord(shaders) {
  return /* record */[
          /* staticBranchs */Json_decode$WonderBsJson.field("static_branchs", _convertShaderMapData, shaders),
          /* dynamicBranchs */Json_decode$WonderBsJson.field("dynamic_branchs", _convertDynamicBranchData, shaders),
          /* groups */Json_decode$WonderBsJson.field("groups", _convertShaderMapData, shaders),
          /* materialShaders */Json_decode$WonderBsJson.field("material_shaders", (function (json) {
                  return Json_decode$WonderBsJson.array((function (json) {
                                return /* record */[
                                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                                        /* shaderLibs */Json_decode$WonderBsJson.field("shader_libs", (function (param) {
                                                return Json_decode$WonderBsJson.array((function (json) {
                                                              return /* record */[
                                                                      /* type_ */Json_decode$WonderBsJson.optional((function (param) {
                                                                              return Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, param);
                                                                            }), json),
                                                                      /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json)
                                                                    ];
                                                            }), param);
                                              }), json)
                                      ];
                              }), json);
                }), shaders),
          /* noMaterialShaders */Json_decode$WonderBsJson.field("no_material_shaders", (function (json) {
                  return Json_decode$WonderBsJson.array((function (json) {
                                return /* record */[
                                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                                        /* shaderLibs */Json_decode$WonderBsJson.field("shader_libs", (function (param) {
                                                return Json_decode$WonderBsJson.array((function (json) {
                                                              return /* record */[
                                                                      /* type_ */Json_decode$WonderBsJson.optional((function (param) {
                                                                              return Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, param);
                                                                            }), json),
                                                                      /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json)
                                                                    ];
                                                            }), param);
                                              }), json)
                                      ];
                              }), json);
                }), shaders)
        ];
}

function _convertGlslToRecord(json) {
  return Json_decode$WonderBsJson.optional((function (param) {
                return Json_decode$WonderBsJson.field("glsls", (function (json) {
                              return Json_decode$WonderBsJson.array((function (json) {
                                            return /* record */[
                                                    /* type_ */Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, json),
                                                    /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json)
                                                  ];
                                          }), json);
                            }), param);
              }), json);
}

function _convertVariableToRecord(json) {
  return Json_decode$WonderBsJson.optional((function (param) {
                return Json_decode$WonderBsJson.field("variables", (function (json) {
                              return /* record */[
                                      /* uniforms */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("uniforms", (function (json) {
                                                            return Json_decode$WonderBsJson.array((function (json) {
                                                                          return /* record */[
                                                                                  /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                                                                                  /* field */Json_decode$WonderBsJson.field("field", Json_decode$WonderBsJson.string, json),
                                                                                  /* type_ */Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, json),
                                                                                  /* from */Json_decode$WonderBsJson.field("from", Json_decode$WonderBsJson.string, json)
                                                                                ];
                                                                        }), json);
                                                          }), param);
                                            }), json),
                                      /* attributes */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("attributes", (function (json) {
                                                            return Json_decode$WonderBsJson.array((function (json) {
                                                                          return /* record */[
                                                                                  /* name */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, param);
                                                                                        }), json),
                                                                                  /* buffer */Json_decode$WonderBsJson.field("buffer", Json_decode$WonderBsJson.$$int, json),
                                                                                  /* type_ */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, param);
                                                                                        }), json)
                                                                                ];
                                                                        }), json);
                                                          }), param);
                                            }), json)
                                    ];
                            }), param);
              }), json);
}

function convertShaderLibsToRecord(shaderLibs) {
  return Json_decode$WonderBsJson.array((function (json) {
                return /* record */[
                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                        /* glsls */_convertGlslToRecord(json),
                        /* variables */_convertVariableToRecord(json)
                      ];
              }), shaderLibs);
}

export {
  _convertShaderMapData ,
  _convertDynamicBranchData ,
  convertShadersToRecord ,
  _convertGlslToRecord ,
  _convertVariableToRecord ,
  convertShaderLibsToRecord ,
  
}
/* No side effect */
