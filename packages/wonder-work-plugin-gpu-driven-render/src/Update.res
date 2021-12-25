open Init

open Js.Typed_array

type vertices = Float32Array.t

type indices = Uint32Array.t

type index = int

let updateVertexBuffer = (
  vertexBuffer: IWebGPUForJs.Buffer.t,
  allVerticesData: array<(vertices, index)>,
  maxGeometryPointCount: int,
): IWebGPUForJs.Buffer.t => {
  //TODO implement
  Obj.magic(1)
}

let updateIndexBuffer = (
  indexBuffer: IWebGPUForJs.Buffer.t,
  allIndicesData: array<(indices, index)>,
  maxGeometryPointCount: int,
): IWebGPUForJs.Buffer.t => {
  //TODO implement
  Obj.magic(1)
}

let updateCameraBuffer = (
  cameraBuffer: IWebGPUForJs.Buffer.t,
  viewMatrix: Float32Array.t,
  projectionMatrix: Float32Array.t,
): IWebGPUForJs.Buffer.t => {
  //TODO implement
  Obj.magic(1)
}

type materialBufferData = Float32Array.t

type updateMateiralBufferDataFunc = (materialBufferData, material) => materialBufferData

let updateAllMaterialBuffers = (
  materialBufferMap,
  allMaterialData: array<(specificMaterial, updateMateiralBufferDataFunc)>,
): materialBufferMap => {
  //TODO implement
  Obj.magic(1)
}

type geometry = int

type transform = int

type transforms = array<transform>

type batch = {
  geometry: int,
  material: int,
  materialType: materialType,
  transforms: transforms,
  renderBundle: IWebGPUForJs.RenderBundle.t,
}

let _group = (allRenderObjectData: array<(geometry, specificMaterial)>): array<(
  geometry,
  specificMaterial,
  transforms,
)> => {
  //TODO implement
  Obj.magic(1)
}

let getRenderBundle = (geometry: geometry, specificMaterial: specificMaterial): option<
  IWebGPUForJs.RenderBundle.t,
> => {
  //TODO implement
  Obj.magic(1)
}

let setRenderBundle = (
  geometry: geometry,
  specificMaterial: specificMaterial,
  renderBundle: IWebGPUForJs.RenderBundle.t,
): unit => {
  //TODO implement
  Obj.magic(1)
}

let _createRenderBundleAndRecord = (
  indirectBuffer: IWebGPUForJs.Buffer.t,
  indirectOffset: int,
): //   TODO need more data, e.g. material(shaderName)
IWebGPUForJs.RenderBundle.t => {
  // const renderBundleEncoder = device.createRenderBundleEncoder({
  //     colorFormats: [swapChainFormat],
  // });

  // renderBundleEncoder.setPipeline(pipeline);
  // renderBundleEncoder.setVertexBuffer(0, vertexBuffer);

  // renderBundleEncoder.setIndexBuffer(indexBuffer, 'uint32')

  //     renderBundleEncoder.setBindGroup(0, bindGroup, [i * alignedUniformBytes]);

  //     renderBundleEncoder.drawIndexedIndirect(indirectBuffer, indirectOffset);

  // const renderBundle = renderBundleEncoder.finish();

  //TODO implement
  Obj.magic(1)
}

let _buildIndirectOffset = (batchIndex: int): int => {
  //TODO implement
  Obj.magic(1)
}

/* TODO perf: manage renderBundle.
e.g. create renderBundle from pool,
remove not used renderBundle to pool
*/
/* TODO fix: if material need reinit, should create new render bundle! */
let createRenderBundles = (
  allGroupedRenderObjectData: array<(geometry, specificMaterial, transforms)>,
  indirectBuffer: IWebGPUForJs.Buffer.t,
): array<(geometry, specificMaterial, transforms, IWebGPUForJs.RenderBundle.t)> => {
  allGroupedRenderObjectData->Js.Array.mapi(
    ((geometry, specificMaterial, transforms), batchIndex) => {
      switch getRenderBundle(geometry, specificMaterial) {
      | Some(renderBundle) => (geometry, specificMaterial, transforms, renderBundle)
      | None =>
        let renderBundle = _createRenderBundleAndRecord(
          indirectBuffer,
          _buildIndirectOffset(batchIndex),
        )

        setRenderBundle(geometry, specificMaterial, renderBundle)

        (geometry, specificMaterial, transforms, renderBundle)
      }
    },
    _,
  )
}

let _buildBatch = ((geometry, specificMaterial, transforms, renderBundle)): batch => {
  //TODO implement
  Obj.magic(1)
}

let buildBatches = (
  allRenderObjectData: array<(geometry, specificMaterial)>,
  indirectBuffer: IWebGPUForJs.Buffer.t,
): array<batch> => {
  allRenderObjectData
  ->_group
  ->createRenderBundles(indirectBuffer)
  ->WonderCommonlib.ArraySt.map(_buildBatch)
}

let updateIndirectBuffer = (
  indirectBuffer: IWebGPUForJs.Buffer.t,
  batches: array<batch>,
): IWebGPUForJs.Buffer.t => {
  // VkDrawIndirectCommand * drawCommands = map_buffer(get_current_frame().indirectBuffer);

  // //encode the draw data of each object into the indirect draw buffer
  // for (int i = 0; i < transforms; i++)
  // {
  //     RenderObject & object = objects[i];
  //     VkDrawIndirectCommand[i].vertexCount = object.mesh -> _vertices.size();
  //     VkDrawIndirectCommand[i].instanceCount = 1;
  //     VkDrawIndirectCommand[i].firstVertex = 0;
  //     VkDrawIndirectCommand[i].firstInstance = i; //used to access object matrix in the shader
  // }

  //TODO implement
  Obj.magic(1)
}

let updateInstanceBuffer = (
  instanceBuffer: IWebGPUForJs.Buffer.t,
  getLocalToWorldMatrixFunc: transform => Float32Array.t,
  batches: array<batch>,
): IWebGPUForJs.Buffer.t => {
  //TODO implement
  Obj.magic(1)
}
