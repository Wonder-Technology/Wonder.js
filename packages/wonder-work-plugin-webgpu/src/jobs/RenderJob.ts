import { execFunc } from "../Type"
import { callFunc } from "wonder-facade/src/MostAPI"
import { getWebGPUExn } from "../../../wonder-commonlib-ts/src/dependency/webgpu/container/DPContainer"
import { context } from "wonder-core/src/abstract/scene_graph/ISceneGraphRepoForJs.gen"
// import { buffer,  renderPipeline, swapChain, textureFormat } from "wonder-commonlib-ts/src/dependency/webgpu/IWebGPU"
// import { fragmentShader, vertexShader } from "../Shader"
// import { getWebGPUExn } from "../../../wonder-commonlib-ts/src/dependency/webgpu/container/DPContainer"

function _getSize(): [number, number] {
    //TODO implement
    return {} as any
}

function _updateCameraBuffer(): {
//TODO implement
return {} as any
}

function _updateTransformBuffer(): {
//TODO implement
return {} as any
}

// TODO finish
// function _updateGeometryBufferData():{
// }

// function _updatePBRMaterialBuffer():{
// }

export let exec: execFunc = (states) => {
    return callFunc(() => {
        let {
            device
        } = states["wonder-work-plugin-init-webgpu"]

        let {
            renderPipeline,
            renderBundle
        } = states["wonder-work-plugin-webgpu"]

        let commandEncoder = getWebGPUExn
            ().createCommandEncoder(device)
        let passEncoder = getWebGPUExn().beginRenderPass(commandEncoder, {
            colorAttachments: [{
                view: getWebGPUExn().getCurrentTexture(context),
                loadValue: { r: 0, g: 0, b: 0, a: 1.0 },
                storeOp: 'store'
            }]
        })


        let [width, height] = _getSize();
        getWebGPUExn().setViewport(passEncoder, width, height, 0, 1)


        _updateCameraBuffer()

        _updateTransformBuffer()


        getWebGPUExn().executeBundles(passEncoder, renderBundle)
        getWebGPUExn().endPass(passEncoder)

        getWebGPUExn().submit(
            device,
            getWebGPUExn().finish(commandEncoder)
        )

        return states
    })
}