import type { Stream } from "most";
import { registeredWorkPlugin } from "./abstract/work/IWorkForJs.gen"
import { jobOrders } from "./data/vo/RegisterWorkPluginVOType.gen";
import { componentName, registeredComponent } from "./abstract/scene_graph/IComponentForJs.gen"
import { usedComponentData } from "./data/RegisterComponentType.gen"
import { gameObjectData } from "./abstract/scene_graph/IGameObjectForJs.gen"
import { nullable } from "wonder-commonlib-ts/src/nullable"

export function prepare(): void

export function init(): void

type pipelineName = string

export function runPipeline(pipelineName: pipelineName): Stream<void>

type po = any

// type pluginName = string

// type states = Record<pluginName, po>
type states = any


export function registerWorkPlugin(data: registeredWorkPlugin<po, states>, jobOrders?: jobOrders): void

export function unregisterWorkPlugin(targetPluginName: string): void

export function getIsDebug(): boolean

export function setIsDebug(isDebug: boolean): void



type gameObjectState = any

type gameObject = any

export function setGameObjectData(data: gameObjectData<gameObjectState, gameObject>): void

export function createAndSetGameObjectState(): void

export function createGameObject(): gameObject

export function getAllGameObjects(): Array<gameObject>


type componentState = any

type component = any

type config = any

type dataName = any

export function registerComponent(data: registeredComponent<componentState, config, dataName, component>): void

export function unregisterComponent(componentName: componentName): void

export function createAndSetComponentState(componentName: componentName, config: config): void

export function createComponent(data: usedComponentData): [usedComponentData, component]

export function unsafeGetRelatedComponentData(componentName: componentName): usedComponentData

export function setRelatedComponentData(data: usedComponentData, componentName: componentName): void

export function setComponentData<DataValue>(
    data: usedComponentData,
    component: component,
    dataName: dataName,
    dataValue: DataValue
): usedComponentData

export function addComponent(data: usedComponentData,
    gameObject: gameObject,
    component: component,
): usedComponentData

export function hasComponent(data: usedComponentData,
    gameObject: gameObject,
): boolean

export function getComponent(data: usedComponentData,
    gameObject: gameObject,
): nullable<component>

export function getAllComponents(data: usedComponentData
): Array<component>

export function getComponentData<DataValue>(data: usedComponentData,
    component: component,
    dataName: dataName,
): nullable<DataValue>

export function getComponentGameObjects(data: usedComponentData,
    component: component,
): Array<gameObject>

export function getState<componentState>(component: component): nullable<componentState>
