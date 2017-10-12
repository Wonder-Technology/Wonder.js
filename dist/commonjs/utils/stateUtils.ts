import { Map } from "immutable";

export const createState = () => {
    return Map();
}

export const isValueExist = (val: any) => {
    return val !== void 0;
}


