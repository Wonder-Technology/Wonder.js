open Js.Typed_array;

let create = () => JobEntity.create("init_pathTracing");

let _buildDirectionLightBufferData = (device, sceneGameObject) => {
  Contract.requireCheck(
    () => {
      Contract.(
        Operators.(
          test(
            Log.buildAssertMessage(
              ~expect={j|only has one direction light|j},
              ~actual={j|not|j},
            ),
            () => {
            DirectionLightRunAPI.getLightCount(sceneGameObject) == 1
          })
        )
      )
    },
    ConfigDpRunAPI.unsafeGet().getIsDebug(),
  )
  ->Result.bind(() => {
      DirectionLightRunAPI.getAllLights(sceneGameObject)
      ->ListSt.head
      ->OptionSt.get
      ->Result.mapSuccess(light => {
          (
            DirectionLightRunAPI.getIntensity(light)->IntensityVO.value,
            DirectionLightRunAPI.getDirection(light)->DirectionVO.value,
          )
        })
      ->Result.bind(((intensity, direction)) => {
          let directionLightCount = 1;
          let directionLightBufferData =
            Float32Array.fromLength(directionLightCount * (4 + 4));

          ListResult.mergeResults([
            TypeArrayCPRepoUtils.setFloat1(
              0,
              intensity,
              directionLightBufferData,
            ),
            TypeArrayCPRepoUtils.setFloat3(
              4,
              direction,
              directionLightBufferData,
            ),
          ])
          ->Result.mapSuccess(() => directionLightBufferData);
        })
      ->Result.mapSuccess(directionLightBufferData => {
          let bufferSize = directionLightBufferData->Float32Array.byteLength;

          let buffer =
            StorageBufferVO.createFromDevice(
              ~device,
              ~bufferSize,
              ~usage=
                WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.copy_dst
                lor WebGPUCoreDpRunAPI.unsafeGet().bufferUsage.storage,
              (),
            );

          WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubFloat32Data(
            0,
            directionLightBufferData,
            buffer->StorageBufferVO.value,
          );

          (buffer, bufferSize);
        })
    });
};

let _createShaderBindingTable = device => {
  let baseShaderPath = "src/run/cloud_picture/domain_layer/domain/shader/ray_tracing";

  let rayGenShaderModule =
    WebGPUCoreDpRunAPI.unsafeGet().device.createShaderModule(
      {
        "code":
          WebGPUCoreDpRunAPI.unsafeGet().loadGLSL(
            {j|$(baseShaderPath)/ray_generation.rgen|j},
          ),
      },
      device,
    );

  let rayRChitShaderModule =
    WebGPUCoreDpRunAPI.unsafeGet().device.createShaderModule(
      {
        "code":
          WebGPUCoreDpRunAPI.unsafeGet().loadGLSL(
            {j|$(baseShaderPath)/ray_closest_hit.rchit|j},
          ),
      },
      device,
    );
  let rayMissShaderModule =
    WebGPUCoreDpRunAPI.unsafeGet().device.createShaderModule(
      {
        "code":
          WebGPUCoreDpRunAPI.unsafeGet().loadGLSL(
            {j|$(baseShaderPath)/ray_miss.rmiss|j},
          ),
      },
      device,
    );
  let rayMissShadowShaderModule =
    WebGPUCoreDpRunAPI.unsafeGet().device.createShaderModule(
      {
        "code":
          WebGPUCoreDpRunAPI.unsafeGet().loadGLSL(
            {j|$(baseShaderPath)/ray_miss_shadow.rmiss|j},
          ),
      },
      device,
    );

  WebGPURayTracingDpRunAPI.unsafeGet().device.
    createRayTracingShaderBindingTable(
    {
      "stages": [|
        {
          "module": rayGenShaderModule,
          "stage":
            WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_generation,
        },
        {
          "module": rayRChitShaderModule,
          "stage":
            WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_closest_hit,
        },
        {
          "module": rayMissShaderModule,
          "stage": WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_miss,
        },
        {
          "module": rayMissShadowShaderModule,
          "stage": WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.ray_miss,
        },
      |],
      "groups": [|
        IWebGPURayTracingDp.group(
          ~type_="general-hit-group",
          ~generalIndex=0,
          (),
        ),
        IWebGPURayTracingDp.group(
          ~type_="triangles-hit-group",
          ~closestHitIndex=1,
          (),
        ),
        IWebGPURayTracingDp.group(~type_="general", ~generalIndex=2, ()),
        IWebGPURayTracingDp.group(~type_="general", ~generalIndex=3, ()),
      |],
    },
    device,
  );
};

let exec = () => {
  Tuple2.collectOption(WebGPUCPRepo.getDevice(), WebGPUCPRepo.getQueue())
  ->Result.bind(((device, queue)) => {
      _createShaderBindingTable(device)
      ->PathTracingPassCPRepo.setShaderBindingTable;

      let cameraBindGroupLayout =
        WebGPUCoreDpRunAPI.unsafeGet().device.createBindGroupLayout(
          {
            "entries": [|
              IWebGPUCoreDp.layoutBinding(
                ~binding=0,
                ~visibility=
                  WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.
                    ray_generation,
                ~type_="uniform-buffer",
                (),
              ),
            |],
          },
          device,
        );

      PathTracingPassCPRepo.setCameraBindGroupLayout(cameraBindGroupLayout);

      CameraCPRepo.getCameraBufferData()
      ->OptionSt.get
      ->Result.mapSuccess(((cameraBuffer, cameraBufferData)) => {
          PathTracingPassCPRepo.addStaticBindGroupData(
            1,
            WebGPUCoreDpRunAPI.unsafeGet().device.createBindGroup(
              {
                "layout": cameraBindGroupLayout,
                "entries": [|
                  IWebGPUCoreDp.binding(
                    ~binding=0,
                    ~buffer=cameraBuffer->UniformBufferVO.value,
                    ~offset=0,
                    ~size=cameraBufferData->Float32Array.byteLength,
                    (),
                  ),
                |],
              },
              device,
            ),
          );
          ();
        })
      ->Result.bind(() => {
          let directionLightBindGroupLayout =
            WebGPUCoreDpRunAPI.unsafeGet().device.createBindGroupLayout(
              {
                "entries": [|
                  IWebGPUCoreDp.layoutBinding(
                    ~binding=0,
                    ~visibility=
                      WebGPURayTracingDpRunAPI.unsafeGet().shaderStage.
                        ray_closest_hit,
                    ~type_="storage-buffer",
                    (),
                  ),
                |],
              },
              device,
            );

          PathTracingPassCPRepo.setDirectionLightBindGroupLayout(
            directionLightBindGroupLayout,
          );

          _buildDirectionLightBufferData(
            device,
            SceneRunAPI.getSceneGameObject(),
          )
          ->Result.mapSuccess(
              ((directionLightBuffer, directionLightBufferSize)) => {
              PathTracingPassCPRepo.addStaticBindGroupData(
                2,
                WebGPUCoreDpRunAPI.unsafeGet().device.createBindGroup(
                  {
                    "layout": directionLightBindGroupLayout,
                    "entries": [|
                      IWebGPUCoreDp.binding(
                        ~binding=0,
                        ~buffer=directionLightBuffer->StorageBufferVO.value,
                        ~offset=0,
                        ~size=directionLightBufferSize,
                        (),
                      ),
                    |],
                  },
                  device,
                ),
              )
            });
        });
    })
  ->WonderBsMost.Most.just;
};
