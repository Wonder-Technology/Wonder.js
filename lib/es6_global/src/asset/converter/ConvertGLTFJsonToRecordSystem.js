

import * as Js_dict from "../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Json_decode$WonderBsJson from "../../../../../node_modules/wonder-bs-json/lib/es6_global/src/Json_decode.js";

function _convertAsset(json) {
  return Json_decode$WonderBsJson.field("asset", (function (json) {
                return /* record */[
                        /* version */Json_decode$WonderBsJson.field("version", Json_decode$WonderBsJson.string, json),
                        /* generator */Json_decode$WonderBsJson.optional((function (param) {
                                return Json_decode$WonderBsJson.field("generator", Json_decode$WonderBsJson.string, param);
                              }), json)
                      ];
              }), json);
}

function _convertSamplers(json) {
  return Json_decode$WonderBsJson.optional((function (param) {
                return Json_decode$WonderBsJson.field("samplers", (function (param) {
                              return Json_decode$WonderBsJson.array((function (json) {
                                            return /* record */[
                                                    /* magFilter */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("magFilter", Json_decode$WonderBsJson.$$int, param);
                                                          }), json),
                                                    /* minFilter */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("minFilter", Json_decode$WonderBsJson.$$int, param);
                                                          }), json),
                                                    /* wrapS */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("wrapS", Json_decode$WonderBsJson.$$int, param);
                                                          }), json),
                                                    /* wrapT */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("wrapT", Json_decode$WonderBsJson.$$int, param);
                                                          }), json)
                                                  ];
                                          }), param);
                            }), param);
              }), json);
}

function _convertBuffers(json) {
  return Json_decode$WonderBsJson.field("buffers", (function (param) {
                return Json_decode$WonderBsJson.array((function (json) {
                              return /* record */[
                                      /* uri */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("uri", Json_decode$WonderBsJson.string, param);
                                            }), json),
                                      /* byteLength */Json_decode$WonderBsJson.field("byteLength", Json_decode$WonderBsJson.$$int, json)
                                    ];
                            }), param);
              }), json);
}

function _convertBufferViews(json) {
  return Json_decode$WonderBsJson.field("bufferViews", (function (param) {
                return Json_decode$WonderBsJson.array((function (json) {
                              return /* record */[
                                      /* buffer */Json_decode$WonderBsJson.field("buffer", Json_decode$WonderBsJson.$$int, json),
                                      /* byteOffset */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("byteOffset", Json_decode$WonderBsJson.$$int, param);
                                            }), json),
                                      /* byteLength */Json_decode$WonderBsJson.field("byteLength", Json_decode$WonderBsJson.$$int, json),
                                      /* byteStride */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("byteStride", Json_decode$WonderBsJson.$$int, param);
                                            }), json)
                                    ];
                            }), param);
              }), json);
}

function _convertAccessors(json) {
  return Json_decode$WonderBsJson.field("accessors", (function (param) {
                return Json_decode$WonderBsJson.array((function (json) {
                              return /* record */[
                                      /* bufferView */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("bufferView", Json_decode$WonderBsJson.$$int, param);
                                            }), json),
                                      /* byteOffset */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("byteOffset", Json_decode$WonderBsJson.$$int, param);
                                            }), json),
                                      /* count */Json_decode$WonderBsJson.field("count", Json_decode$WonderBsJson.$$int, json),
                                      /* componentType */Json_decode$WonderBsJson.field("componentType", Json_decode$WonderBsJson.$$int, json),
                                      /* type_ */Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, json)
                                    ];
                            }), param);
              }), json);
}

function _convertTextures(json) {
  return Json_decode$WonderBsJson.optional((function (param) {
                return Json_decode$WonderBsJson.field("textures", (function (param) {
                              return Json_decode$WonderBsJson.array((function (json) {
                                            return /* record */[
                                                    /* sampler */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("sampler", Json_decode$WonderBsJson.$$int, param);
                                                          }), json),
                                                    /* source */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("source", Json_decode$WonderBsJson.$$int, param);
                                                          }), json),
                                                    /* name */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, param);
                                                          }), json),
                                                    /* extras */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("extras", (function (json) {
                                                                          return /* record */[/* flipY */Json_decode$WonderBsJson.field("flipY", Json_decode$WonderBsJson.bool, json)];
                                                                        }), param);
                                                          }), json)
                                                  ];
                                          }), param);
                            }), param);
              }), json);
}

