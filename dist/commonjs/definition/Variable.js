"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JudgeUtils_1 = require("../utils/JudgeUtils");
if (JudgeUtils_1.JudgeUtils.isNodeJs() && typeof global != "undefined") {
    exports.root = global;
}
else {
    exports.root = window;
}
//# sourceMappingURL=Variable.js.map