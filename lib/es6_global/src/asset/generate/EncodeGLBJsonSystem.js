

import * as List from "../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Pervasives from "../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as GLTFUtils$Wonderjs from "../utils/GLTFUtils.js";
import * as Json_encode$WonderBsJson from "../../../../../node_modules/wonder-bs-json/lib/es6_global/src/Json_encode.js";
import * as BuildLightDataSystem$Wonderjs from "./BuildLightDataSystem.js";
import * as NameGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/NameGameObjectMainService.js";

function _encodeNodeTransform(param, list) {
  var scale = param[/* scale */4];
  var rotation = param[/* rotation */3];
  var translation = param[/* translation */2];
  var list$1 = translation !== undefined ? /* :: */[
      /* tuple */[
        "translation",
        translation
      ],
      list
    ] : list;
  var list$2 = rotation !== undefined ? /* :: */[
      /* tuple */[
        "rotation",
        rotation
      ],
      list$1
    ] : list$1;
  if (scale !== undefined) {
    return /* :: */[
            /* tuple */[
              "scale",
              scale
            ],
            list$2
          ];
  } else {
    return list$2;
  }
}

function _encodeNodeExtensions(extensions, list) {
  if (extensions !== undefined) {
    var khr_lights = extensions[/* khr_lights */0];
    var extensionList = khr_lights !== undefined ? /* :: */[
        /* tuple */[
          "KHR_lights",
          Json_encode$WonderBsJson.object_(/* :: */[
                /* tuple */[
                  "light",
                  khr_lights[/* light */0]
                ],
                /* [] */0
              ])
        ],
        /* [] */0
      ] : /* [] */0;
    return /* :: */[
            /* tuple */[
              "extensions",
              Json_encode$WonderBsJson.object_(extensionList)
            ],
            list
          ];
  } else {
    return list;
  }
}

function _encodeNodeMaterial(basicMaterial, lightMaterial, extraList) {
  var extraList$1 = basicMaterial !== undefined ? /* :: */[
      /* tuple */[
        "basicMaterial",
        basicMaterial
      ],
      extraList
    ] : extraList;
  if (lightMaterial !== undefined) {
    return /* :: */[
            /* tuple */[
              "lightMaterial",
              lightMaterial
            ],
            extraList$1
          ];
  } else {
    return extraList$1;
  }
}

function _encodeNodeComponentExtra(componentName, component, extraList) {
  if (component !== undefined) {
    return /* :: */[
            /* tuple */[
              componentName,
              component
            ],
            extraList
          ];
  } else {
    return extraList;
  }
}

function _encodeNodeExtras(extras, list) {
  if (extras !== undefined) {
    var match = extras;
    var isRoot = match[/* isRoot */7];
    var isActive = match[/* isActive */6];
    var extraList = _encodeNodeComponentExtra("script", match[/* script */5], _encodeNodeComponentExtra("cameraController", match[/* cameraController */4], _encodeNodeComponentExtra("meshRenderer", match[/* meshRenderer */1], _encodeNodeComponentExtra("basicCameraView", match[/* basicCameraView */0], /* [] */0))));
    var extraList$1 = _encodeNodeMaterial(match[/* basicMaterial */2], match[/* lightMaterial */3], extraList);
    var extraList$2 = isActive !== undefined ? /* :: */[
        /* tuple */[
          "isActive",
          isActive
        ],
        extraList$1
      ] : extraList$1;
    var extraList$3 = isRoot !== undefined ? /* :: */[
        /* tuple */[
          "isRoot",
          isRoot
        ],
        extraList$2
      ] : extraList$2;
    return /* :: */[
            /* tuple */[
              "extras",
              Json_encode$WonderBsJson.object_(extraList$3)
            ],
            list
          ];
  } else {
    return list;
  }
}