function _convertImages(json) {
  return Json_decode$WonderBsJson.optional((function (param) {
                return Json_decode$WonderBsJson.field("images", (function (param) {
                              return Json_decode$WonderBsJson.array((function (json) {
                                            return /* record */[
                                                    /* uri */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("uri", Json_decode$WonderBsJson.string, param);
                                                          }), json),
                                                    /* name */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, param);
                                                          }), json),
                                                    /* bufferView */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("bufferView", Json_decode$WonderBsJson.$$int, param);
                                                          }), json),
                                                    /* mimeType */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("mimeType", Json_decode$WonderBsJson.string, param);
                                                          }), json)
                                                  ];
                                          }), param);
                            }), param);
              }), json);
}

function _convertCustomData (json){
      return json.customData;
      };

function _convertScenes(json) {
  return Json_decode$WonderBsJson.field("scenes", (function (param) {
                return Json_decode$WonderBsJson.array((function (json) {
                              return /* record */[
                                      /* nodes */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("nodes", (function (param) {
                                                            return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.$$int, param);
                                                          }), param);
                                            }), json),
                                      /* extensions */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("extensions", (function (json) {
                                                            return /* record */[/* khr_lights */Json_decode$WonderBsJson.optional((function (param) {
                                                                            return Json_decode$WonderBsJson.field("KHR_lights", (function (json) {
                                                                                          return /* record */[/* light */Json_decode$WonderBsJson.field("light", Json_decode$WonderBsJson.$$int, json)];
                                                                                        }), param);
                                                                          }), json)];
                                                          }), param);
                                            }), json),
                                      /* extras */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("extras", (function (json) {
                                                            return /* record */[
                                                                    /* imgui */Json_decode$WonderBsJson.optional((function (param) {
                                                                            return Json_decode$WonderBsJson.field("imgui", (function (json) {
                                                                                          return /* record */[
                                                                                                  /* imguiFunc */Json_decode$WonderBsJson.field("imguiFunc", Json_decode$WonderBsJson.string, json),
                                                                                                  /* customData */_convertCustomData(json)
                                                                                                ];
                                                                                        }), param);
                                                                          }), json),
                                                                    /* isRoot */Json_decode$WonderBsJson.optional((function (param) {
                                                                            return Json_decode$WonderBsJson.field("isRoot", Json_decode$WonderBsJson.bool, param);
                                                                          }), json)
                                                                  ];
                                                          }), param);
                                            }), json)
                                    ];
                            }), param);
              }), json);
}

function _convertExtensions(json) {
  return Json_decode$WonderBsJson.optional((function (param) {
                return Json_decode$WonderBsJson.field("extensions", (function (json) {
                              return /* record */[/* khr_lights */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("KHR_lights", (function (json) {
                                                            return /* record */[/* lights */Json_decode$WonderBsJson.field("lights", (function (param) {
                                                                            return Json_decode$WonderBsJson.array((function (json) {
                                                                                          return /* record */[
                                                                                                  /* type_ */Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, json),
                                                                                                  /* color */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                          return Json_decode$WonderBsJson.field("color", (function (param) {
                                                                                                                        return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.$$float, param);
                                                                                                                      }), param);
                                                                                                        }), json),
                                                                                                  /* intensity */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                          return Json_decode$WonderBsJson.field("intensity", Json_decode$WonderBsJson.$$float, param);
                                                                                                        }), json),
                                                                                                  /* constantAttenuation */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                          return Json_decode$WonderBsJson.field("constantAttenuation", Json_decode$WonderBsJson.$$float, param);
                                                                                                        }), json),
                                                                                                  /* linearAttenuation */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                          return Json_decode$WonderBsJson.field("linearAttenuation", Json_decode$WonderBsJson.$$float, param);
                                                                                                        }), json),
                                                                                                  /* quadraticAttenuation */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                          return Json_decode$WonderBsJson.field("quadraticAttenuation", Json_decode$WonderBsJson.$$float, param);
                                                                                                        }), json),
                                                                                                  /* range */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                          return Json_decode$WonderBsJson.field("range", Json_decode$WonderBsJson.$$float, param);
                                                                                                        }), json)
                                                                                                ];
                                                                                        }), param);
                                                                          }), json)];
                                                          }), param);
                                            }), json)];
                            }), param);
              }), json);
}

function _getScriptMap(key, json) {
  return Js_dict.get(json, key);
}

