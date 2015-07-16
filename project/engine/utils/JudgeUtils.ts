/// <reference path="../definitions.d.ts"/>
module Engine3D {
    declare var document:any;
    declare var navigator:any;
    declare var window:any;

    export class JudgeUtils extends dyCb.JudgeUtils{
        public static isView(obj) {
            return obj instanceof IView;
        }

        public static isEqual(target1:GameObject, target2:GameObject) {
            return target1.uid === target2.uid;
        }
    }
}
