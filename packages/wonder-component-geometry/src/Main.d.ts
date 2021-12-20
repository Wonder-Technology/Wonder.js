import { registeredComponent } from "../../wonder-core/src/abstract/scene_graph/IComponentForJs.gen";

export type config = {
    isDebug: boolean,
    geometryCount: number,
    geometryPointCount: number,
}

type state = any

type geometry = number

type dataName = any

export function getData(): registeredComponent<state, config, dataName, geometry>