function _convertExtras(json) {
  return Json_decode$WonderBsJson.optional((function (param) {
                return Json_decode$WonderBsJson.field("extras", (function (json) {
                              return /* record */[
                                      /* basicCameraViews */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("basicCameraViews", (function (param) {
                                                            return Json_decode$WonderBsJson.array((function (json) {
                                                                          return /* record */[/* isActive */Json_decode$WonderBsJson.field("isActive", Json_decode$WonderBsJson.bool, json)];
                                                                        }), param);
                                                          }), param);
                                            }), json),
                                      /* arcballCameraControllers */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("arcballCameraControllers", (function (param) {
                                                            return Json_decode$WonderBsJson.array((function (json) {
                                                                          return /* record */[
                                                                                  /* distance */Json_decode$WonderBsJson.field("distance", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* minDistance */Json_decode$WonderBsJson.field("minDistance", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* phi */Json_decode$WonderBsJson.field("phi", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* theta */Json_decode$WonderBsJson.field("theta", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* thetaMargin */Json_decode$WonderBsJson.field("thetaMargin", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* target */Json_decode$WonderBsJson.field("target", (function (param) {
                                                                                          return Json_decode$WonderBsJson.tuple3(Json_decode$WonderBsJson.$$float, Json_decode$WonderBsJson.$$float, Json_decode$WonderBsJson.$$float, param);
                                                                                        }), json),
                                                                                  /* moveSpeedX */Json_decode$WonderBsJson.field("moveSpeedX", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* moveSpeedY */Json_decode$WonderBsJson.field("moveSpeedY", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* rotateSpeed */Json_decode$WonderBsJson.field("rotateSpeed", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* wheelSpeed */Json_decode$WonderBsJson.field("wheelSpeed", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* isBindEvent */Json_decode$WonderBsJson.field("isBindEvent", Json_decode$WonderBsJson.bool, json)
                                                                                ];
                                                                        }), param);
                                                          }), param);
                                            }), json),
                                      /* basicMaterials */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("basicMaterials", (function (param) {
                                                            return Json_decode$WonderBsJson.array((function (json) {
                                                                          return /* record */[
                                                                                  /* colorFactor */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("colorFactor", (function (param) {
                                                                                                        return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.$$float, param);
                                                                                                      }), param);
                                                                                        }), json),
                                                                                  /* name */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, param);
                                                                                        }), json)
                                                                                ];
                                                                        }), param);
                                                          }), param);
                                            }), json),
                                      /* meshRenderers */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("meshRenderers", (function (param) {
                                                            return Json_decode$WonderBsJson.array((function (json) {
                                                                          return /* record */[
                                                                                  /* drawMode */Json_decode$WonderBsJson.field("drawMode", Json_decode$WonderBsJson.$$int, json),
                                                                                  /* isRender */Json_decode$WonderBsJson.field("isRender", Json_decode$WonderBsJson.bool, json)
                                                                                ];
                                                                        }), param);
                                                          }), param);
                                            }), json),
                                      /* scripts */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("scripts", (function (param) {
                                                            return Json_decode$WonderBsJson.array((function (json) {
                                                                          return /* record */[
                                                                                  /* isActive */Json_decode$WonderBsJson.field("isActive", Json_decode$WonderBsJson.bool, json),
                                                                                  /* eventFunctionDataMap */_getScriptMap("eventFunctionDataMap", json),
                                                                                  /* attributeMap */_getScriptMap("attributeMap", json)
                                                                                ];
                                                                        }), param);
                                                          }), param);
                                            }), json)
                                    ];
                            }), param);
              }), json);
}

function _convertCameras(json) {
  return Json_decode$WonderBsJson.optional((function (param) {
                return Json_decode$WonderBsJson.field("cameras", (function (param) {
                              return Json_decode$WonderBsJson.array((function (json) {
                                            return /* record */[
                                                    /* type_ */Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, json),
                                                    /* perspective */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("perspective", (function (json) {
                                                                          return /* record */[
                                                                                  /* aspectRatio */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("aspectRatio", Json_decode$WonderBsJson.$$float, param);
                                                                                        }), json),
                                                                                  /* yfov */Json_decode$WonderBsJson.field("yfov", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* zfar */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("zfar", Json_decode$WonderBsJson.$$float, param);
                                                                                        }), json),
                                                                                  /* znear */Json_decode$WonderBsJson.field("znear", Json_decode$WonderBsJson.$$float, json)
                                                                                ];
                                                                        }), param);
                                                          }), json),
                                                    /* orthographic */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("orthographic", (function (json) {
                                                                          return /* record */[
                                                                                  /* xmag */Json_decode$WonderBsJson.field("xmag", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* ymag */Json_decode$WonderBsJson.field("ymag", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* zfar */Json_decode$WonderBsJson.field("zfar", Json_decode$WonderBsJson.$$float, json),
                                                                                  /* znear */Json_decode$WonderBsJson.field("znear", Json_decode$WonderBsJson.$$float, json)
                                                                                ];
                                                                        }), param);
                                                          }), json)
                                                  ];
                                          }), param);
                            }), param);
              }), json);
}

