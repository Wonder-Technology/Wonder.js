import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Light } from "./Light";

export class SpecifyLightData {
    public static index:number = null;
    public static count:number = null;

    public static gameObjectMap: Array<GameObject> = null;
    public static lightMap: Array<Light> = null;

    public static renderDataMap:Array<any> = null;
    public static defaultColorArr: Array<number> = null;
}

