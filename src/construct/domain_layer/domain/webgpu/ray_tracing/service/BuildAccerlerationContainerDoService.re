open Js.Typed_array;

let _buildSceneGeometryContainers = device => {
  AllRenderGameObjectsDoService.getAllRenderGeometries()
  ->ListSt.traverseResultM(geometry => {
      VerticesGeometryDoService.getVertices(geometry)
      ->Result.bind(vertices => {
          IndicesGeometryDoService.getIndices(geometry)
          ->Result.mapSuccess(indices =>
              (
                geometry->GeometryEntity.value,
                vertices->VerticesVO.value,
                indices->IndicesVO.value,
              )
            )
        })
    })
  ->Result.mapSuccess(list => {
      list->ListSt.reduce(
        ImmutableSparseMap.createEmpty(),
        (geometryContainerMap, (geometry, vertices, indices)) => {
          let geometryVertexBuffer =
            RayTracingBufferVO.createFromDevice(
              ~device,
              ~bufferSize=vertices->Float32Array.byteLength,
            );

          DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubFloat32Data(
            0,
            vertices,
            geometryVertexBuffer->RayTracingBufferVO.value,
          );

          let geometryIndexBuffer =
            RayTracingBufferVO.createFromDevice(
              ~device,
              ~bufferSize=indices->Uint32Array.byteLength,
            );

          DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubUint32Data(
            0,
            indices,
            geometryIndexBuffer->RayTracingBufferVO.value,
          );

          geometryContainerMap->ImmutableSparseMap.set(
            geometry,
            DpContainer.unsafeGetWebGPURayTracingDp().device.
              createRayTracingAccelerationContainer(
              IWebGPURayTracingDp.accelerationContainerDescriptor(
                ~usage=
                  DpContainer.unsafeGetWebGPURayTracingDp().
                    accelerationContainerUsage.
                    prefer_fast_trace,
                ~level="bottom",
                ~geometries=[|
                  {
                    "usage":
                      DpContainer.unsafeGetWebGPURayTracingDp().
                        accelerationGeometryUsage.
                        opaque,
                    "type": "triangles",
                    "vertex": {
                      "buffer": geometryVertexBuffer->RayTracingBufferVO.value,
                      "format": "float3",
                      "stride": 3 * Float32Array._BYTES_PER_ELEMENT,
                      "count": Float32Array.length(vertices),
                    },
                    "index": {
                      "buffer": geometryIndexBuffer->RayTracingBufferVO.value,
                      "format": "uint32",
                      "count": Uint32Array.length(indices),
                    },
                  },
                |],
                (),
              ),
              device,
            ),
          );
        },
      )
    });
};

let _convertMat4To34RowMajorMatrix = (mat4): Float32Array.t => {
  Float32Array.make([|
    Float32Array.unsafe_get(mat4, 0),
    Float32Array.unsafe_get(mat4, 4),
    Float32Array.unsafe_get(mat4, 8),
    Float32Array.unsafe_get(mat4, 12),
    Float32Array.unsafe_get(mat4, 1),
    Float32Array.unsafe_get(mat4, 5),
    Float32Array.unsafe_get(mat4, 9),
    Float32Array.unsafe_get(mat4, 13),
    Float32Array.unsafe_get(mat4, 2),
    Float32Array.unsafe_get(mat4, 6),
    Float32Array.unsafe_get(mat4, 10),
    Float32Array.unsafe_get(mat4, 14),
  |]);
};

let _convertInstanceTransformDataToContainerTransformMatrix =
    ((translation, rotation, scale)) => {
  Matrix4.createIdentityMatrix4()
  ->Matrix4.fromTranslationRotationScale(
      translation,
      Quaternion.setFromEulerAngles(rotation),
      scale,
    )
  ->_convertMat4To34RowMajorMatrix;
};

let _convertHitGroupIndexToInstanceOffset = hitGroupIndex => {
  MathUtils.convertDecimalToHex(hitGroupIndex, 16);
};