function _convertMeshes(json) {
  return Json_decode$WonderBsJson.field("meshes", (function (param) {
                return Json_decode$WonderBsJson.array((function (json) {
                              return /* record */[
                                      /* primitives */Json_decode$WonderBsJson.field("primitives", (function (param) {
                                              return Json_decode$WonderBsJson.array((function (json) {
                                                            return /* record */[
                                                                    /* attributes */Json_decode$WonderBsJson.field("attributes", (function (json) {
                                                                            return /* record */[
                                                                                    /* position */Json_decode$WonderBsJson.field("POSITION", Json_decode$WonderBsJson.$$int, json),
                                                                                    /* normal */Json_decode$WonderBsJson.optional((function (param) {
                                                                                            return Json_decode$WonderBsJson.field("NORMAL", Json_decode$WonderBsJson.$$int, param);
                                                                                          }), json),
                                                                                    /* texCoord_0 */Json_decode$WonderBsJson.optional((function (param) {
                                                                                            return Json_decode$WonderBsJson.field("TEXCOORD_0", Json_decode$WonderBsJson.$$int, param);
                                                                                          }), json),
                                                                                    /* texCoord_1 */Json_decode$WonderBsJson.optional((function (param) {
                                                                                            return Json_decode$WonderBsJson.field("TEXCOORD_1", Json_decode$WonderBsJson.$$int, param);
                                                                                          }), json)
                                                                                  ];
                                                                          }), json),
                                                                    /* indices */Json_decode$WonderBsJson.optional((function (param) {
                                                                            return Json_decode$WonderBsJson.field("indices", Json_decode$WonderBsJson.$$int, param);
                                                                          }), json),
                                                                    /* material */Json_decode$WonderBsJson.optional((function (param) {
                                                                            return Json_decode$WonderBsJson.field("material", Json_decode$WonderBsJson.$$int, param);
                                                                          }), json),
                                                                    /* mode */Json_decode$WonderBsJson.optional((function (param) {
                                                                            return Json_decode$WonderBsJson.field("mode", Json_decode$WonderBsJson.$$int, param);
                                                                          }), json)
                                                                  ];
                                                          }), param);
                                            }), json),
                                      /* name */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, param);
                                            }), json)
                                    ];
                            }), param);
              }), json);
}

