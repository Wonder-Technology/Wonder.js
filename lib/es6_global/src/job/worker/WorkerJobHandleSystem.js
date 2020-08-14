

import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as JobService$Wonderjs from "../../service/primitive/job/JobService.js";
import * as HandleJobService$Wonderjs from "../../service/primitive/job/HandleJobService.js";
import * as TickMainWorkerJob$Wonderjs from "./main/loop/TickMainWorkerJob.js";
import * as CommitRenderWorkerJob$Wonderjs from "./render/draw/CommitRenderWorkerJob.js";
import * as InitEventMainWorkerJob$Wonderjs from "./main/init/InitEventMainWorkerJob.js";
import * as InitIMGUIMainWorkerJob$Wonderjs from "./main/init/InitIMGUIMainWorkerJob.js";
import * as CreateGlRenderWorkerJob$Wonderjs from "./render/init/CreateGlRenderWorkerJob.js";
import * as DetectGlRenderWorkerJob$Wonderjs from "./render/init/DetectGlRenderWorkerJob.js";
import * as InitCameraMainWorkerJob$Wonderjs from "./main/init/InitCameraMainWorkerJob.js";
import * as InitScriptMainWorkerJob$Wonderjs from "./main/init/InitScriptMainWorkerJob.js";
import * as InitIMGUIRenderWorkerJob$Wonderjs from "./render/init/InitIMGUIRenderWorkerJob.js";
import * as InitStateRenderWorkerJob$Wonderjs from "./render/init/InitStateRenderWorkerJob.js";
import * as SendJobDataMainWorkerJob$Wonderjs from "./main/init/SendJobDataMainWorkerJob.js";
import * as ClearColorRenderWorkerJob$Wonderjs from "./render/draw/ClearColorRenderWorkerJob.js";
import * as CreateCanvasMainWorkerJob$Wonderjs from "./main/init/CreateCanvasMainWorkerJob.js";
import * as DisposeVboRenderWorkerJob$Wonderjs from "./render/dispose/DisposeVboRenderWorkerJob.js";
import * as UpdateCameraMainWorkerJob$Wonderjs from "./main/loop/UpdateCameraMainWorkerJob.js";
import * as UpdateScriptMainWorkerJob$Wonderjs from "./main/loop/UpdateScriptMainWorkerJob.js";
import * as ClearBufferRenderWorkerJob$Wonderjs from "./render/draw/ClearBufferRenderWorkerJob.js";
import * as CopyTransformMainWorkerJob$Wonderjs from "./main/loop/CopyTransformMainWorkerJob.js";
import * as GetCameraDataMainWorkerJob$Wonderjs from "./main/loop/GetCameraDataMainWorkerJob.js";
import * as InitTextureRenderWorkerJob$Wonderjs from "./render/init/InitTextureRenderWorkerJob.js";
import * as RenderBasicRenderWorkerJob$Wonderjs from "./render/draw/render_basic/RenderBasicRenderWorkerJob.js";
import * as RenderIMGUIRenderWorkerJob$Wonderjs from "./render/draw/RenderIMGUIRenderWorkerJob.js";
import * as SetFullScreenMainWorkerJob$Wonderjs from "./main/init/SetFullScreenMainWorkerJob.js";
import * as SetViewportRenderWorkerJob$Wonderjs from "./render/init/SetViewportRenderWorkerJob.js";
import * as InitGeometryRenderWorkerJob$Wonderjs from "./render/init/InitGeometryRenderWorkerJob.js";
import * as InitInstanceRenderWorkerJob$Wonderjs from "./render/init/InitInstanceRenderWorkerJob.js";
import * as SendRenderDataMainWorkerJob$Wonderjs from "./main/loop/SendRenderDataMainWorkerJob.js";
import * as GetCameraDataRenderWorkerJob$Wonderjs from "./render/draw/GetCameraDataRenderWorkerJob.js";
import * as GetCustomDataRenderWorkerJob$Wonderjs from "./render/draw/GetCustomDataRenderWorkerJob.js";
import * as GetRenderDataRenderWorkerJob$Wonderjs from "./render/draw/GetRenderDataRenderWorkerJob.js";
import * as InitTransformRenderWorkerJob$Wonderjs from "./render/init/InitTransformRenderWorkerJob.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as UpdateTransformMainWorkerJob$Wonderjs from "./main/loop/UpdateTransformMainWorkerJob.js";
import * as DisposeTextureRenderWorkerJob$Wonderjs from "./render/dispose/DisposeTextureRenderWorkerJob.js";
import * as GetDisposeDataRenderWorkerJob$Wonderjs from "./render/dispose/GetDisposeDataRenderWorkerJob.js";
import * as GetIsDebugDataRenderWorkerJob$Wonderjs from "./render/init/GetIsDebugDataRenderWorkerJob.js";
import * as GetSettingDataRenderWorkerJob$Wonderjs from "./render/init/GetSettingDataRenderWorkerJob.js";
import * as InitPointLightRenderWorkerJob$Wonderjs from "./render/init/InitPointLightRenderWorkerJob.js";
import * as PregetGLSLDataRenderWorkerJob$Wonderjs from "./render/init/PregetGLSLDataRenderWorkerJob.js";
import * as DetectEnvironmentMainWorkerJob$Wonderjs from "./main/init/DetectEnvironmentMainWorkerJob.js";
import * as GetGeometryDataRenderWorkerJob$Wonderjs from "./render/draw/GetGeometryDataRenderWorkerJob.js";
import * as GetInstanceDataRenderWorkerJob$Wonderjs from "./render/draw/GetInstanceDataRenderWorkerJob.js";
import * as GetMaterialDataRenderWorkerJob$Wonderjs from "./render/init/GetMaterialDataRenderWorkerJob.js";
import * as FrontRenderLightRenderWorkerJob$Wonderjs from "./render/draw/front_render_light/FrontRenderLightRenderWorkerJob.js";
import * as InitMeshRendererRenderWorkerJob$Wonderjs from "./render/init/InitMeshRendererRenderWorkerJob.js";
import * as SendInitRenderDataMainWorkerJob$Wonderjs from "./main/init/SendInitRenderDataMainWorkerJob.js";
import * as GetFinishRenderDataMainWorkerJob$Wonderjs from "./main/loop/GetFinishRenderDataMainWorkerJob.js";
import * as GetInitRenderDataRenderWorkerJob$Wonderjs from "./render/init/GetInitRenderDataRenderWorkerJob.js";
import * as GetPointLightDataRenderWorkerJob$Wonderjs from "./render/draw/GetPointLightDataRenderWorkerJob.js";
import * as InitBasicMaterialRenderWorkerJob$Wonderjs from "./render/init/InitBasicMaterialRenderWorkerJob.js";
import * as InitLightMaterialRenderWorkerJob$Wonderjs from "./render/init/InitLightMaterialRenderWorkerJob.js";
import * as ReallocateCPUMemoryMainWorkerJob$Wonderjs from "./main/loop/ReallocateCPUMemoryMainWorkerJob.js";
import * as CreateWorkerInstanceMainWorkerJob$Wonderjs from "./main/init/CreateWorkerInstanceMainWorkerJob.js";
import * as GetFinishDisposeDataMainWorkerJob$Wonderjs from "./main/loop/GetFinishDisposeDataMainWorkerJob.js";
import * as GetFinishSendJobDataMainWorkerJob$Wonderjs from "./main/init/GetFinishSendJobDataMainWorkerJob.js";
import * as InitDirectionLightRenderWorkerJob$Wonderjs from "./render/init/InitDirectionLightRenderWorkerJob.js";
import * as GetAmbientLightDataRenderWorkerJob$Wonderjs from "./render/draw/GetAmbientLightDataRenderWorkerJob.js";
import * as GetRenderConfigDataRenderWorkerJob$Wonderjs from "./render/init/GetRenderConfigDataRenderWorkerJob.js";
import * as GetWorkerDetectDataRenderWorkerJob$Wonderjs from "./render/init/GetWorkerDetectDataRenderWorkerJob.js";
import * as GetBrowserDetectDataRenderWorkerJob$Wonderjs from "./render/init/GetBrowserDetectDataRenderWorkerJob.js";
import * as InitTextureForRenderRenderWorkerJob$Wonderjs from "./render/draw/InitTextureForRenderRenderWorkerJob.js";
import * as SendFinishRenderDataRenderWorkerJob$Wonderjs from "./render/draw/SendFinishRenderDataRenderWorkerJob.js";
import * as DisposeSourceInstanceRenderWorkerJob$Wonderjs from "./render/dispose/DisposeSourceInstanceRenderWorkerJob.js";
import * as GetDirectionLightDataRenderWorkerJob$Wonderjs from "./render/draw/GetDirectionLightDataRenderWorkerJob.js";
import * as GetFinishInitRenderDataMainWorkerJob$Wonderjs from "./main/init/GetFinishInitRenderDataMainWorkerJob.js";
import * as InitMaterialForRenderRenderWorkerJob$Wonderjs from "./render/draw/InitMaterialForRenderRenderWorkerJob.js";
import * as SendFinishDisposeDataRenderWorkerJob$Wonderjs from "./render/dispose/SendFinishDisposeDataRenderWorkerJob.js";
import * as SendFinishSendJobDataRenderWorkerJob$Wonderjs from "./render/init/SendFinishSendJobDataRenderWorkerJob.js";
import * as SendUniformShaderDataRenderWorkerJob$Wonderjs from "./render/draw/SendUniformShaderDataRenderWorkerJob.js";
import * as ClearLastSendComponentRenderWorkerJob$Wonderjs from "./render/draw/ClearLastSendComponentRenderWorkerJob.js";
import * as DisposeAndSendDisposeDataMainWorkerJob$Wonderjs from "./main/loop/DisposeAndSendDisposeDataMainWorkerJob.js";
import * as SendFinishInitRenderDataRenderWorkerJob$Wonderjs from "./render/init/SendFinishInitRenderDataRenderWorkerJob.js";
import * as CreateBasicRenderObjectBufferMainWorkerJob$Wonderjs from "./main/loop/CreateBasicRenderObjectBufferMainWorkerJob.js";
import * as CreateLightRenderObjectBufferMainWorkerJob$Wonderjs from "./main/loop/CreateLightRenderObjectBufferMainWorkerJob.js";
import * as CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs from "./render/draw/CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.js";
import * as CreateLightRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs from "./render/draw/CreateLightRenderObjectBufferTypeArrayRenderWorkerJob.js";

