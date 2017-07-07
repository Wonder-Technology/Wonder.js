import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Light } from "./Light";

export class LightData {
    public static index:number = null;
    public static count:number = null;

    public static gameObjectMap: Array<GameObject> = null;
    public static lightMap: Array<Light> = null;

    public static defaultColorArr:Array<number> = null;
}

