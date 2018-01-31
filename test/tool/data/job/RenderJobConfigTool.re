open RenderJobConfigType;

open RenderJobConfigParseSystem;

let buildRenderJobConfig =
    (
      ~renderSetting={|
    {
    "init_pipeline": "simple_basic_render",
    "render_pipeline": "simple_basic_render"
}
|},
      ~initPipelines={|
[
    {
      "name": "simple_basic_render",
      "jobs": [
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_basic_material"
        },
{
          "name": "init_light_material"
        }
      ]
    }
  ]
        |},
      ~renderPipelines={|
[
  {
    "name": "simple_basic_render",
    "jobs": [
      {
        "name": "get_render_array"
      },
      {
        "name": "get_camera_data"
      },
      {
        "name": "clear_color",
        "flags": [
          "#000000"
        ]
      },
      {
        "name": "clear_buffer",
        "flags": [
          "COLOR_BUFFER",
          "DEPTH_BUFFER",
          "STENCIL_BUFFER"
        ]
      },
      {
        "name": "send_uniform_shader_data"
      },
      {
        "name": "render_basic"
      },
      {
        "name": "front_render_light"
      }
    ]
  }
]
        |},
      ~initJobs={|
[
    {
        "name": "preget_glslData"
    },
    {
        "name": "init_basic_material"
    },
    {
          "name": "init_light_material"
        }
]
        |},
      ~renderJobs={|
[
  {
    "name": "get_render_array"
  },
  {
    "name": "get_camera_data"
  },
  {
    "name": "clear_color"
  },
  {
    "name": "clear_buffer"
  },
  {
    "name": "send_uniform_shader_data"
  },
  {
    "name": "render_basic"
  },
  {
    "name": "front_render_light"
  }
]
        |},
      ~shaders={|
{
  "static_branchs": [
    {
      "name": "modelMatrix_instance",
      "value": [
        "modelMatrix_noInstance",
        "modelMatrix_hardware_instance",
        "modelMatrix_batch_instance"
      ]
    }
  ],
  "groups": [
    {
      "name": "top",
      "value": [
        "common",
        "vertex"
      ]
    },
    {
      "name": "end",
      "value": [
        "end"
      ]
    }
  ],
  "material_shaders": [
    {
      "name": "render_basic",
      "shader_libs": [
        {
          "type": "group",
          "name": "top"
        },
        {
          "type": "static_branch",
          "name": "modelMatrix_instance"
        },
        {
          "name": "basic"
        },
        {
          "name": "basic_end"
        },
        {
          "type": "group",
          "name": "end"
        }
      ]
    },
    {
      "name": "front_render_light",
      "shader_libs": [
        {
          "type": "group",
          "name": "top"
        },
        {
          "name": "normal"
        },
        {
          "name": "modelMatrix_noInstance"
        },
        {
          "name": "normalMatrix_noInstance"
        },
        {
          "name": "light_common"
        },
        {
          "name": "light_setWorldPosition"
        },
        {
          "name": "noDiffuseMap"
        },
        {
          "name": "noSpecularMap"
        },
        {
          "name": "noLightMap"
        },
        {
          "name": "noEmissionMap"
        },
        {
          "name": "noNormalMap"
        },
        {
          "name": "noShadowMap"
        },
        {
          "name": "light"
        },
        {
          "name": "ambient_light"
        },
        {
          "name": "light_end"
        },
        {
          "type": "group",
          "name": "end"
        }
      ]
    }
  ]
}
        |},
      ~shaderLibs={|
[
  {
    "name": "common",
    "glsls": [
      {
        "type": "vs",
        "name": "common_vertex"
      },
      {
        "type": "fs",
        "name": "common_fragment"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_vMatrix",
          "field": "vMatrix",
          "type": "mat4",
          "from": "camera"
        },
        {
          "name": "u_pMatrix",
          "field": "pMatrix",
          "type": "mat4",
          "from": "camera"
        }
      ]
    }
  },
  {
    "name": "modelMatrix_noInstance",
    "glsls": [
      {
        "type": "vs",
        "name": "modelMatrix_noInstance_vertex"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_mMatrix",
          "field": "mMatrix",
          "type": "mat4",
          "from": "model"
        }
      ]
    }
  },
  {
    "name": "modelMatrix_hardware_instance",
    "glsls": [
      {
        "type": "vs",
        "name": "modelMatrix_hardware_instance_vertex"
      }
    ],
    "variables": {
      "attributes": [
        {
          "name": "a_mVec4_0",
          "buffer": "instance",
          "type": "vec4"
        },
        {
          "name": "a_mVec4_1",
          "buffer": "instance",
          "type": "vec4"
        },
        {
          "name": "a_mVec4_2",
          "buffer": "instance",
          "type": "vec4"
        },
        {
          "name": "a_mVec4_3",
          "buffer": "instance",
          "type": "vec4"
        }
      ]
    }
  },
  {
    "name": "modelMatrix_batch_instance",
    "glsls": [
      {
        "type": "vs",
        "name": "modelMatrix_batch_instance_vertex"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_mMatrix",
          "field": "instance_mMatrix",
          "type": "mat4",
          "from": "model"
        }
      ]
    }
  },
  {
    "name": "vertex",
    "variables": {
      "attributes": [
        {
          "name": "a_position",
          "buffer": "vertex",
          "type": "vec3"
        }
      ]
    }
  },
  {
    "name": "basic",
    "glsls": [
      {
        "type": "vs",
        "name": "webgl1_basic_vertex"
      },
      {
        "type": "fs",
        "name": "webgl1_basic_fragment"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_color",
          "field": "color",
          "type": "float3",
          "from": "basicMaterial"
        }
      ]
    }
  },
  {
    "name": "basic_end",
    "glsls": [
      {
        "type": "fs",
        "name": "webgl1_basic_end_fragment"
      }
    ]
  },
  {
    "name": "normalMatrix_noInstance",
    "glsls": [
      {
        "type": "vs",
        "name": "normalMatrix_noInstance_vertex"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_normalMatrix",
          "field": "normalMatrix",
          "type": "mat3",
          "from": "camera"
        }
      ]
    }
  },
  {
    "name": "normal",
    "variables": {
      "attributes": [
        {
          "name": "a_normal",
          "buffer": "normal",
          "type": "vec3"
        }
      ]
    }
  },
  {
    "name": "light_common",
    "glsls": [
      {
        "type": "vs",
        "name": "webgl1_frontLight_common_vertex"
      },
      {
        "type": "fs",
        "name": "webgl1_frontLight_common_fragment"
      }
    ]
  },
  {
    "name": "light_setWorldPosition",
    "glsls": [
      {
        "type": "vs",
        "name": "webgl1_frontLight_setWorldPosition_vertex"
      }
    ]
  },
  {
    "name": "noDiffuseMap",
    "glsls": [
      {
        "type": "fs",
        "name": "webgl1_noDiffuseMap_fragment"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_diffuse",
          "field": "diffuseColor",
          "type": "float3",
          "from": "lightMaterial"
        }
      ]
    }
  },
  {
    "name": "noSpecularMap",
    "glsls": [
      {
        "type": "fs",
        "name": "webgl1_noSpecularMap_fragment"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_specular",
          "field": "specularColor",
          "type": "float3",
          "from": "lightMaterial"
        }
      ]
    }
  },
  {
    "name": "noLightMap",
    "glsls": [
      {
        "type": "fs",
        "name": "webgl1_noLightMap_fragment"
      }
    ]
  },
  {
    "name": "noEmissionMap",
    "glsls": [
      {
        "type": "fs",
        "name": "webgl1_noEmissionMap_fragment"
      }
    ]
  },
  {
    "name": "noNormalMap",
    "glsls": [
      {
        "type": "vs",
        "name": "webgl1_noNormalMap_vertex"
      },
      {
        "type": "fs",
        "name": "webgl1_noNormalMap_fragment"
      }
    ]
  },
  {
    "name": "noShadowMap",
    "glsls": [
      {
        "type": "fs",
        "name": "webgl1_noShadowMap_fragment"
      }
    ]
  },
  {
    "name": "light",
    "glsls": [
      {
        "type": "vs",
        "name": "webgl1_frontLight_vertex"
      },
      {
        "type": "fs",
        "name": "webgl1_frontLight_fragment"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_cameraPos",
          "from": "camera",
          "field": "position",
          "type": "vec3"
        }
      ]
    }
  },
  {
    "name": "ambient_light",
    "glsls": [
      {
        "type": "fs",
        "name": "webgl1_ambientLight_fragment"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "sendAmbientLight",
          "from": "ambientLight",
          "field": "send",
          "type": "function"
        }
      ]
    }
  },
  {
    "name": "light_end",
    "glsls": [
      {
        "type": "fs",
        "name": "webgl1_frontLight_end_fragment"
      }
    ]
  },
  {
    "name": "end",
    "variables": {
      "attributes": [
        {
          "buffer": "index"
        }
      ]
    }
  }
]
        |},
      ()
    ) => (
  renderSetting,
  initPipelines,
  renderPipelines,
  initJobs,
  renderJobs,
  shaders,
  shaderLibs
);

