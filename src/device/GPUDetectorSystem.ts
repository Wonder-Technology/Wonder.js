import { GPUDetector } from "./GPUDetector";
import { Map } from "immutable";
import curry from "wonder-lodash/curry";

//todo extract more logic from GPUDetector here

export var detect = curry((state: Map<any, any>) => {
    return GPUDetector.getInstance().detect(state);
})
