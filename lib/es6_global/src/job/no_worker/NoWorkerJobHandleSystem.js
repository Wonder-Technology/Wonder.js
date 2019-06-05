

import * as TickJob$Wonderjs from "./loop/TickJob.js";
import * as DisposeJob$Wonderjs from "./loop/DisposeJob.js";
import * as CreateGlJob$Wonderjs from "./init/CreateGlJob.js";
import * as DetectGlJob$Wonderjs from "./init/DetectGlJob.js";
import * as InitEventJob$Wonderjs from "./init/InitEventJob.js";
import * as InitIMGUIJob$Wonderjs from "./init/InitIMGUIJob.js";
import * as InitStateJob$Wonderjs from "./init/InitStateJob.js";
import * as StartTimeJob$Wonderjs from "./init/StartTimeJob.js";
import * as ClearColorJob$Wonderjs from "./loop/ClearColorJob.js";
import * as InitCameraJob$Wonderjs from "./init/InitCameraJob.js";
import * as InitScriptJob$Wonderjs from "./init/InitScriptJob.js";
import * as InitSkyboxJob$Wonderjs from "./init/InitSkyboxJob.js";
import * as ClearBufferJob$Wonderjs from "./loop/ClearBufferJob.js";
import * as DrawOutlineJob$Wonderjs from "./loop/DrawOutlineJob.js";
import * as InitTextureJob$Wonderjs from "./init/InitTextureJob.js";
import * as RenderBasicJob$Wonderjs from "./loop/render_basic/RenderBasicJob.js";
import * as RenderIMGUIJob$Wonderjs from "./loop/RenderIMGUIJob.js";
import * as SetViewportJob$Wonderjs from "./init/SetViewportJob.js";
import * as CreateCanvasJob$Wonderjs from "./init/CreateCanvasJob.js";
import * as RenderSkyboxJob$Wonderjs from "./loop/RenderSkyboxJob.js";
import * as UpdateCameraJob$Wonderjs from "./loop/UpdateCameraJob.js";
import * as UpdateScriptJob$Wonderjs from "./loop/UpdateScriptJob.js";
import * as GetCameraDataJob$Wonderjs from "./loop/GetCameraDataJob.js";
import * as HandleJobService$Wonderjs from "../../service/primitive/job/HandleJobService.js";
import * as SetFullScreenJob$Wonderjs from "./init/SetFullScreenJob.js";
import * as PregetGLSLDataJob$Wonderjs from "./init/PregetGLSLDataJob.js";
import * as UpdateTransformJob$Wonderjs from "./loop/UpdateTransformJob.js";
import * as FrontRenderLightJob$Wonderjs from "./loop/front_render_light/FrontRenderLightJob.js";
import * as InitBasicMaterialJob$Wonderjs from "./init/InitBasicMaterialJob.js";
import * as InitLightMaterialJob$Wonderjs from "./init/InitLightMaterialJob.js";
import * as ReallocateCPUMemoryJob$Wonderjs from "./loop/ReallocateCPUMemoryJob.js";
import * as InitNoMaterialShaderJob$Wonderjs from "./init/InitNoMaterialShaderJob.js";
import * as SendUniformShaderDataJob$Wonderjs from "./loop/SendUniformShaderDataJob.js";
import * as ClearLastSendComponentJob$Wonderjs from "./loop/ClearLastSendComponentJob.js";
import * as CreateBasicRenderObjectBufferJob$Wonderjs from "./loop/CreateBasicRenderObjectBufferJob.js";
import * as CreateLightRenderObjectBufferJob$Wonderjs from "./loop/CreateLightRenderObjectBufferJob.js";

