let unsafeGetSkyboxGameObject = state =>
  SkyboxSceneMainService.unsafeGetSkyboxGameObject(state);

let prepareCubemapTexture = state => {
  let (state, map) = CubemapTextureAPI.createCubemapTexture(state);

  let state = SceneAPI.setCubemapTexture(map, state);

  (state, map);
};

let prepareGameObject = state => {
  let (state, _, cameraTransform, (basicCameraView, _)) =
    CameraTool.createCameraGameObject(state);

  (state, cameraTransform, basicCameraView);
};

let _buildRenderConfig =
    (
      ~shaders={|
{
  "static_branchs": [
  ],
  "dynamic_branchs": [
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
  ],
  "no_material_shaders": [
    {
      "name": "skybox",
      "shader_libs": [
        {
          "type": "group",
          "name": "top"
        },
        {
          "name": "skybox"
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
    "name": "vertex",
    "variables": {
      "attributes": [
        {
          "name": "a_position",
          "buffer": 0,
          "type": "vec3"
        }
      ]
    }
  },
  {
    "name": "skybox",
    "glsls": [
      {
        "type": "vs",
        "name": "webgl1_skybox_vertex"
      },
      {
        "type": "fs",
        "name": "webgl1_skybox_fragment"
      }
    ],
    "variables": {
      "uniforms": [
        {
          "name": "u_skyboxCubeMapSampler",
          "from": "no_material_shader",
          "field": "skyboxCubeMap",
          "type": "samplerCube"
        },
        {
          "name": "u_skyboxVMatrix",
          "from": "no_material_shader",
          "field": "skyboxVMatrix",
          "type": "mat4"
        }
      ]
    }
  },
  {
    "name": "end",
    "variables": {
      "attributes": [
        {
          "buffer": 3
        }
      ]
    }
  }
]
        |},
      (),
    ) => (
  shaders,
  shaderLibs,
);

let initWithJobConfig = sandbox =>
  TestTool.initWithJobConfig(
    ~sandbox,
    ~noWorkerJobRecord=
      NoWorkerJobConfigTool.buildNoWorkerJobConfig(
        ~initPipelines=
          {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "preget_glslData"
        },
        {
          "name": "init_no_material_shader"
        },
        {
          "name": "init_texture"
        },
        {
            "name": "init_skybox"
        }
        ]
    }
  ]
        |},
        ~initJobs=
          NoWorkerJobConfigTool.buildNoWorkerInitJobConfigWithoutInitMain(),
        ~loopPipelines=
          {|
        [
    {
      "name": "default",
      "jobs": [
            {
                "name": "update_camera"
            },
            {
                "name": "get_camera_data"
            },
            {
                "name": "clear_last_send_component"
            },
            {
                "name": "send_uniform_shader_data"
            },
            {
                "name": "render_skybox"
            }
        ]
    }
  ]
        |},
        ~loopJobs=NoWorkerJobConfigTool.buildNoWorkerLoopJobConfig(),
        (),
      ),
    ~renderConfigRecord=_buildRenderConfig(),
    (),
  )
  |> DirectorTool.prepare;