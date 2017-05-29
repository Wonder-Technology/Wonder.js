import { GPUDetector } from "./GPUDetector";
import { Map } from "immutable";

//todo extract more logic from GPUDetector here

export var detect = (state: Map<any, any>) => {
    return GPUDetector.getInstance().detect(state);
}