function _getInitJobHandles(param) {
  return /* :: */[
          /* tuple */[
            "create_canvas",
            CreateCanvasJob$Wonderjs.execJob
          ],
          /* :: */[
            /* tuple */[
              "create_gl",
              CreateGlJob$Wonderjs.execJob
            ],
            /* :: */[
              /* tuple */[
                "set_full_screen",
                SetFullScreenJob$Wonderjs.execJob
              ],
              /* :: */[
                /* tuple */[
                  "set_viewport",
                  SetViewportJob$Wonderjs.execJob
                ],
                /* :: */[
                  /* tuple */[
                    "detect_gl",
                    DetectGlJob$Wonderjs.execJob
                  ],
                  /* :: */[
                    /* tuple */[
                      "init_event",
                      InitEventJob$Wonderjs.execJob
                    ],
                    /* :: */[
                      /* tuple */[
                        "init_camera",
                        InitCameraJob$Wonderjs.execJob
                      ],
                      /* :: */[
                        /* tuple */[
                          "init_script",
                          InitScriptJob$Wonderjs.execJob
                        ],
                        /* :: */[
                          /* tuple */[
                            "start_time",
                            StartTimeJob$Wonderjs.execJob
                          ],
                          /* :: */[
                            /* tuple */[
                              "preget_glslData",
                              PregetGLSLDataJob$Wonderjs.execJob
                            ],
                            /* :: */[
                              /* tuple */[
                                "init_imgui",
                                InitIMGUIJob$Wonderjs.execJob
                              ],
                              /* :: */[
                                /* tuple */[
                                  "init_texture",
                                  InitTextureJob$Wonderjs.execJob
                                ],
                                /* :: */[
                                  /* tuple */[
                                    "init_state",
                                    InitStateJob$Wonderjs.execJob
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      "init_no_material_shader",
                                      InitNoMaterialShaderJob$Wonderjs.execJob
                                    ],
                                    /* :: */[
                                      /* tuple */[
                                        "init_basic_material",
                                        InitBasicMaterialJob$Wonderjs.execJob
                                      ],
                                      /* :: */[
                                        /* tuple */[
                                          "init_light_material",
                                          InitLightMaterialJob$Wonderjs.execJob
                                        ],
                                        /* :: */[
                                          /* tuple */[
                                            "init_skybox",
                                            InitSkyboxJob$Wonderjs.execJob
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
        ];
}

function _getLoopJobHandles(param) {
  return /* :: */[
          /* tuple */[
            "tick",
            TickJob$Wonderjs.execJob
          ],
          /* :: */[
            /* tuple */[
              "update_script",
              UpdateScriptJob$Wonderjs.execJob
            ],
            /* :: */[
              /* tuple */[
                "update_transform",
                UpdateTransformJob$Wonderjs.execJob
              ],
              /* :: */[
                /* tuple */[
                  "update_camera",
                  UpdateCameraJob$Wonderjs.execJob
                ],
                /* :: */[
                  /* tuple */[
                    "draw_outline",
                    DrawOutlineJob$Wonderjs.execJob
                  ],
                  /* :: */[
                    /* tuple */[
                      "clear_color",
                      ClearColorJob$Wonderjs.execJob
                    ],
                    /* :: */[
                      /* tuple */[
                        "clear_buffer",
                        ClearBufferJob$Wonderjs.execJob
                      ],
                      /* :: */[
                        /* tuple */[
                          "clear_last_send_component",
                          ClearLastSendComponentJob$Wonderjs.execJob
                        ],
                        /* :: */[
                          /* tuple */[
                            "get_camera_data",
                            GetCameraDataJob$Wonderjs.execJob
                          ],
                          /* :: */[
                            /* tuple */[
                              "send_uniform_shader_data",
                              SendUniformShaderDataJob$Wonderjs.execJob
                            ],
                            /* :: */[
                              /* tuple */[
                                "create_basic_render_object_buffer",
                                CreateBasicRenderObjectBufferJob$Wonderjs.execJob
                              ],
                              /* :: */[
                                /* tuple */[
                                  "create_light_render_object_buffer",
                                  CreateLightRenderObjectBufferJob$Wonderjs.execJob
                                ],
                                /* :: */[
                                  /* tuple */[
                                    "dispose",
                                    DisposeJob$Wonderjs.execJob
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      "reallocate_cpu_memory",
                                      ReallocateCPUMemoryJob$Wonderjs.execJob
                                    ],
                                    /* :: */[
                                      /* tuple */[
                                        "render_basic",
                                        RenderBasicJob$Wonderjs.execJob
                                      ],
                                      /* :: */[
                                        /* tuple */[
                                          "front_render_light",
                                          FrontRenderLightJob$Wonderjs.execJob
                                        ],
                                        /* :: */[
                                          /* tuple */[
                                            "render_imgui",
                                            RenderIMGUIJob$Wonderjs.execJob
                                          ],
                                          /* :: */[
                                            /* tuple */[
                                              "render_skybox",
                                              RenderSkyboxJob$Wonderjs.execJob
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
        ];
}

function createInitJobHandleMap(param) {
  return HandleJobService$Wonderjs.createJobHandleMap(_getInitJobHandles(/* () */0));
}

function createLoopJobHandleMap(param) {
  return HandleJobService$Wonderjs.createJobHandleMap(_getLoopJobHandles(/* () */0));
}

export {
  _getInitJobHandles ,
  _getLoopJobHandles ,
  createInitJobHandleMap ,
  createLoopJobHandleMap ,
  
}
/* TickJob-Wonderjs Not a pure module */
