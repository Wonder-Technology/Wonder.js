import { execFunc as execFuncCore } from "wonder-core/src/abstract/work/IWorkForJs.gen"
import { adapter, device, context } from "../../wonder-commonlib-ts/src/dependency/webgpu/IWebGPU"
import { nullable } from "../../wonder-commonlib-ts/src/nullable"


export type state = {
    canvas: HTMLCanvasElement,
    adapter: nullable<adapter>,
    device: nullable<device>,
    context: nullable<context>
}

export type config = HTMLCanvasElement

export type states = { "wonder-work-plugin-init-webgpu": state }

export type execFunc = execFuncCore<states>

// export type callFunc = 