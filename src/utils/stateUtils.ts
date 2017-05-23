import { Map } from "immutable";

export var createState = () => {
    return Map();
}

export var isValueExist = (val: any) => {
    return val !== void 0;
}


