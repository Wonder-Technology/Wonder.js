import { ClassUtils } from "../../../utils/ClassUtils";

export function registerClass(className: string) {
    return function(target) {
        ClassUtils.addClass(className, target);
    }
}