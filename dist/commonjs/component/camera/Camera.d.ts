import { Matrix4 } from "../../math/Matrix4";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
export declare abstract class Camera {
    readonly cameraToWorldMatrix: Matrix4;
    private _worldToCameraMatrix;
    worldToCameraMatrix: Matrix4;
    private _near;
    near: number;
    private _far;
    far: number;
    private _pMatrix;
    pMatrix: Matrix4;
    entityObject: GameObject;
    protected pMatrixDirty: boolean;
    private _isUserSpecifyThePMatrix;
    init(): void;
    dispose(): void;
    clone(): this;
    update(elapsed: number): void;
    protected abstract updateProjectionMatrix(): any;
    protected getInvViewProjMat(): Matrix4;
    private _updateProjectionMatrix();
}