let _createInstances = geometryContainerMap => {
  GameObjectRunAPI.getAllRenderGameObjects()
  ->ListSt.traverseResultM(gameObject => {
      Tuple2.collectOption(
        GameObjectRunAPI.getTransform(gameObject),
        GameObjectRunAPI.getGeometry(gameObject)
        ->OptionSt.flatMap(geometry => {
            geometryContainerMap->ImmutableSparseMap.get(
              geometry->GeometryEntity.value,
            )
          }),
      )
    })
  ->Result.mapSuccess(list => {
      list->ListSt.reduce(
        ([||], 0),
        ((instances, instanceIndex), (transform, geometryContainer)) => {
        (
          instances->ArraySt.push(
            IWebGPURayTracingDp.instance(
              ~usage=
                DpContainer.unsafeGetWebGPURayTracingDp().
                  accelerationInstanceUsage.
                  triangle_cull_disable,
              ~mask=0xFF,
              ~instanceId=instanceIndex,
              ~transformMatrix=
                _convertInstanceTransformDataToContainerTransformMatrix((
                  UpdateTransformDoService.updateAndGetPosition(transform)
                  ->PositionVO.value,
                  UpdateTransformDoService.updateAndGetEulerAngles(transform)
                  ->EulerAnglesVO.getPrimitiveValue,
                  UpdateTransformDoService.updateAndGetScale(transform)
                  ->ScaleVO.value,
                )),
              ~instanceOffset=_convertHitGroupIndexToInstanceOffset(0),
              ~geometryContainer,
              (),
            ),
          ),
          instanceIndex->succ,
        )
      })
    })
  ->Result.mapSuccess(Tuple2.getFirst);
};

let _createInstanceContainer = (geometryContainerMap, device) => {
  _createInstances(geometryContainerMap)
  ->Result.mapSuccess(instances => {
      DpContainer.unsafeGetWebGPURayTracingDp().device.
        createRayTracingAccelerationContainer(
        {
          IWebGPURayTracingDp.accelerationContainerDescriptor(
            ~usage=
              DpContainer.unsafeGetWebGPURayTracingDp().
                accelerationContainerUsage.
                prefer_fast_trace,
            ~level="top",
            ~instances,
            (),
          );
        },
        device,
      )
    });
};

let buildContainers = (device, queue) => {
  _buildSceneGeometryContainers(device)
  ->Result.bind(geometryContainerMap => {
      _createInstanceContainer(geometryContainerMap, device)
      ->Result.tap(instanceContainer => {
          let commandEncoder =
            DpContainer.unsafeGetWebGPUCoreDp().device.createCommandEncoder(
              IWebGPUCoreDp.commandEncoderDescriptor(),
              device,
            );

          geometryContainerMap
          ->ImmutableSparseMap.getValues
          ->ArraySt.forEach(geometryContainer => {
              DpContainer.unsafeGetWebGPURayTracingDp().commandEncoder.
                buildRayTracingAccelerationContainer(
                geometryContainer,
                commandEncoder,
              )
            });

          DpContainer.unsafeGetWebGPUCoreDp().queue.submit(
            [|
              DpContainer.unsafeGetWebGPUCoreDp().commandEncoder.finish(
                commandEncoder,
              ),
            |],
            queue,
          );

          let commandEncoder =
            DpContainer.unsafeGetWebGPUCoreDp().device.createCommandEncoder(
              IWebGPUCoreDp.commandEncoderDescriptor(),
              device,
            );

          DpContainer.unsafeGetWebGPURayTracingDp().commandEncoder.
            buildRayTracingAccelerationContainer(
            instanceContainer,
            commandEncoder,
          );

          DpContainer.unsafeGetWebGPUCoreDp().queue.submit(
            [|
              DpContainer.unsafeGetWebGPUCoreDp().commandEncoder.finish(
                commandEncoder,
              ),
            |],
            queue,
          );

          ();
        })
    });
};
