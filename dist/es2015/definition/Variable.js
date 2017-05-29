import { JudgeUtils } from "../utils/JudgeUtils";
import { Log } from "../utils/Log";
export var root;
if (JudgeUtils.isNodeJs() && typeof global != "undefined") {
    root = global;
}
else if (typeof window != "undefined") {
    root = window;
}
else if (typeof self != "undefined") {
    root = self;
}
else {
    Log.error("no avaliable root!");
}
//# sourceMappingURL=Variable.js.map