"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassUtils_1 = require("../../../utils/ClassUtils");
function registerClass(className) {
    return function (_class) {
        ClassUtils_1.ClassUtils.addClassNameAttributeToClass(className, _class);
        ClassUtils_1.ClassUtils.addClass(className, _class);
    };
}
exports.registerClass = registerClass;
//# sourceMappingURL=registerClass.js.map