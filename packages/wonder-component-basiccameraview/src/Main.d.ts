import { registeredComponent } from "../../wonder-core/src/abstract/scene_graph/IComponentForJs.gen";

export type config = { readonly isDebug: boolean };

type state = any

type basicCameraView = number

type dataName = any

export function getData(): registeredComponent<state, config, dataName, basicCameraView>
