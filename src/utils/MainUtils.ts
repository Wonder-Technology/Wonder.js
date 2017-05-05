import { Map } from "immutable";

export var getIsTest = (state: Map<any, any>) => {
    return state.getIn(["Main", "isTest"]);
}

