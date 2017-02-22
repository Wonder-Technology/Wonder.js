import { JudgeUtils } from "../utils/JudgeUtils";

declare var global: NodeJS.Global, window: Window;
export var root: any;

if (JudgeUtils.isNodeJs() && typeof global != "undefined") {
    root = global;
}
else {
    root = window;
}