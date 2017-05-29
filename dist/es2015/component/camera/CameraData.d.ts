import { Matrix4 } from "../../math/Matrix4";
export declare class CameraData {
    static nearMap: NearMap;
    static farMap: FarMap;
    static worldToCameraMatrixMap: WorldToCameraMatrixMap;
    static pMatrixMap: PMatrixMap;
}
export declare type NearMap = {
    [cameraControllerIndex: number]: number;
};
export declare type FarMap = {
    [cameraControllerIndex: number]: number;
};
export declare type WorldToCameraMatrixMap = {
    [cameraControllerIndex: number]: Matrix4;
};
export declare type PMatrixMap = {
    [cameraControllerIndex: number]: Matrix4;
};
