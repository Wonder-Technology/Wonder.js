import { registerClass } from "../definition/typescript/decorator/registerClass";
import { StandardBasicMaterial } from "./StandardBasicMaterial";

@registerClass("BasicMaterial")
export class BasicMaterial extends StandardBasicMaterial {
    public static create() {
        var obj = new this();

        obj.initWhenCreate();

        return obj;
    }

    // public getTextureForRenderSort():Texture{
    //     // return this.mapList.getChild(0);
    //     return null;
    // }
}