function _convertMaterials(json) {
  return Json_decode$WonderBsJson.optional((function (param) {
                return Json_decode$WonderBsJson.field("materials", (function (param) {
                              return Json_decode$WonderBsJson.array((function (json) {
                                            return /* record */[
                                                    /* pbrMetallicRoughness */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("pbrMetallicRoughness", (function (json) {
                                                                          return /* record */[
                                                                                  /* baseColorFactor */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("baseColorFactor", (function (param) {
                                                                                                        return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.$$float, param);
                                                                                                      }), param);
                                                                                        }), json),
                                                                                  /* baseColorTexture */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("baseColorTexture", (function (json) {
                                                                                                        return /* record */[
                                                                                                                /* index */Json_decode$WonderBsJson.field("index", Json_decode$WonderBsJson.$$int, json),
                                                                                                                /* texCoord */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                                        return Json_decode$WonderBsJson.field("texCoord", Json_decode$WonderBsJson.$$int, param);
                                                                                                                      }), json)
                                                                                                              ];
                                                                                                      }), param);
                                                                                        }), json),
                                                                                  /* metallicFactor */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("metallicFactor", Json_decode$WonderBsJson.$$float, param);
                                                                                        }), json),
                                                                                  /* roughnessFactor */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("roughnessFactor", Json_decode$WonderBsJson.$$float, param);
                                                                                        }), json),
                                                                                  /* metallicRoughnessTexture */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("metallicRoughnessTexture", (function (json) {
                                                                                                        return /* record */[
                                                                                                                /* index */Json_decode$WonderBsJson.field("index", Json_decode$WonderBsJson.$$int, json),
                                                                                                                /* texCoord */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                                        return Json_decode$WonderBsJson.field("texCoord", Json_decode$WonderBsJson.$$int, param);
                                                                                                                      }), json)
                                                                                                              ];
                                                                                                      }), param);
                                                                                        }), json)
                                                                                ];
                                                                        }), param);
                                                          }), json),
                                                    /* name */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, param);
                                                          }), json),
                                                    /* extensions */Json_decode$WonderBsJson.optional((function (param) {
                                                            return Json_decode$WonderBsJson.field("extensions", (function (json) {
                                                                          return /* record */[/* khr_materials_pbrSpecularGlossiness */Json_decode$WonderBsJson.optional((function (param) {
                                                                                          return Json_decode$WonderBsJson.field("KHR_materials_pbrSpecularGlossiness", (function (json) {
                                                                                                        return /* record */[
                                                                                                                /* diffuseFactor */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                                        return Json_decode$WonderBsJson.field("diffuseFactor", (function (param) {
                                                                                                                                      return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.$$float, param);
                                                                                                                                    }), param);
                                                                                                                      }), json),
                                                                                                                /* diffuseTexture */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                                        return Json_decode$WonderBsJson.field("diffuseTexture", (function (json) {
                                                                                                                                      return /* record */[
                                                                                                                                              /* index */Json_decode$WonderBsJson.field("index", Json_decode$WonderBsJson.$$int, json),
                                                                                                                                              /* texCoord */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                                                                      return Json_decode$WonderBsJson.field("texCoord", Json_decode$WonderBsJson.$$int, param);
                                                                                                                                                    }), json)
                                                                                                                                            ];
                                                                                                                                    }), param);
                                                                                                                      }), json),
                                                                                                                /* glossinessFactor */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                                        return Json_decode$WonderBsJson.field("glossinessFactor", Json_decode$WonderBsJson.$$float, param);
                                                                                                                      }), json),
                                                                                                                /* specularFactor */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                                        return Json_decode$WonderBsJson.field("specularFactor", (function (param) {
                                                                                                                                      return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.$$float, param);
                                                                                                                                    }), param);
                                                                                                                      }), json),
                                                                                                                /* specularGlossinessTexture */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                                        return Json_decode$WonderBsJson.field("specularGlossinessTexture", (function (json) {
                                                                                                                                      return /* record */[
                                                                                                                                              /* index */Json_decode$WonderBsJson.field("index", Json_decode$WonderBsJson.$$int, json),
                                                                                                                                              /* texCoord */Json_decode$WonderBsJson.optional((function (param) {
                                                                                                                                                      return Json_decode$WonderBsJson.field("texCoord", Json_decode$WonderBsJson.$$int, param);
                                                                                                                                                    }), json)
                                                                                                                                            ];
                                                                                                                                    }), param);
                                                                                                                      }), json)
                                                                                                              ];
                                                                                                      }), param);
                                                                                        }), json)];
                                                                        }), param);
                                                          }), json)
                                                  ];
                                          }), param);
                            }), param);
              }), json);
}

