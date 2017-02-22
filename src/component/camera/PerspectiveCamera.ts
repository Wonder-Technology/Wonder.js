import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Camera } from "./Camera";
import { cloneAttributeAsBasicType } from "../../definition/typescript/decorator/clone";

declare var Math: any;

@registerClass("PerspectiveCamera")
export class PerspectiveCamera extends Camera {
    public static create() {
        var obj = new this();

        return obj;
    }

    private _fovy: number = null;
    @cloneAttributeAsBasicType()
    get fovy() {
        return this._fovy;
    }
    set fovy(fovy: number) {
        this._fovy = fovy;
        this.pMatrixDirty = true;
    }

    private _aspect: number = null;
    @cloneAttributeAsBasicType()
    get aspect() {
        return this._aspect;
    }
    set aspect(aspect: number) {
        this._aspect = aspect;
        this.pMatrixDirty = true;
    }

    public zoomIn(speed: number, min: number = 1) {
        this.fovy = Math.max(this.fovy - speed, min);
    }
    public zoomOut(speed: number, max: number = 179) {
        this.fovy = Math.min(this.fovy + speed, max);
    }

    // public convertScreenToWorld(screenX:number, screenY:number, distanceFromCamera:number):Vector3{
    //     var device:DeviceManager = DeviceManager.getInstance(),
    //         width = device.view.width,
    //         height = device.view.height,
    //         normalizedDeviceCoordinate = Vector3.create(2 * screenX / width - 1, 1 - 2 * screenY / height, 1),
    //         invViewProjMat = this.getInvViewProjMat(),
    //         point = null,
    //         w = null;
    //
    //     point = invViewProjMat.multiplyPoint(normalizedDeviceCoordinate);
    //
    //     w = normalizedDeviceCoordinate.x * invViewProjMat.values[3] +
    //         normalizedDeviceCoordinate.y * invViewProjMat.values[7] +
    //         normalizedDeviceCoordinate.z * invViewProjMat.values[11] +
    //         invViewProjMat.values[15];
    //
    //     point.scale(1 / w);
    //
    //     return Vector3.create().lerp(this.entityObject.transform.position, point, distanceFromCamera / this.far);
    // }
    //
    // public convertWorldToScreen(worldX:number, worldY:number, worldZ:number, screenWidth:number, screenHeight:number):Vector2{
    //     var viewProjectionMatrix:Matrix4 = this.worldToCameraMatrix.clone().applyMatrix(this.pMatrix),
    //         //todo optimize:use temp Vector3, Vector4
    //         normalizedDeviceCoordinate:Vector4 = viewProjectionMatrix.multiplyVector4(Vector4.create(worldX, worldY, worldZ, 1.0)),
    //         ndcSpacePos:Vector3 = Vector3.create(normalizedDeviceCoordinate.x / normalizedDeviceCoordinate.w, normalizedDeviceCoordinate.y / normalizedDeviceCoordinate.w, normalizedDeviceCoordinate.z / normalizedDeviceCoordinate.w);
    //
    //     return Vector2.create(
    //         Math.round((ndcSpacePos.x + 1) / 2.0 * screenWidth),
    //         Math.round((1 - ndcSpacePos.y) / 2.0 * screenHeight)
    //     );
    // }

    protected updateProjectionMatrix() {
        this.pMatrix.setPerspective(this._fovy, this._aspect, this.near, this.far);
    }
}