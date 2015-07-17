/// <reference path="../definitions.d.ts"/>
module Engine3D {
    export class JudgeUtils extends dyCb.JudgeUtils{
        public static isView(obj) {
            return !!obj && obj.offset && obj.width && obj.height && this.isFunction(obj.getContext);
        }

        public static isEqual(target1:GameObject, target2:GameObject) {
            return target1.uid === target2.uid;
        }
    }
}
