import { execFunc } from "../Type"
import { callFunc } from "wonder-facade/src/MostAPI"
import { buffer, renderBundle, renderPipeline, textureFormat } from "wonder-commonlib-ts/src/dependency/webgpu/IWebGPU"
import { fragmentShader, vertexShader } from "../Shader"
import { getWebGPUExn } from "../../../wonder-commonlib-ts/src/dependency/webgpu/container/DPContainer"

function _createVertexBuffer(): buffer {
}

function _createIndexBuffer(): buffer {
}

function _createTransformBuffer(): buffer {
    //TODO implement
    return {} as any
}

function _createPBRMaterialBuffer(): buffer {
    //TODO implement
    return {} as any
}

function _createCameraBuffer(): buffer {
    //TODO implement
    return {} as any
}

function _initRenderGameObjectBindGroupData(): {
//TODO implement
return {} as any
}

function _initCameraBindGroupData(): {
//TODO implement
return {} as any
}

function _recordRenderPass(): renderBunder {
    //TODO implement
    return {} as any
}


function _initPipeline(device, [renderGameObjectLayout, cameraLayout], vertexShader, fragmentShader, swapChainFormat): renderPipeline {
    //TODO implement
    return {} as any
}

export let exec: execFunc = (states) => {
    return callFunc(() => {
        let {
            context,
            device
        } = states["wonder-work-plugin-init-webgpu"]

        let swapChainFormat: textureFormat = 'bgra8unorm';
        getWebGPUExn().configure(context, {
            device,
            format: swapChainFormat,
            usage: getWebGPUExn().getRenderAttachmentType()
        })

        let vertexBuffer = _createVertexBuffer()

        let indexBuffer = _createIndexBuffer()

        let transformBuffer = _createTransformBuffer()

        let pbrMaterialBuffer = _createPBRMaterialBuffer()

        let cameraBuffer = _createCameraBuffer()


        let [renderGameObjectLayout, renderGameObjectBindGroup] = _initRenderGameObjectBindGroupData(transformBuffer, pbrMaterialBuffer)

        let [cameraLayout, cameraBindGroup] = _initCameraBindGroupData(transformBuffer, pbrMaterialBuffer)

        _initPipeline(device, [renderGameObjectLayout, cameraLayout], vertexShader, fragmentShader, swapChainFormat)

        let renderBundle = _recordRenderPass(device, renderPipeline, vertexBuffer, indexBuffer, [bindGroup, bindGroup2], instanceCount, index.length)

        return {
            ...states,
            "wonder-work-plugin-webgpu": {
            }
        }
    })
}