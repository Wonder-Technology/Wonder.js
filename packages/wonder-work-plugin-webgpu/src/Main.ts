import { getRegisteredWorkPluginData } from "wonder-core/src/abstract/work/IWorkForJs.gen"
import { state, states } from "./Type"
import { exec as execInitWebGPU } from "./jobs/InitWebGPUJob"
import { exec as execGetContextJob } from "./jobs/InitJob"
import { webgpu } from "../../wonder-commonlib-ts/src/dependency/webgpu/WebGPU"
import { setWebGPU } from "../../wonder-commonlib-ts/src/dependency/webgpu/container/DPContainer"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "init_webgpu_init_webgpu_wonder":
			return execInitWebGPU
		case "get_context_init_webgpu_wonder":
			return execGetContextJob
		default:
			return null
	}
}

let _init = (_state: any) => {
	setWebGPU(webgpu)
}

export let getData: getRegisteredWorkPluginData<state, states> = () => {
	return {
		pluginName: "wonder-work-plugin-webgpu",
		createStateFunc: (): state => {
			return {
				adapter: null,
				device: null,
				context: null
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [{
			name: "init",
			groups: [
				{
					name: "first_init_webgpu_wonder",
					link: "concat",
					elements: [
						{
							"name": "init_webgpu_init_webgpu_wonder",
							"type_": "job"
						},
						{
							"name": "get_context_init_webgpu_wonder",
							"type_": "job"
						}
					]
				}
			],
			first_group: "first_init_webgpu_wonder"
		},
		],
	}
}