function _encodeNodeComponents(param, list) {
  var camera = param[/* camera */6];
  var mesh = param[/* mesh */5];
  var list$1 = mesh !== undefined ? /* :: */[
      /* tuple */[
        "mesh",
        mesh
      ],
      list
    ] : list;
  var list$2 = camera !== undefined ? /* :: */[
      /* tuple */[
        "camera",
        camera
      ],
      list$1
    ] : list$1;
  var list$3 = _encodeNodeExtras(param[/* extras */7], list$2);
  return _encodeNodeExtensions(param[/* extensions */8], list$3);
}

function _encodeNodes(nodeDataArr, state) {
  return /* tuple */[
          "nodes",
          nodeDataArr.map((function (nodeData) {
                  var children = nodeData[/* children */1];
                  var match = NameGameObjectMainService$Wonderjs.getName(nodeData[/* gameObject */0], state);
                  var list = match !== undefined ? /* :: */[
                      /* tuple */[
                        "name",
                        match
                      ],
                      /* [] */0
                    ] : /* [] */0;
                  var list$1 = children !== undefined ? /* :: */[
                      /* tuple */[
                        "children",
                        children
                      ],
                      list
                    ] : list;
                  var list$2 = _encodeNodeComponents(nodeData, _encodeNodeTransform(nodeData, list$1));
                  return Json_encode$WonderBsJson.object_(List.rev(list$2));
                }))
        ];
}

function _encodePerspectiveCamera(param) {
  var aspect = param[/* aspect */3];
  var far = param[/* far */1];
  var perspectiveList_000 = /* tuple */[
    "znear",
    param[/* near */0]
  ];
  var perspectiveList_001 = /* :: */[
    /* tuple */[
      "yfov",
      param[/* fovy */2]
    ],
    /* [] */0
  ];
  var perspectiveList = /* :: */[
    perspectiveList_000,
    perspectiveList_001
  ];
  var perspectiveList$1 = far !== undefined ? /* :: */[
      /* tuple */[
        "zfar",
        far
      ],
      perspectiveList
    ] : perspectiveList;
  if (aspect !== undefined) {
    return /* :: */[
            /* tuple */[
              "aspectRatio",
              aspect
            ],
            perspectiveList$1
          ];
  } else {
    return perspectiveList$1;
  }
}

function _encodeCameras(cameraProjectionDataArr) {
  return /* tuple */[
          "cameras",
          cameraProjectionDataArr.map((function (param) {
                  return Json_encode$WonderBsJson.object_(/* :: */[
                              /* tuple */[
                                "type",
                                param[/* type_ */0]
                              ],
                              /* :: */[
                                /* tuple */[
                                  "perspective",
                                  Json_encode$WonderBsJson.object_(_encodePerspectiveCamera(param[/* perspective */1]))
                                ],
                                /* [] */0
                              ]
                            ]);
                }))
        ];
}

function _encodeBasicCameraViewExtra(basicCameraViewDataArr, extraList) {
  var match = basicCameraViewDataArr.length;
  if (match !== 0) {
    return /* :: */[
            /* tuple */[
              "basicCameraViews",
              basicCameraViewDataArr.map((function (data) {
                      return Json_encode$WonderBsJson.object_(/* :: */[
                                  /* tuple */[
                                    "isActive",
                                    data[/* isActive */0]
                                  ],
                                  /* [] */0
                                ]);
                    }))
            ],
            extraList
          ];
  } else {
    return extraList;
  }
}

function _encodeMeshRendererExtra(meshRendererDataArr, extraList) {
  var match = meshRendererDataArr.length;
  if (match !== 0) {
    return /* :: */[
            /* tuple */[
              "meshRenderers",
              meshRendererDataArr.map((function (data) {
                      return Json_encode$WonderBsJson.object_(/* :: */[
                                  /* tuple */[
                                    "isRender",
                                    data[/* isRender */1]
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      "drawMode",
                                      data[/* drawMode */0]
                                    ],
                                    /* [] */0
                                  ]
                                ]);
                    }))
            ],
            extraList
          ];
  } else {
    return extraList;
  }
}

