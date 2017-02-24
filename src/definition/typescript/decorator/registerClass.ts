import { ClassUtils } from "../../../utils/ClassUtils";

export function registerClass(className: string) {
    return function(_class) {
        ClassUtils.addClassNameAttributeToClass(className, _class);
        ClassUtils.addClass(className, _class);
    }
}