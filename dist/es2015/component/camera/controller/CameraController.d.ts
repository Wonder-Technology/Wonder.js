import "wonder-frp/dist/es2015/stream/MergeAllStream";
import { Component } from "../../../core/Component";
import { Camera } from "../Camera";
import { Matrix4 } from "../../../math/Matrix4";
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
export declare abstract class CameraController extends Component {
    constructor(cameraComponent: Camera);
    readonly cameraToWorldMatrix: Matrix4;
    readonly worldToCameraMatrix: Matrix4;
    pMatrix: Matrix4;
    entityObject: GameObject;
    camera: Camera;
    private _worldToCameraMatrixCache;
    private _clearCacheSubscription;
    init(): void;
    update(elapsed: number): void;
    dispose(): void;
    clone(): this;
    protected bindClearCacheEvent(): void;
    protected disposeClearCacheEvent(): void;
    private _clearCache();
    private _getWorldToCameraMatrix();
}
