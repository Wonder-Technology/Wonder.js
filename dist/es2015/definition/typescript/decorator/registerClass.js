import { ClassUtils } from "../../../utils/ClassUtils";
export function registerClass(className) {
    return function (_class) {
        ClassUtils.addClassNameAttributeToClass(className, _class);
        ClassUtils.addClass(className, _class);
    };
}
//# sourceMappingURL=registerClass.js.map