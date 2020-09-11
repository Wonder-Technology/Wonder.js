open Js.Typed_array;

let create = () => JobEntity.create("init_pathTracing");

let _buildSceneDescBufferData = device => {
  let gameObjectCount = POConfigCPRepo.getTransformCount();

  let dataCount = 4 + 12 + 16;
  let bufferData = Float32Array.fromLength(gameObjectCount * dataCount);
  let bufferSize = bufferData->Float32Array.byteLength;

  let buffer =
    StorageBufferVO.createFromDevice(
      ~device,
      ~bufferSize,
      ~usage=
        DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.copy_dst
        lor DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.storage,
      (),
    );

  (buffer, bufferSize, bufferData);
};

let _buildPointIndexBufferData = device => {
  let geometryCount = POConfigCPRepo.getGeometryCount();
  let dataCount = 2;
  let bufferData = Uint32Array.fromLength(geometryCount * dataCount);
  let bufferSize = bufferData->Uint32Array.byteLength;

  let buffer =
    StorageBufferVO.createFromDevice(
      ~device,
      ~bufferSize,
      ~usage=
        DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.copy_dst
        lor DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.storage,
      (),
    );

  (buffer, bufferSize, bufferData);
};

let _buildVertexBufferData = device => {
  let geometryPointCount = POConfigCPRepo.getGeometryPointCount();
  let bufferData = Float32Array.fromLength(geometryPointCount * 4 * 2);
  let bufferSize = bufferData->Float32Array.byteLength;

  let buffer =
    StorageBufferVO.createFromDevice(
      ~device,
      ~bufferSize,
      ~usage=
        DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.copy_dst
        lor DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.storage,
      (),
    );

  (buffer, bufferSize, bufferData);
};

let _buildIndexBufferData = device => {
  let geometryPointCount = POConfigCPRepo.getGeometryPointCount();
  let bufferSize = geometryPointCount * 1 * Uint32Array._BYTES_PER_ELEMENT;

  let buffer =
    StorageBufferVO.createFromDevice(
      ~device,
      ~bufferSize,
      ~usage=
        DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.copy_dst
        lor DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.storage,
      (),
    );

  (buffer, bufferSize);
};

let _buildPBRMaterialBufferData = device => {
  let pbrMaterialCount = POConfigCPRepo.getPBRMaterialCount();
  let dataCount = 4 + 4;
  let bufferData = Float32Array.fromLength(pbrMaterialCount * dataCount);
  let bufferSize = bufferData->Float32Array.byteLength;

  let buffer =
    StorageBufferVO.createFromDevice(
      ~device,
      ~bufferSize,
      ~usage=
        DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.copy_dst
        lor DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.storage,
      (),
    );

  (buffer, bufferSize, bufferData);
};

let _buildAndSetAllBufferData = device => {
  _buildSceneDescBufferData(device)
  ->PathTracingPassCPRepo.setSceneDescBufferData;

  _buildPointIndexBufferData(device)
  ->PathTracingPassCPRepo.setPointIndexBufferData;

  _buildVertexBufferData(device)->PathTracingPassCPRepo.setVertexBufferData;

  _buildIndexBufferData(device)->PathTracingPassCPRepo.setIndexBufferData;

  _buildPBRMaterialBufferData(device)
  ->PathTracingPassCPRepo.setPBRMaterialBufferData;
};

let _buildDirectionLightBufferData = device => {
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
            DirectionLightRunAPI.getLightCount() == 1
          })
        )
      )
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.bind(() => {
      DirectionLightRunAPI.getAllLights()
      ->ListSt.head
      ->OptionSt.get
      ->Result.bind(light => {
          DirectionLightRunAPI.getDirection(light)
          ->OptionSt.get
          ->Result.mapSuccess(direction => {
              (
                DirectionLightRunAPI.getIntensity(light)->IntensityVO.value,
                direction->DirectionVO.value,
              )
            })
        })
      ->Result.bind(((intensity, direction)) => {
          let directionLightBufferData =
            Float32Array.fromLength(
              POConfigCPRepo.getDirectionLightCount() * (4 + 4),
            );

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
                DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.copy_dst
                lor DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.storage,
              (),
            );

          DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubFloat32Data(
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
    DpContainer.unsafeGetWebGPUCoreDp().device.createShaderModule(
      {
        "code":
          DpContainer.unsafeGetWebGPUCoreDp().loadGLSL(
            {j|$(baseShaderPath)/ray-generation.rgen|j},
          ),
      },
      device,
    );

  let rayRChitShaderModule =
    DpContainer.unsafeGetWebGPUCoreDp().device.createShaderModule(
      {
        "code":
          DpContainer.unsafeGetWebGPUCoreDp().loadGLSL(
            {j|$(baseShaderPath)/ray-closest-hit.rchit|j},
          ),
      },
      device,
    );
  let rayMissShaderModule =
    DpContainer.unsafeGetWebGPUCoreDp().device.createShaderModule(
      {
        "code":
          DpContainer.unsafeGetWebGPUCoreDp().loadGLSL(
            {j|$(baseShaderPath)/ray-miss.rmiss|j},
          ),
      },
      device,
    );
  let rayMissShadowShaderModule =
    DpContainer.unsafeGetWebGPUCoreDp().device.createShaderModule(
      {
        "code":
          DpContainer.unsafeGetWebGPUCoreDp().loadGLSL(
            {j|$(baseShaderPath)/ray-miss-shadow.rmiss|j},
          ),
      },
      device,
    );

  DpContainer.unsafeGetWebGPURayTracingDp().device.
    createRayTracingShaderBindingTable(
    {
      "stages": [|
        {
          "module": rayGenShaderModule,
          "stage":
            DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
              ray_generation,
        },
        {
          "module": rayRChitShaderModule,
          "stage":
            DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
              ray_closest_hit,
        },
        {
          "module": rayMissShaderModule,
          "stage":
            DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.ray_miss,
        },
        {
          "module": rayMissShadowShaderModule,
          "stage":
            DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.ray_miss,
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
        IWebGPURayTracingDp.group(~type_="general", ~closestHitIndex=2, ()),
        IWebGPURayTracingDp.group(~type_="general", ~closestHitIndex=3, ()),
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
        DpContainer.unsafeGetWebGPUCoreDp().device.createBindGroupLayout(
          {
            "entries": [|
              IWebGPUCoreDp.layoutBinding(
                ~binding=0,
                ~visibility=
                  DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                    ray_generation
                  lor DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                        ray_closest_hit,
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
            DpContainer.unsafeGetWebGPUCoreDp().device.createBindGroup(
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
            DpContainer.unsafeGetWebGPUCoreDp().device.createBindGroupLayout(
              {
                "entries": [|
                  IWebGPUCoreDp.layoutBinding(
                    ~binding=0,
                    ~visibility=
                      DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
                        ray_generation
                      lor DpContainer.unsafeGetWebGPURayTracingDp().shaderStage.
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

          _buildDirectionLightBufferData(device)
          ->Result.mapSuccess(
              ((directionLightBuffer, directionLightBufferSize)) => {
              PathTracingPassCPRepo.addStaticBindGroupData(
                2,
                DpContainer.unsafeGetWebGPUCoreDp().device.createBindGroup(
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
        })
      ->Result.mapSuccess(() => {
          _buildAndSetAllBufferData(device);

          ();
        });
    })
  ->WonderBsMost.Most.just;
};
