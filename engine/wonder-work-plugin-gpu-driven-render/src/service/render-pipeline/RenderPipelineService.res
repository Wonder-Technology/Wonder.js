// type depthStencilState = {depthWriteEnabled: bool}

// // type colorTargetState = {
// // blend
// // }

// type pipelineState = {depthStencilState: depthStencilState}

// type material = int

// // e.g. PBR(diffuseColor), Phong(diffuseColor, shininess)
// type materialType

// type getDepthWriteEnabledFunc = material => bool

// let getPipelineState = (
//   getDepthWriteEnabledFunc: getDepthWriteEnabledFunc,
//   material: material,
// ): pipelineState => {
//   //TODO implement
//   Obj.magic(1)
// }

// // let getShaderName = (materialType: materialType): shaderName => {
// //   //TODO implement
// //   Obj.magic(1)
// // }

// type renderPipelineName = string

// type renderPipeline

// // let _createRenderPipeline = ((
// //   shaderData: shaderData,
// //   pipelineState: pipelineState,
// // )): renderPipeline => {
// //   //TODO implement
// //   Obj.magic(1)
// // }

// type specificMaterial = (material, materialType)

// type specificMaterialDataMap<'renderPipelineData> = WonderCommonlib.ImmutableHashMap.t<
//   materialType,
//   WonderCommonlib.ImmutableHashMap.t<material, 'renderPipelineData>,
// >

// type renderPipelineUid = int

// let _groupByShaderDataAndPipelineState = (
//   allMaterialData: array<(specificMaterial, ShaderDataType.shaderData, getDepthWriteEnabledFunc)>,
// ): // ): array<(shaderData, pipelineState)> => {
// (
//   specificMaterialDataMap<renderPipelineUid>,
//   WonderCommonlib.ImmutableHashMap.t<renderPipelineUid, (ShaderDataType.shaderData, pipelineState)>,
// ) => {
//   //   allMaterialData->WonderCommonlib.ArraySt.reduceOneParam(
//   //     (. map, (material, materialType, getDepthWriteEnabledFunc)) => {
//   //       getShaderName(materialType)->getShaderData
//   //       getPipelineState(getDepthWriteEnabledFunc, material)
//   //     },
//   //     WonderCommonlib.ImmutableHashMap.createEmpty(),
//   //   )

//   // TODO implement
//   Obj.magic(1)
// }

// // type renderPipelineMap = WonderCommonlib.ImmutableHashMap.t<
// //   materialType,
// //   WonderCommonlib.ImmutableHashMap.t<material, renderPipeline>,
// // >

// type renderPipelineMap = specificMaterialDataMap<renderPipeline>

// // let _getRenderPipeline = (
// //   map: renderPipelineMap,
// //   specificMaterial: specificMaterial,
// // ): renderPipeline => {
// //   //TODO implement
// //   Obj.magic(1)
// // }

// // let _setRenderPipeline = (
// //   map: renderPipelineMap,
// //   specificMaterial: specificMaterial,
// //   renderPipeline: renderPipeline,
// // ): renderPipelineMap => {
// //   //TODO implement
// //   Obj.magic(1)
// // }

// let _createRenderPipelineMap = ((
//   renderPipelineUidMap: specificMaterialDataMap<renderPipelineUid>,
//   specificMaterialDataMap: WonderCommonlib.ImmutableHashMap.t<
//     renderPipelineUid,
//     (ShaderDataType.shaderData, pipelineState),
//   >,
// )): renderPipelineMap => {
//   //TODO implement
//   Obj.magic(1)
// }

// let createAllRenderPipelines = (
//   allMaterialData: array<(specificMaterial, ShaderDataType.shaderData, getDepthWriteEnabledFunc)>,
// ): renderPipelineMap => {
//   allMaterialData->_groupByShaderDataAndPipelineState->_createRenderPipelineMap
// }


// TODO continue!