function _convertNodes(json) {
  return Json_decode$WonderBsJson.field("nodes", (function (param) {
                return Json_decode$WonderBsJson.array((function (json) {
                              return /* record */[
                                      /* name */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                              return Json_decode$WonderBsJson.optimizedField("name", Json_decode$WonderBsJson.string, param);
                                            }), json),
                                      /* camera */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                              return Json_decode$WonderBsJson.optimizedField("camera", Json_decode$WonderBsJson.$$int, param);
                                            }), json),
                                      /* mesh */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                              return Json_decode$WonderBsJson.optimizedField("mesh", Json_decode$WonderBsJson.$$int, param);
                                            }), json),
                                      /* children */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                              return Json_decode$WonderBsJson.optimizedField("children", (function (param) {
                                                            return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.$$int, param);
                                                          }), param);
                                            }), json),
                                      /* matrix */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                              return Json_decode$WonderBsJson.optimizedField("matrix", (function (param) {
                                                            return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.$$float, param);
                                                          }), param);
                                            }), json),
                                      /* translation */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                              return Json_decode$WonderBsJson.optimizedField("translation", (function (param) {
                                                            return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.$$float, param);
                                                          }), param);
                                            }), json),
                                      /* rotation */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                              return Json_decode$WonderBsJson.optimizedField("rotation", (function (param) {
                                                            return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.$$float, param);
                                                          }), param);
                                            }), json),
                                      /* scale */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                              return Json_decode$WonderBsJson.optimizedField("scale", (function (param) {
                                                            return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.$$float, param);
                                                          }), param);
                                            }), json),
                                      /* extras */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                              return Json_decode$WonderBsJson.optimizedField("extras", (function (json) {
                                                            return /* record */[
                                                                    /* basicCameraView */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                                                            return Json_decode$WonderBsJson.optimizedField("basicCameraView", Json_decode$WonderBsJson.$$int, param);
                                                                          }), json),
                                                                    /* meshRenderer */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                                                            return Json_decode$WonderBsJson.optimizedField("meshRenderer", Json_decode$WonderBsJson.$$int, param);
                                                                          }), json),
                                                                    /* basicMaterial */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                                                            return Json_decode$WonderBsJson.optimizedField("basicMaterial", Json_decode$WonderBsJson.$$int, param);
                                                                          }), json),
                                                                    /* lightMaterial */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                                                            return Json_decode$WonderBsJson.optimizedField("lightMaterial", Json_decode$WonderBsJson.$$int, param);
                                                                          }), json),
                                                                    /* cameraController */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                                                            return Json_decode$WonderBsJson.optimizedField("cameraController", Json_decode$WonderBsJson.$$int, param);
                                                                          }), json),
                                                                    /* script */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                                                            return Json_decode$WonderBsJson.optimizedField("script", Json_decode$WonderBsJson.$$int, param);
                                                                          }), json),
                                                                    /* isRoot */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                                                            return Json_decode$WonderBsJson.optimizedField("isRoot", Json_decode$WonderBsJson.bool, param);
                                                                          }), json),
                                                                    /* isActive */Json_decode$WonderBsJson.optimizedOptional((function (param) {
                                                                            return Json_decode$WonderBsJson.optimizedField("isActive", Json_decode$WonderBsJson.bool, param);
                                                                          }), json)
                                                                  ];
                                                          }), param);
                                            }), json),
                                      /* extensions */Json_decode$WonderBsJson.optional((function (param) {
                                              return Json_decode$WonderBsJson.field("extensions", (function (json) {
                                                            return /* record */[/* khr_lights */Json_decode$WonderBsJson.optional((function (param) {
                                                                            return Json_decode$WonderBsJson.field("KHR_lights", (function (json) {
                                                                                          return /* record */[/* light */Json_decode$WonderBsJson.field("light", Json_decode$WonderBsJson.$$int, json)];
                                                                                        }), param);
                                                                          }), json)];
                                                          }), param);
                                            }), json)
                                    ];
                            }), param);
              }), json);
}

function convert(json) {
  return /* record */[
          /* asset */_convertAsset(json),
          /* scenes */_convertScenes(json),
          /* scene */Json_decode$WonderBsJson.optional((function (param) {
                  return Json_decode$WonderBsJson.field("scene", Json_decode$WonderBsJson.$$int, param);
                }), json),
          /* images */_convertImages(json),
          /* textures */_convertTextures(json),
          /* samplers */_convertSamplers(json),
          /* buffers */_convertBuffers(json),
          /* bufferViews */_convertBufferViews(json),
          /* accessors */_convertAccessors(json),
          /* cameras */_convertCameras(json),
          /* nodes */_convertNodes(json),
          /* meshes */_convertMeshes(json),
          /* materials */_convertMaterials(json),
          /* extensionsUsed */Json_decode$WonderBsJson.optional((function (param) {
                  return Json_decode$WonderBsJson.field("extensionsUsed", (function (param) {
                                return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.string, param);
                              }), param);
                }), json),
          /* extensions */_convertExtensions(json),
          /* extras */_convertExtras(json)
        ];
}

export {
  _convertAsset ,
  _convertSamplers ,
  _convertBuffers ,
  _convertBufferViews ,
  _convertAccessors ,
  _convertTextures ,
  _convertImages ,
  _convertCustomData ,
  _convertScenes ,
  _convertExtensions ,
  _getScriptMap ,
  _convertExtras ,
  _convertCameras ,
  _convertMeshes ,
  _convertMaterials ,
  _convertNodes ,
  convert ,
  
}
/* No side effect */
