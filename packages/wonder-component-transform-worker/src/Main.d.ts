import { registeredComponent } from "../../wonder-core/src/abstract/scene_graph/IComponentForJs.gen";

export type config = { isDebug: boolean, transformCount: number, buffer: SharedArrayBuffer };

type state = any

type transform = number

type dataName = any

export function getData(): registeredComponent<state, config, dataName, transform>