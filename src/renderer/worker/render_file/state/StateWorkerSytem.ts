import { Map } from "immutable";

export const getState = (StateWorkerData: any) => {
    return StateWorkerData.state;
}

export const setState = (state: Map<any, any>, StateWorkerData: any) => {
    StateWorkerData.state = state;
}
