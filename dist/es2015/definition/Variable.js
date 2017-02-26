import { JudgeUtils } from "../utils/JudgeUtils";
export var root;
if (JudgeUtils.isNodeJs() && typeof global != "undefined") {
    root = global;
}
else {
    root = window;
}
//# sourceMappingURL=Variable.js.map