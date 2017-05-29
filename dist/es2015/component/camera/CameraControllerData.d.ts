import { ComponentGameObjectMap } from "../ComponentData";
import { Matrix4 } from "../../math/Matrix4";
export declare class CameraControllerData {
    static index: number;
    static count: number;
    static dirtyIndexArray: Array<number>;
    static gameObjectMap: ComponentGameObjectMap;
    static worldToCameraMatrixCacheMap: WorldToCameraMatrixCacheMap;
}
export declare type WorldToCameraMatrixCacheMap = {
    [index: number]: Matrix4;
};
