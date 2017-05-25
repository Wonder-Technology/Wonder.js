import { Matrix4 } from "../../math/Matrix4";

export class CameraData{
    public static nearMap:NearMap = null;
    public static farMap:FarMap = null;
    public static worldToCameraMatrixMap:WorldToCameraMatrixMap = null;
    public static pMatrixMap:PMatrixMap = null;
}

export type NearMap = {
    [cameraControllerIndex:number]: number
}

export type FarMap = {
    [cameraControllerIndex:number]: number
}

export type WorldToCameraMatrixMap = {
    [cameraControllerIndex:number]: Matrix4
}

export type PMatrixMap = {
    [cameraControllerIndex:number]: Matrix4
}