let initData =
    (
      (renderSetting, initPipelines, renderPipelines, initJobs, renderJobs, shaders, shaderLibs),
      state: StateDataType.state
    ) => {
  ...state,
  renderJobConfig:
    Some({
      render_setting: convertRenderSettingToRecord(renderSetting |> Js.Json.parseExn),
      init_pipelines: convertInitPipelinesToRecord(initPipelines |> Js.Json.parseExn),
      render_pipelines: convertRenderPipelinesToRecord(renderPipelines |> Js.Json.parseExn),
      init_jobs: convertInitJobsToRecord(initJobs |> Js.Json.parseExn),
      render_jobs: convertRenderJobsToRecord(renderJobs |> Js.Json.parseExn),
      shaders: convertShadersToRecord(shaders |> Js.Json.parseExn),
      shader_libs: convertShaderLibsToRecord(shaderLibs |> Js.Json.parseExn)
    })
};

let getRenderSetting = RenderJobConfigSystem.getRenderSetting;

let getInitPipelines = RenderJobConfigSystem.getInitPipelines;

let getInitJobs = RenderJobConfigSystem.getInitJobs;

let getRenderPipelines = RenderJobConfigSystem.getRenderPipelines;

let getRenderJobs = RenderJobConfigSystem.getRenderJobs;

let getShaders = RenderJobConfigSystem.getShaders;

let getShaderLibs = RenderJobConfigSystem.getShaderLibs;

let getInitPipelines = RenderJobConfigSystem.getInitPipelines;

let getMaterialShaderLibDataArr = RenderJobConfigSystem.getMaterialShaderLibDataArr;

let throwJobFlagsShouldBeDefined = RenderJobConfigSystem.throwJobFlagsShouldBeDefined;