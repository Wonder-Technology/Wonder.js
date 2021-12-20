import { getRegisteredWorkPluginData } from "wonder-core/src/abstract/work/IWorkForJs.gen"
import { state, states, config } from "./Type"
import { exec as execInit } from "./jobs/InitJob"
import { exec as execUpdate } from "./jobs/UpdateJob"
import { exec as execRender } from "./jobs/RenderJob"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "init_root_wonder":
			return execInit
		case "update_root_wonder":
			return execUpdate
		case "render_root_wonder":
			return execRender
		default:
			return null
	}
}

let _init = (_state: any) => {
}

export let getData: getRegisteredWorkPluginData<state, config, states> = () => {
	return {
		pluginName: "wonder-work-plugin-root",
		createStateFunc: (): state => {
			return {
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [{
			name: "init",
			groups: [
				{
					name: "first_root_wonder",
					link: "concat",
					elements: [
						{
							"name": "init_root_wonder",
							"type_": "job"
						}
					]
				}
			],
			first_group: "first_root_wonder"
		},
		{
			name: "update",
			groups: [
				{
					name: "first_root_wonder",
					link: "concat",
					elements: [
						{
							"name": "update_root_wonder",
							"type_": "job"
						}
					]
				}
			],
			first_group: "first_root_wonder"
		},
		{
			name: "render",
			groups: [
				{
					name: "first_root_wonder",
					link: "concat",
					elements: [
						{
							"name": "render_root_wonder",
							"type_": "job"
						}
					]
				}
			],
			first_group: "first_root_wonder"
		}
		],
	}
}