function _getMainInitJobHandles(param) {
  return /* :: */[
          /* tuple */[
            "detect_environment",
            DetectEnvironmentMainWorkerJob$Wonderjs.execJob
          ],
          /* :: */[
            /* tuple */[
              "init_imgui",
              InitIMGUIMainWorkerJob$Wonderjs.execJob
            ],
            /* :: */[
              /* tuple */[
                "init_event",
                InitEventMainWorkerJob$Wonderjs.execJob
              ],
              /* :: */[
                /* tuple */[
                  "init_script",
                  InitScriptMainWorkerJob$Wonderjs.execJob
                ],
                /* :: */[
                  /* tuple */[
                    "init_camera",
                    InitCameraMainWorkerJob$Wonderjs.execJob
                  ],
                  /* :: */[
                    /* tuple */[
                      "create_worker_instance",
                      CreateWorkerInstanceMainWorkerJob$Wonderjs.execJob
                    ],
                    /* :: */[
                      /* tuple */[
                        "send_job_data",
                        SendJobDataMainWorkerJob$Wonderjs.execJob
                      ],
                      /* :: */[
                        /* tuple */[
                          "create_canvas",
                          CreateCanvasMainWorkerJob$Wonderjs.execJob
                        ],
                        /* :: */[
                          /* tuple */[
                            "set_full_screen",
                            SetFullScreenMainWorkerJob$Wonderjs.execJob
                          ],
                          /* :: */[
                            /* tuple */[
                              "get_finish_send_job_data",
                              GetFinishSendJobDataMainWorkerJob$Wonderjs.execJob
                            ],
                            /* :: */[
                              /* tuple */[
                                "send_init_render_data",
                                SendInitRenderDataMainWorkerJob$Wonderjs.execJob
                              ],
                              /* :: */[
                                /* tuple */[
                                  "get_finish_init_render_data",
                                  GetFinishInitRenderDataMainWorkerJob$Wonderjs.execJob
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
          ]
        ];
}

function _getMainLoopJobHandles(param) {
  return /* :: */[
          /* tuple */[
            "tick",
            TickMainWorkerJob$Wonderjs.execJob
          ],
          /* :: */[
            /* tuple */[
              "update_transform",
              UpdateTransformMainWorkerJob$Wonderjs.execJob
            ],
            /* :: */[
              /* tuple */[
                "update_camera",
                UpdateCameraMainWorkerJob$Wonderjs.execJob
              ],
              /* :: */[
                /* tuple */[
                  "update_script",
                  UpdateScriptMainWorkerJob$Wonderjs.execJob
                ],
                /* :: */[
                  /* tuple */[
                    "get_camera_data",
                    GetCameraDataMainWorkerJob$Wonderjs.execJob
                  ],
                  /* :: */[
                    /* tuple */[
                      "dispose_and_send_dispose_data",
                      DisposeAndSendDisposeDataMainWorkerJob$Wonderjs.execJob
                    ],
                    /* :: */[
                      /* tuple */[
                        "reallocate_cpu_memory",
                        ReallocateCPUMemoryMainWorkerJob$Wonderjs.execJob
                      ],
                      /* :: */[
                        /* tuple */[
                          "create_basic_render_object_buffer",
                          CreateBasicRenderObjectBufferMainWorkerJob$Wonderjs.execJob
                        ],
                        /* :: */[
                          /* tuple */[
                            "create_light_render_object_buffer",
                            CreateLightRenderObjectBufferMainWorkerJob$Wonderjs.execJob
                          ],
                          /* :: */[
                            /* tuple */[
                              "send_render_data",
                              SendRenderDataMainWorkerJob$Wonderjs.execJob
                            ],
                            /* :: */[
                              /* tuple */[
                                "copy_transform",
                                CopyTransformMainWorkerJob$Wonderjs.execJob
                              ],
                              /* :: */[
                                /* tuple */[
                                  "get_finish_render_data",
                                  GetFinishRenderDataMainWorkerJob$Wonderjs.execJob
                                ],
                                /* :: */[
                                  /* tuple */[
                                    "get_finish_dispose_data",
                                    GetFinishDisposeDataMainWorkerJob$Wonderjs.execJob
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
            ]
          ]
        ];
}

function _getWorkerJobHandles(param) {
  return /* :: */[
          /* tuple */[
            "send_finish_send_job_data",
            SendFinishSendJobDataRenderWorkerJob$Wonderjs.execJob
          ],
          /* :: */[
            /* tuple */[
              "get_init_render_data",
              GetInitRenderDataRenderWorkerJob$Wonderjs.execJob
            ],
            /* :: */[
              /* tuple */[
                "get_isDebug_data",
                GetIsDebugDataRenderWorkerJob$Wonderjs.execJob
              ],
              /* :: */[
                /* tuple */[
                  "get_renderConfig_data",
                  GetRenderConfigDataRenderWorkerJob$Wonderjs.execJob
                ],
                /* :: */[
                  /* tuple */[
                    "get_setting_data",
                    GetSettingDataRenderWorkerJob$Wonderjs.execJob
                  ],
                  /* :: */[
                    /* tuple */[
                      "get_material_data",
                      GetMaterialDataRenderWorkerJob$Wonderjs.execJob
                    ],
                    /* :: */[
                      /* tuple */[
                        "get_browserDetect_data",
                        GetBrowserDetectDataRenderWorkerJob$Wonderjs.execJob
                      ],
                      /* :: */[
                        /* tuple */[
                          "get_workerDetect_data",
                          GetWorkerDetectDataRenderWorkerJob$Wonderjs.execJob
                        ],
                        /* :: */[
                          /* tuple */[
                            "preget_glslData",
                            PregetGLSLDataRenderWorkerJob$Wonderjs.execJob
                          ],
                          /* :: */[
                            /* tuple */[
                              "create_gl",
                              CreateGlRenderWorkerJob$Wonderjs.execJob
                            ],
                            /* :: */[
                              /* tuple */[
                                "set_viewport",
                                SetViewportRenderWorkerJob$Wonderjs.execJob
                              ],
                              /* :: */[
                                /* tuple */[
                                  "detect_gl",
                                  DetectGlRenderWorkerJob$Wonderjs.execJob
                                ],
                                /* :: */[
                                  /* tuple */[
                                    "preget_glslData",
                                    PregetGLSLDataRenderWorkerJob$Wonderjs.execJob
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      "init_state",
                                      InitStateRenderWorkerJob$Wonderjs.execJob
                                    ],
                                    /* :: */[
                                      /* tuple */[
                                        "init_transform",
                                        InitTransformRenderWorkerJob$Wonderjs.execJob
                                      ],
                                      /* :: */[
                                        /* tuple */[
                                          "init_instance",
                                          InitInstanceRenderWorkerJob$Wonderjs.execJob
                                        ],
                                        /* :: */[
                                          /* tuple */[
                                            "init_geometry",
                                            InitGeometryRenderWorkerJob$Wonderjs.execJob
                                          ],
                                          /* :: */[
                                            /* tuple */[
                                              "init_meshRenderer",
                                              InitMeshRendererRenderWorkerJob$Wonderjs.execJob
                                            ],
                                            /* :: */[
                                              /* tuple */[
                                                "init_basic_material",
                                                InitBasicMaterialRenderWorkerJob$Wonderjs.execJob
                                              ],
                                              /* :: */[
                                                /* tuple */[
                                                  "init_direction_light",
                                                  InitDirectionLightRenderWorkerJob$Wonderjs.execJob
                                                ],
                                                /* :: */[
                                                  /* tuple */[
                                                    "init_point_light",
                                                    InitPointLightRenderWorkerJob$Wonderjs.execJob
                                                  ],
                                                  /* :: */[
                                                    /* tuple */[
                                                      "init_light_material",
                                                      InitLightMaterialRenderWorkerJob$Wonderjs.execJob
                                                    ],
                                                    /* :: */[
                                                      /* tuple */[
                                                        "init_texture",
                                                        InitTextureRenderWorkerJob$Wonderjs.execJob
                                                      ],
                                                      /* :: */[
                                                        /* tuple */[
                                                          "init_imgui",
                                                          InitIMGUIRenderWorkerJob$Wonderjs.execJob
                                                        ],
                                                        /* :: */[
                                                          /* tuple */[
                                                            "send_finish_init_render_data",
                                                            SendFinishInitRenderDataRenderWorkerJob$Wonderjs.execJob
                                                          ],
                                                          /* :: */[
                                                            /* tuple */[
                                                              "get_render_data",
                                                              GetRenderDataRenderWorkerJob$Wonderjs.execJob
                                                            ],
                                                            /* :: */[
                                                              /* tuple */[
                                                                "get_instance_data",
                                                                GetInstanceDataRenderWorkerJob$Wonderjs.execJob
                                                              ],
                                                              /* :: */[
                                                                /* tuple */[
                                                                  "get_geometry_data",
                                                                  GetGeometryDataRenderWorkerJob$Wonderjs.execJob
                                                                ],
                                                                /* :: */[
                                                                  /* tuple */[
                                                                    "get_ambient_light_data",
                                                                    GetAmbientLightDataRenderWorkerJob$Wonderjs.execJob
                                                                  ],
                                                                  /* :: */[
                                                                    /* tuple */[
                                                                      "get_direction_light_data",
                                                                      GetDirectionLightDataRenderWorkerJob$Wonderjs.execJob
                                                                    ],
                                                                    /* :: */[
                                                                      /* tuple */[
                                                                        "get_point_light_data",
                                                                        GetPointLightDataRenderWorkerJob$Wonderjs.execJob
                                                                      ],
                                                                      /* :: */[
                                                                        /* tuple */[
                                                                          "init_material_for_render",
                                                                          InitMaterialForRenderRenderWorkerJob$Wonderjs.execJob
                                                                        ],
                                                                        /* :: */[
                                                                          /* tuple */[
                                                                            "init_texture_for_render",
                                                                            InitTextureForRenderRenderWorkerJob$Wonderjs.execJob
                                                                          ],
                                                                          /* :: */[
                                                                            /* tuple */[
                                                                              "clear_color",
                                                                              ClearColorRenderWorkerJob$Wonderjs.execJob
                                                                            ],
                                                                            /* :: */[
                                                                              /* tuple */[
                                                                                "clear_buffer",
                                                                                ClearBufferRenderWorkerJob$Wonderjs.execJob
                                                                              ],
                                                                              /* :: */[
                                                                                /* tuple */[
                                                                                  "clear_last_send_component",
                                                                                  ClearLastSendComponentRenderWorkerJob$Wonderjs.execJob
                                                                                ],
                                                                                /* :: */[
                                                                                  /* tuple */[
                                                                                    "create_basic_render_object_typeArray",
                                                                                    CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs.execJob
                                                                                  ],
                                                                                  /* :: */[
                                                                                    /* tuple */[
                                                                                      "create_light_render_object_typeArray",
                                                                                      CreateLightRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs.execJob
                                                                                    ],
                                                                                    /* :: */[
                                                                                      /* tuple */[
                                                                                        "get_custom_data",
                                                                                        GetCustomDataRenderWorkerJob$Wonderjs.execJob
                                                                                      ],
                                                                                      /* :: */[
                                                                                        /* tuple */[
                                                                                          "get_camera_data",
                                                                                          GetCameraDataRenderWorkerJob$Wonderjs.execJob
                                                                                        ],
                                                                                        /* :: */[
                                                                                          /* tuple */[
                                                                                            "send_uniform_shader_data",
                                                                                            SendUniformShaderDataRenderWorkerJob$Wonderjs.execJob
                                                                                          ],
                                                                                          /* :: */[
                                                                                            /* tuple */[
                                                                                              "render_basic",
                                                                                              RenderBasicRenderWorkerJob$Wonderjs.execJob
                                                                                            ],
                                                                                            /* :: */[
                                                                                              /* tuple */[
                                                                                                "front_render_light",
                                                                                                FrontRenderLightRenderWorkerJob$Wonderjs.execJob
                                                                                              ],
                                                                                              /* :: */[
                                                                                                /* tuple */[
                                                                                                  "render_imgui",
                                                                                                  RenderIMGUIRenderWorkerJob$Wonderjs.execJob
                                                                                                ],
                                                                                                /* :: */[
                                                                                                  /* tuple */[
                                                                                                    "commit",
                                                                                                    CommitRenderWorkerJob$Wonderjs.execJob
                                                                                                  ],
                                                                                                  /* :: */[
                                                                                                    /* tuple */[
                                                                                                      "send_finish_render_data",
                                                                                                      SendFinishRenderDataRenderWorkerJob$Wonderjs.execJob
                                                                                                    ],
                                                                                                    /* :: */[
                                                                                                      /* tuple */[
                                                                                                        "get_dispose_data",
                                                                                                        GetDisposeDataRenderWorkerJob$Wonderjs.execJob
                                                                                                      ],
                                                                                                      /* :: */[
                                                                                                        /* tuple */[
                                                                                                          "dispose_vbo",
                                                                                                          DisposeVboRenderWorkerJob$Wonderjs.execJob
                                                                                                        ],
                                                                                                        /* :: */[
                                                                                                          /* tuple */[
                                                                                                            "dispose_sourceInstance",
                                                                                                            DisposeSourceInstanceRenderWorkerJob$Wonderjs.execJob
                                                                                                          ],
                                                                                                          /* :: */[
                                                                                                            /* tuple */[
                                                                                                              "dispose_texture",
                                                                                                              DisposeTextureRenderWorkerJob$Wonderjs.execJob
                                                                                                            ],
                                                                                                            /* :: */[
                                                                                                              /* tuple */[
                                                                                                                "send_finish_dispose_data",
                                                                                                                SendFinishDisposeDataRenderWorkerJob$Wonderjs.execJob
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
                ]
              ]
            ]
          ]
        ];
}

function createMainInitJobHandleMap(param) {
  return HandleJobService$Wonderjs.createJobHandleMap(_getMainInitJobHandles(/* () */0));
}

function createMainLoopJobHandleMap(param) {
  return HandleJobService$Wonderjs.createJobHandleMap(_getMainLoopJobHandles(/* () */0));
}

function createWorkerJobHandleMap(param) {
  return HandleJobService$Wonderjs.createJobHandleMap(_getWorkerJobHandles(/* () */0));
}

function _getJobHandle(name, jobHandleMap) {
  var match = MutableHashMapService$WonderCommonlib.get(name, jobHandleMap);
  if (match !== undefined) {
    return Caml_option.valFromOption(match);
  } else {
    return JobService$Wonderjs.handleGetNoneWorkerJob(name, jobHandleMap);
  }
}

var getMainInitJobHandle = _getJobHandle;

var getMainLoopJobHandle = _getJobHandle;

var getWorkerJobHandle = _getJobHandle;

export {
  _getMainInitJobHandles ,
  _getMainLoopJobHandles ,
  _getWorkerJobHandles ,
  createMainInitJobHandleMap ,
  createMainLoopJobHandleMap ,
  createWorkerJobHandleMap ,
  _getJobHandle ,
  getMainInitJobHandle ,
  getMainLoopJobHandle ,
  getWorkerJobHandle ,
  
}
/* JobService-Wonderjs Not a pure module */
