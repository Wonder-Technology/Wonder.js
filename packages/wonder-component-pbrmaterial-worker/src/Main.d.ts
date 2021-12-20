import { registeredComponent } from "../../wonder-core/src/abstract/scene_graph/IComponentForJs.gen";

export type config = { isDebug: boolean, pbrMaterialCount: number, buffer: SharedArrayBuffer };

type state = any

type pbrMaterial = number

type dataName = any

export function getData(): registeredComponent<state, config, dataName, pbrMaterial>