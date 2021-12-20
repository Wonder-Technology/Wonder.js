import { registeredComponent } from "../../wonder-core/src/abstract/scene_graph/IComponentForJs.gen";

export type config = {
    readonly isDebug: boolean;
    readonly transformCount: number;
    readonly float9Array1: Float32Array;
    readonly float32Array1: Float32Array;
};

type state = any

type transform = number

type dataName = any

export function getData(): registeredComponent<state, config, dataName, transform>