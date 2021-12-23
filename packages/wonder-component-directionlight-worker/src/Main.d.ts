import { registeredComponent } from "../../wonder-core/src/abstract/scene_graph/IComponentForJs.gen";

export type config = { isDebug: boolean, directionLightCount: number, buffer: SharedArrayBuffer };

type state = any

type directionLight = number

type dataName = any

export function getData(): registeredComponent<state, config, dataName, directionLight>