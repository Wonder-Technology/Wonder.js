import { execFunc as execFuncCore } from "wonder-core/src/abstract/work/IWorkForJs.gen"
import { buffer } from "wonder-commonlib-ts/src/dependency/webgpu/IWebGPU"
import { state as initWebGPUState } from "wonder-work-plugin-init-webgpu/src/Type"
import { Map } from "immutable"
import { geometry } from "wonder-core/src/abstract/scene_graph/ISceneGraphRepoForJs.gen"

type index = number

type geometryData = {
    vertexBuffer: buffer,
    indexBuffer: buffer,
    // vertexBufferOffset: number,
    // vertexBufferIndexMap: Map<geometry, index>,
    // indexBufferOffset: number,
    // indexBufferIndexMap: Map<geometry, index>,
}

export type state = {
    geometryData: geometryData,
    // cameraData,
    // transformData,
    // materialData
}

export type states = {
    "wonder-work-plugin-init-webgpu": initWebGPUState,
    "wonder-work-plugin-webgpu": state
}

export type execFunc = execFuncCore<states>
