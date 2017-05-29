import { ComponentGameObjectMap } from "../ComponentData";
import { Matrix4 } from "../../math/Matrix4";

export class CameraControllerData {
    public static index: number = null;
    public static count: number = null;

    public static dirtyIndexArray: Array<number> = null;
    public static gameObjectMap: ComponentGameObjectMap = null;

    public static worldToCameraMatrixCacheMap: WorldToCameraMatrixCacheMap = null;
}

export type WorldToCameraMatrixCacheMap = {
    [index: number]: Matrix4
}

