import { ensure, it } from "../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";

export class ClassUtils {
    private static _classMap: ClassMapData = {};

    @ensure(function(className: string) {
        it("should get class name from objInstance.className", () => {
            expect(className).exist;
            expect(className !== "").true
        });
    })
    public static getClassName(objInstance: any) {
        return objInstance.constructor.name;
    }

    public static addClass(className: string, _class: any) {
        this._classMap[className] = _class;
    }

    public static getClass(className: string) {
        return this._classMap[className];
    }

}

type ClassMapData = {
    [className: string]: any;
}