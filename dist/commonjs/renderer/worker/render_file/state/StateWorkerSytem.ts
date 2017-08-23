import { Map } from "immutable";

export var getState = (StateWorkerData: any) => {
    return StateWorkerData.state;
}

export var setState = (state: Map<any, any>, StateWorkerData: any) => {
    StateWorkerData.state = state;
}
