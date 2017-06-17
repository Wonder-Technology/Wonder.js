import { Map } from "immutable";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";

export var getState = (StateData: any) => {
    return StateData.state;
}

export var setState = (state: Map<any, any>, StateData: any) => {
    return IO.of(() => {
        StateData.state = state;
    });
}

