import { getRegisteredWorkPluginData } from "wonder-core/src/abstract/work/IWorkForJs.gen"
import { config, state, states } from "./Type"
import { exec as execInit } from "./jobs/InitJob"
import { exec as execUpdate } from "./jobs/UpdateJob"
import { exec as execRender } from "./jobs/RenderJob"

let _getExecFunc = (_pipelineName: string, jobName: string) => {
	switch (jobName) {
		case "init_test1_wonder":
			return execInit
		case "update_test1_wonder":
			return execUpdate
		case "render_test1_wonder":
			return execRender
		default:
			return null
	}
}

let _init = (state: any) => {
	console.log("init: ", state)
}

export let getData: getRegisteredWorkPluginData<state, config, states> = () => {
	return {
		pluginName: "wonder-work-plugin-test1",
		createStateFunc: (): state => {
			return {
				data1: 0
			}
		},
		initFunc: _init,
		getExecFunc: _getExecFunc,
		allPipelineData: [{
			name: "init",
			groups: [
				{
					name: "first_test1_wonder",
					link: "concat",
					elements: [
						{
							"name": "init_test1_wonder",
							"type_": "job"
						}
					]
				}
			],
			first_group: "first_test1_wonder"
		},
		{
			name: "update",
			groups: [
				{
					name: "first_test1_wonder",
					link: "concat",
					elements: [
						{
							"name": "update_test1_wonder",
							"type_": "job"
						}
					]
				}
			],
			first_group: "first_test1_wonder"
		},
		{
			name: "render",
			groups: [
				{
					name: "first_test1_wonder",
					link: "concat",
					elements: [
						{
							"name": "render_test1_wonder",
							"type_": "job"
						}
					]
				}
			],
			first_group: "first_test1_wonder"
		}
		],
	}
}