function _encodeBasicMaterialExtra(basicMaterialDataArr, extraList) {
  var match = basicMaterialDataArr.length;
  if (match !== 0) {
    return /* :: */[
            /* tuple */[
              "basicMaterials",
              basicMaterialDataArr.map((function (data) {
                      var name = data[/* name */1];
                      var colorFactor = data[/* colorFactor */0];
                      var list = colorFactor !== undefined ? /* :: */[
                          /* tuple */[
                            "colorFactor",
                            colorFactor
                          ],
                          /* [] */0
                        ] : /* [] */0;
                      return Json_encode$WonderBsJson.object_(name !== undefined ? /* :: */[
                                    /* tuple */[
                                      "name",
                                      name
                                    ],
                                    list
                                  ] : list);
                    }))
            ],
            extraList
          ];
  } else {
    return extraList;
  }
}

function _encodeArcballCameraControllerExtra(arcballCameraControllerDataArr, extraList) {
  var match = arcballCameraControllerDataArr.length;
  if (match !== 0) {
    return /* :: */[
            /* tuple */[
              "arcballCameraControllers",
              arcballCameraControllerDataArr.map((function (data) {
                      return Json_encode$WonderBsJson.object_(/* :: */[
                                  /* tuple */[
                                    "distance",
                                    data[/* distance */0]
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      "minDistance",
                                      data[/* minDistance */1]
                                    ],
                                    /* :: */[
                                      /* tuple */[
                                        "phi",
                                        data[/* phi */2]
                                      ],
                                      /* :: */[
                                        /* tuple */[
                                          "theta",
                                          data[/* theta */3]
                                        ],
                                        /* :: */[
                                          /* tuple */[
                                            "thetaMargin",
                                            data[/* thetaMargin */4]
                                          ],
                                          /* :: */[
                                            /* tuple */[
                                              "target",
                                              data[/* target */5]
                                            ],
                                            /* :: */[
                                              /* tuple */[
                                                "moveSpeedX",
                                                data[/* moveSpeedX */6]
                                              ],
                                              /* :: */[
                                                /* tuple */[
                                                  "moveSpeedY",
                                                  data[/* moveSpeedY */7]
                                                ],
                                                /* :: */[
                                                  /* tuple */[
                                                    "rotateSpeed",
                                                    data[/* rotateSpeed */8]
                                                  ],
                                                  /* :: */[
                                                    /* tuple */[
                                                      "wheelSpeed",
                                                      data[/* wheelSpeed */9]
                                                    ],
                                                    /* :: */[
                                                      /* tuple */[
                                                        "isBindEvent",
                                                        data[/* isBindEvent */10]
                                                      ],
                                                      /* [] */0
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]
                                          ]
                                        ]
                                      ]
                                    ]
                                  ]
                                ]);
                    }))
            ],
            extraList
          ];
  } else {
    return extraList;
  }
}

function _encodeScriptExtra(scriptDataArr, extraList) {
  var match = scriptDataArr.length;
  if (match !== 0) {
    return /* :: */[
            /* tuple */[
              "scripts",
              scriptDataArr.map((function (data) {
                      return Json_encode$WonderBsJson.object_(/* :: */[
                                  /* tuple */[
                                    "isActive",
                                    data[/* isActive */0]
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      "eventFunctionDataMap",
                                      JSON.parse(data[/* eventFunctionDataMapStr */1])
                                    ],
                                    /* :: */[
                                      /* tuple */[
                                        "attributeMap",
                                        JSON.parse(data[/* attributeMapStr */2])
                                      ],
                                      /* [] */0
                                    ]
                                  ]
                                ]);
                    }))
            ],
            extraList
          ];
  } else {
    return extraList;
  }
}

function _encodeExtras(basicCameraViewDataArr, meshRendererDataArr, basicMaterialDataArr, arcballCameraControllerDataArr, scriptDataArr) {
  return /* tuple */[
          "extras",
          Json_encode$WonderBsJson.object_(_encodeScriptExtra(scriptDataArr, _encodeArcballCameraControllerExtra(arcballCameraControllerDataArr, _encodeBasicMaterialExtra(basicMaterialDataArr, _encodeMeshRendererExtra(meshRendererDataArr, _encodeBasicCameraViewExtra(basicCameraViewDataArr, /* [] */0))))))
        ];
}

function _encodeSceneExtras(imguiData) {
  var match = imguiData[0];
  var extraList;
  var exit = 0;
  if (match !== undefined) {
    var match$1 = imguiData[1];
    if (match$1 !== undefined) {
      extraList = /* :: */[
        /* tuple */[
          "imgui",
          Json_encode$WonderBsJson.object_(/* :: */[
                /* tuple */[
                  "customData",
                  Caml_option.valFromOption(match)
                ],
                /* :: */[
                  /* tuple */[
                    "imguiFunc",
                    match$1
                  ],
                  /* [] */0
                ]
              ])
        ],
        /* [] */0
      ];
    } else {
      exit = 1;
    }
  } else if (imguiData[1] !== undefined) {
    exit = 1;
  } else {
    extraList = /* [] */0;
  }
  if (exit === 1) {
    extraList = Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_encodeScenes", "imguiData error", "", "", ""));
  }
  return /* :: */[
          /* tuple */[
            "extras",
            Json_encode$WonderBsJson.object_(extraList)
          ],
          /* [] */0
        ];
}

function _encodeScenes(extensionsUsedArr, param, state) {
  var list_000 = /* tuple */[
    "nodes",
    /* array */[0]
  ];
  var list = /* :: */[
    list_000,
    /* [] */0
  ];
  var match = extensionsUsedArr.includes("KHR_lights");
  var list$1 = match ? /* :: */[
      /* tuple */[
        "extensions",
        Json_encode$WonderBsJson.object_(/* :: */[
              /* tuple */[
                "KHR_lights",
                Json_encode$WonderBsJson.object_(/* :: */[
                      /* tuple */[
                        "light",
                        BuildLightDataSystem$Wonderjs.getAmbientLightIndex(param[0])
                      ],
                      /* [] */0
                    ])
              ],
              /* [] */0
            ])
      ],
      list
    ] : list;
  var list$2 = Pervasives.$at(list$1, _encodeSceneExtras(param[1]));
  return /* tuple */[
          "scenes",
          /* array */[Json_encode$WonderBsJson.object_(list$2)]
        ];
}

function _encodeLightMaterials(materialDataArr) {
  return /* tuple */[
          "materials",
          materialDataArr.map((function (param) {
                  var name = param[/* name */2];
                  var baseColorTexture = param[/* baseColorTexture */1];
                  var baseColorFactor = param[/* baseColorFactor */0];
                  var list = name !== undefined ? /* :: */[
                      /* tuple */[
                        "name",
                        name
                      ],
                      /* [] */0
                    ] : /* [] */0;
                  var pbrMetallicRoughnessList = baseColorFactor !== undefined ? /* :: */[
                      /* tuple */[
                        "baseColorFactor",
                        baseColorFactor
                      ],
                      /* [] */0
                    ] : /* [] */0;
                  var pbrMetallicRoughnessList$1 = baseColorTexture !== undefined ? /* :: */[
                      /* tuple */[
                        "baseColorTexture",
                        Json_encode$WonderBsJson.object_(/* :: */[
                              /* tuple */[
                                "index",
                                baseColorTexture
                              ],
                              /* [] */0
                            ])
                      ],
                      pbrMetallicRoughnessList
                    ] : pbrMetallicRoughnessList;
                  var list_000 = /* tuple */[
                    "pbrMetallicRoughness",
                    Json_encode$WonderBsJson.object_(pbrMetallicRoughnessList$1)
                  ];
                  var list$1 = /* :: */[
                    list_000,
                    list
                  ];
                  return Json_encode$WonderBsJson.object_(List.rev(list$1));
                }))
        ];
}

function _encodeTextures(textureDataArr) {
  return /* tuple */[
          "textures",
          textureDataArr.map((function (param) {
                  var name = param[/* name */0];
                  var list = name !== undefined ? /* :: */[
                      /* tuple */[
                        "name",
                        name
                      ],
                      /* [] */0
                    ] : /* [] */0;
                  var list_000 = /* tuple */[
                    "sampler",
                    param[/* sampler */1]
                  ];
                  var list_001 = /* :: */[
                    /* tuple */[
                      "source",
                      param[/* source */2]
                    ],
                    list
                  ];
                  var list$1 = /* :: */[
                    list_000,
                    list_001
                  ];
                  var extraList_000 = /* tuple */[
                    "flipY",
                    param[/* flipY */3]
                  ];
                  var extraList = /* :: */[
                    extraList_000,
                    /* [] */0
                  ];
                  return Json_encode$WonderBsJson.object_(/* :: */[
                              /* tuple */[
                                "extras",
                                Json_encode$WonderBsJson.object_(extraList)
                              ],
                              list$1
                            ]);
                }))
        ];
}

function _encodeSamplers(samplerDataArr) {
  return /* tuple */[
          "samplers",
          samplerDataArr.map((function (param) {
                  return Json_encode$WonderBsJson.object_(/* :: */[
                              /* tuple */[
                                "wrapS",
                                param[/* wrapS */0]
                              ],
                              /* :: */[
                                /* tuple */[
                                  "wrapT",
                                  param[/* wrapT */1]
                                ],
                                /* :: */[
                                  /* tuple */[
                                    "magFilter",
                                    param[/* magFilter */2]
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      "minFilter",
                                      param[/* minFilter */3]
                                    ],
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ]);
                }))
        ];
}

function _encodeImages(imageUint8DataArr) {
  return /* tuple */[
          "images",
          imageUint8DataArr.map((function (param) {
                  var name = param[/* name */0];
                  var list_000 = /* tuple */[
                    "bufferView",
                    param[/* bufferView */1]
                  ];
                  var list_001 = /* :: */[
                    /* tuple */[
                      "mimeType",
                      param[/* mimeType */2]
                    ],
                    /* [] */0
                  ];
                  var list = /* :: */[
                    list_000,
                    list_001
                  ];
                  return Json_encode$WonderBsJson.object_(name !== undefined ? /* :: */[
                                /* tuple */[
                                  "name",
                                  name
                                ],
                                list
                              ] : list);
                }))
        ];
}

function _encodeAttributes(position, normal, texCoord_0, indices) {
  var attributesList_000 = /* tuple */[
    "POSITION",
    position
  ];
  var attributesList = /* :: */[
    attributesList_000,
    /* [] */0
  ];
  var attributesList$1 = normal !== undefined ? /* :: */[
      /* tuple */[
        "NORMAL",
        normal
      ],
      attributesList
    ] : attributesList;
  var attributesList$2 = texCoord_0 !== undefined ? /* :: */[
      /* tuple */[
        "TEXCOORD_0",
        texCoord_0
      ],
      attributesList$1
    ] : attributesList$1;
  return /* :: */[
          /* tuple */[
            "attributes",
            Json_encode$WonderBsJson.object_(List.rev(attributesList$2))
          ],
          /* :: */[
            /* tuple */[
              "indices",
              indices
            ],
            /* [] */0
          ]
        ];
}

function _encodeMeshes(meshDataArr) {
  return /* tuple */[
          "meshes",
          meshDataArr.map((function (param) {
                  var primitives = param[/* primitives */0];
                  var attributes = primitives[/* attributes */0];
                  var material = primitives[/* material */2];
                  var name = param[/* name */1];
                  var primitivesList = _encodeAttributes(attributes[/* position */0], attributes[/* normal */1], attributes[/* texCoord_0 */2], primitives[/* indices */1]);
                  var primitivesList$1 = material !== undefined ? List.append(/* :: */[
                          /* tuple */[
                            "material",
                            material
                          ],
                          /* [] */0
                        ], primitivesList) : primitivesList;
                  var primitives_001 = /* array */[Json_encode$WonderBsJson.object_(primitivesList$1)];
                  var primitives$1 = /* tuple */[
                    "primitives",
                    primitives_001
                  ];
                  if (name !== undefined) {
                    return Json_encode$WonderBsJson.object_(/* :: */[
                                primitives$1,
                                /* :: */[
                                  /* tuple */[
                                    "name",
                                    name
                                  ],
                                  /* [] */0
                                ]
                              ]);
                  } else {
                    return Json_encode$WonderBsJson.object_(/* :: */[
                                primitives$1,
                                /* [] */0
                              ]);
                  }
                }))
        ];
}

function _encodeExtensionsUsed(extensionsUsedArr) {
  return /* tuple */[
          "extensionsUsedArr",
          extensionsUsedArr
        ];
}

function _encodeLights(param) {
  var range = param[/* range */6];
  var quadraticAttenuation = param[/* quadraticAttenuation */5];
  var linearAttenuation = param[/* linearAttenuation */4];
  var constantAttenuation = param[/* constantAttenuation */3];
  var intensity = param[/* intensity */2];
  var color = param[/* color */1];
  var khrLightsExtensionList_000 = /* tuple */[
    "type",
    param[/* type_ */0]
  ];
  var khrLightsExtensionList = /* :: */[
    khrLightsExtensionList_000,
    /* [] */0
  ];
  var khrLightsExtensionList$1 = color !== undefined ? /* :: */[
      /* tuple */[
        "color",
        color
      ],
      khrLightsExtensionList
    ] : khrLightsExtensionList;
  var khrLightsExtensionList$2 = intensity !== undefined ? /* :: */[
      /* tuple */[
        "intensity",
        intensity
      ],
      khrLightsExtensionList$1
    ] : khrLightsExtensionList$1;
  var khrLightsExtensionList$3 = constantAttenuation !== undefined ? /* :: */[
      /* tuple */[
        "constantAttenuation",
        constantAttenuation
      ],
      khrLightsExtensionList$2
    ] : khrLightsExtensionList$2;
  var khrLightsExtensionList$4 = linearAttenuation !== undefined ? /* :: */[
      /* tuple */[
        "linearAttenuation",
        linearAttenuation
      ],
      khrLightsExtensionList$3
    ] : khrLightsExtensionList$3;
  var khrLightsExtensionList$5 = quadraticAttenuation !== undefined ? /* :: */[
      /* tuple */[
        "quadraticAttenuation",
        quadraticAttenuation
      ],
      khrLightsExtensionList$4
    ] : khrLightsExtensionList$4;
  if (range !== undefined) {
    return /* :: */[
            /* tuple */[
              "range",
              range
            ],
            khrLightsExtensionList$5
          ];
  } else {
    return khrLightsExtensionList$5;
  }
}

function _encodeExtensions(lightDataArr) {
  return /* tuple */[
          "extensions",
          Json_encode$WonderBsJson.object_(/* :: */[
                /* tuple */[
                  "KHR_lights",
                  Json_encode$WonderBsJson.object_(/* :: */[
                        /* tuple */[
                          "lights",
                          lightDataArr.map((function (lightData) {
                                  return Json_encode$WonderBsJson.object_(_encodeLights(lightData));
                                }))
                        ],
                        /* [] */0
                      ])
                ],
                /* [] */0
              ])
        ];
}

function _encodeBuffers(totalByteLength) {
  return /* tuple */[
          "buffers",
          /* array */[Json_encode$WonderBsJson.object_(/* :: */[
                  /* tuple */[
                    "byteLength",
                    totalByteLength
                  ],
                  /* [] */0
                ])]
        ];
}

function _encodeBufferViews(bufferViewDataArr) {
  return /* tuple */[
          "bufferViews",
          bufferViewDataArr.map((function (param) {
                  return Json_encode$WonderBsJson.object_(/* :: */[
                              /* tuple */[
                                "buffer",
                                param[/* buffer */0]
                              ],
                              /* :: */[
                                /* tuple */[
                                  "byteOffset",
                                  param[/* byteOffset */1]
                                ],
                                /* :: */[
                                  /* tuple */[
                                    "byteLength",
                                    param[/* byteLength */2]
                                  ],
                                  /* [] */0
                                ]
                              ]
                            ]);
                }))
        ];
}

function _encodeAccessors(accessorDataArr) {
  return /* tuple */[
          "accessors",
          accessorDataArr.map((function (param) {
                  return Json_encode$WonderBsJson.object_(/* :: */[
                              /* tuple */[
                                "bufferView",
                                param[/* bufferView */0]
                              ],
                              /* :: */[
                                /* tuple */[
                                  "componentType",
                                  param[/* componentType */1]
                                ],
                                /* :: */[
                                  /* tuple */[
                                    "count",
                                    param[/* count */2]
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      "type",
                                      param[/* type_ */3]
                                    ],
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ]);
                }))
        ];
}

function _encodeAsset(param) {
  return /* tuple */[
          "asset",
          Json_encode$WonderBsJson.object_(/* :: */[
                /* tuple */[
                  "version",
                  "2.0"
                ],
                /* :: */[
                  /* tuple */[
                    "generator",
                    GLTFUtils$Wonderjs.getGenerator(/* () */0)
                  ],
                  /* [] */0
                ]
              ])
        ];
}

function _hasExtensions(lightDataArr) {
  return lightDataArr.length > 0;
}

function encode(totalByteLength, param, state) {
  var extensionsUsedArr = param[16];
  var lightDataArr = param[13];
  var list_000 = _encodeAsset(/* () */0);
  var list_001 = /* :: */[
    /* tuple */[
      "scene",
      0
    ],
    /* :: */[
      _encodeScenes(extensionsUsedArr, /* tuple */[
            lightDataArr,
            param[15]
          ], state),
      /* :: */[
        _encodeCameras(param[11]),
        /* :: */[
          _encodeExtras(param[10], param[4], param[5], param[12], param[14]),
          /* :: */[
            _encodeNodes(param[0], state),
            /* :: */[
              _encodeLightMaterials(param[6]),
              /* :: */[
                _encodeTextures(param[7]),
                /* :: */[
                  _encodeSamplers(param[8]),
                  /* :: */[
                    _encodeImages(param[9]),
                    /* :: */[
                      _encodeBuffers(totalByteLength),
                      /* :: */[
                        _encodeBufferViews(param[1]),
                        /* :: */[
                          _encodeAccessors(param[2]),
                          /* :: */[
                            _encodeMeshes(param[3]),
                            /* [] */0
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ];
  var list = /* :: */[
    list_000,
    list_001
  ];
  var match = extensionsUsedArr.length > 0;
  var list$1 = match ? /* :: */[
      /* tuple */[
        "extensionsUsedArr",
        extensionsUsedArr
      ],
      list
    ] : list;
  var match$1 = lightDataArr.length > 0;
  return Json_encode$WonderBsJson.object_(match$1 ? /* :: */[
                _encodeExtensions(lightDataArr),
                list$1
              ] : list$1);
}

export {
  _encodeNodeTransform ,
  _encodeNodeExtensions ,
  _encodeNodeMaterial ,
  _encodeNodeComponentExtra ,
  _encodeNodeExtras ,
  _encodeNodeComponents ,
  _encodeNodes ,
  _encodePerspectiveCamera ,
  _encodeCameras ,
  _encodeBasicCameraViewExtra ,
  _encodeMeshRendererExtra ,
  _encodeBasicMaterialExtra ,
  _encodeArcballCameraControllerExtra ,
  _encodeScriptExtra ,
  _encodeExtras ,
  _encodeSceneExtras ,
  _encodeScenes ,
  _encodeLightMaterials ,
  _encodeTextures ,
  _encodeSamplers ,
  _encodeImages ,
  _encodeAttributes ,
  _encodeMeshes ,
  _encodeExtensionsUsed ,
  _encodeLights ,
  _encodeExtensions ,
  _encodeBuffers ,
  _encodeBufferViews ,
  _encodeAccessors ,
  _encodeAsset ,
  _hasExtensions ,
  encode ,
  
}
/* Log-WonderLog Not a pure module */
