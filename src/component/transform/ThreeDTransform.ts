import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Transform } from "./Transform";
// import { Matrix4 } from "../../math/Matrix4";
import { cacheGetter } from "../../definition/typescript/decorator/cache";
import { Vector3 } from "../../math/Vector3";
// import { cloneAttributeAsCloneable, cloneAttributeAsBasicType } from "../../definition/typescript/decorator/clone";
import { Quaternion } from "../../math/Quaternion";
import { ThreeDTransformData } from "./ThreeDTransformData";
import {
    createIndexInArrayBuffer,
    getLocalPosition, getLocalToWorldMatrix, getPosition, init, initData, setBatchDatas,
    setLocalPosition,
    setParent,
    setPosition
} from "./ThreeDTransformSystem";
import { addComponent, getParent, disposeComponent } from "./ThreeDTransformSystem";
import { Map } from "immutable";
import { GlobalTempData } from "../../definition/GlobalTempData";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
// import { Collection } from "wonder-commonlib/dist/es2015/Collection";
// import { Matrix3 } from "../../math/Matrix3";
// import { ETransformState } from "./ETransformState";
// import { EventManager } from "../../event/EventManager";
// import { CustomEvent } from "../../event/object/CustomEvent";
// import { EEngineEvent } from "../../event/EEngineEvent";
// import { Log } from "../../utils/Log";
import { Matrix4 } from "../../math/Matrix4";

@registerClass("ThreeDTransform")
export class ThreeDTransform extends Transform {
    public static create() {
        var obj = new this();

        obj.initWhenCreate();

        return obj;
    }

    public static setBatchTransformDatas(batchData:Array<BatchTransformData>) {
        setBatchDatas(batchData, GlobalTempData, ThreeDTransformData);
    }

    // public selfLocalToWorldMatrix:Matrix4 = Matrix4.create();
    // private _localToWorldMatrix: Matrix4 = null;
    // @cacheGetter(function() {
    //     return this._localToWorldMatrixCache !== null;
    // }, function() {
    //     return this._localToWorldMatrixCache;
    // }, function(result) {
    //     this._localToWorldMatrixCache = result;
    // })
    get localToWorldMatrix() {
        // if (this._isUserSpecifyTheLocalToWorldMatrix) {
        //     return this._userLocalToWorldMatrix;
        //

        // return this.getMatrix<Matrix4>("sync", "_localToWorldMatrix");
        return getLocalToWorldMatrix(this, ThreeDTransformData, this.tempLocalToWorldMatrix);
    }
    // set localToWorldMatrix(matrix: Matrix4) {
    // this._isUserSpecifyTheLocalToWorldMatrix = true;

    // this._userLocalToWorldMatrix = matrix;

    // this.isTransform = true;
    // }

    // @cacheGetter(function() {
    //     return this._normalMatrixCache !== null;
    // }, function() {
    //     return this._normalMatrixCache;
    // }, function(result) {
    //     this._normalMatrixCache = result;
    // })
    // get normalMatrix() {
    //     return this.localToWorldMatrix.invertTo3x3().transpose();
    // }

    // public selfPosition:Vector3 = Vector3.create();
    // private _position: Vector3 = Vector3.create();
    // @cloneAttributeAsCloneable()
    // @cacheGetter(function() {
    //     return this._positionCache !== null;
    // }, function() {
    //     return this._positionCache;
    // }, function(result) {
    //     this._positionCache = result;
    // })
    get position() {
        // this._position = this.localToWorldMatrix.getTranslation();
        //
        // return this._position;
        return getPosition(this, ThreeDTransformData);
    }
    set position(position: Vector3) {
        // if (this.p_parent === null) {
        //     this._localPosition = position;
        // }
        // else {
        //     this._localPosition = this.p_parent.localToWorldMatrix.clone().invert().multiplyPoint(position);
        // }
        //
        // this.isTranslate = true;
        setPosition(this, position, GlobalTempData, ThreeDTransformData);
        // setPosition(this, position, GlobalTempData, ThreeDTransformData);
    }

    // private _rotation: Quaternion = Quaternion.create(0, 0, 0, 1);
    // @cloneAttributeAsCloneable()
    // @cacheGetter(function() {
    //     return this._rotationCache !== null;
    // }, function() {
    //     return this._rotationCache;
    // }, function(result) {
    //     this._rotationCache = result;
    // })
    // get rotation() {
    //     this._rotation.setFromMatrix(this.localToWorldMatrix);
    //
    //     return this._rotation;
    // }
    // set rotation(rotation: Quaternion) {
    //     if (this.p_parent === null) {
    //         this._localRotation = rotation;
    //     }
    //     else {
    //         this._localRotation = this.p_parent.rotation.clone().invert().multiply(rotation);
    //     }
    //
    //     this.isRotate = true;
    // }
    //
    // private _scale: Vector3 = Vector3.create(1, 1, 1);
    // @cloneAttributeAsCloneable()
    // @cacheGetter(function() {
    //     return this._scaleCache !== null;
    // }, function() {
    //     return this._scaleCache;
    // }, function(result) {
    //     this._scaleCache = result;
    // })
    // get scale() {
    //     this._scale = this.localToWorldMatrix.getScale();
    //
    //     return this._scale;
    // }
    // set scale(scale: Vector3) {
    //     if (this.p_parent === null) {
    //         this._localScale = scale;
    //     }
    //     else {
    //         this._localScale = this.p_parent.localToWorldMatrix.clone().invert().multiplyVector3(scale);
    //     }
    //
    //     this.isScale = true;
    // }
    //
    // private _eulerAngles: Vector3 = null;
    // @cacheGetter(function() {
    //     return this._eulerAnglesCache !== null;
    // }, function() {
    //     return this._eulerAnglesCache;
    // }, function(result) {
    //     this._eulerAnglesCache = result;
    // })
    // get eulerAngles() {
    //     this._eulerAngles = this.localToWorldMatrix.getEulerAngles();
    //     return this._eulerAngles;
    // }
    // set eulerAngles(eulerAngles: Vector3) {
    //     this._localRotation.setFromEulerAngles(eulerAngles);
    //
    //     if (this.p_parent !== null) {
    //         this._localRotation = this.p_parent.rotation.clone().invert().multiply(this._localRotation);
    //     }
    //
    //     this.isRotate = true;
    // }
    //

    // public selfLocalPosition:Vector3 = Vector3.create();
    // private _localPosition: Vector3 = Vector3.create(0, 0, 0);
    // @cloneAttributeAsCloneable()
    get localPosition() {
        // return this._localPosition;

        return getLocalPosition(this, ThreeDTransformData);
    }
    set localPosition(position: Vector3) {
        // this._localPosition = position;
        //
        // this.isLocalTranslate = true;
        setLocalPosition(this, position, ThreeDTransformData);
    }

    // public selfLocalRotation: Quaternion = Quaternion.create(0, 0, 0, 1);
    // private _localRotation: Quaternion = Quaternion.create(0, 0, 0, 1);
    // @cloneAttributeAsCloneable()
    // get localRotation() {
    //     return this._localRotation;
    // }
    // set localRotation(rotation: Quaternion) {
    //     this._localRotation = rotation;
    //
    //     this.isLocalRotate = true;
    // }
    //
    // private _localEulerAngles: Vector3 = null;
    // @cacheGetter(function() {
    //     return this._localEulerAnglesCache !== null;
    // }, function() {
    //     return this._localEulerAnglesCache;
    // }, function(result) {
    //     this._localEulerAnglesCache = result;
    // })
    // get localEulerAngles() {
    //     this._localEulerAngles = this._localRotation.getEulerAngles();
    //
    //     return this._localEulerAngles;
    // }
    // set localEulerAngles(localEulerAngles: Vector3) {
    //     this._localRotation.setFromEulerAngles(localEulerAngles);
    //
    //     this.isLocalRotate = true;
    // }

    // public selfLocalScale: Vector3 = Vector3.create(1, 1, 1);
    // private _localScale: Vector3 = Vector3.create(1, 1, 1);
    // @cloneAttributeAsCloneable()
    // get localScale() {
    //     return this._localScale;
    // }
    // set localScale(scale: Vector3) {
    //     this._localScale = scale;
    //
    //     this.isLocalScale = true;
    // }
    //
    // get up() {
    //     return this.localToWorldMatrix.getY().normalize();
    // }
    //
    // get right() {
    //     return this.localToWorldMatrix.getX().normalize();
    // }
    //
    // get forward() {
    //     //todo why scale(-1)?
    //     //return this.localToWorldMatrix.getZ().normalize();
    //     return this.localToWorldMatrix.getZ().normalize().scale(-1);
    // }
    //
    //
    // public dirtyWorld: boolean = null;
    //
    // protected p_parent: ThreeDTransform;
    // protected children: Collection<ThreeDTransform>;
    //
    // private _localToParentMatrix: Matrix4 = Matrix4.create();
    // private _localToWorldMatrixCache: Matrix4 = null;
    // private _positionCache: Vector3 = null;
    // private _rotationCache: Vector3 = null;
    // private _scaleCache: Vector3 = null;
    // private _eulerAnglesCache: Vector3 = null;
    // private _localEulerAnglesCache: Vector3 = null;
    // private _normalMatrixCache: Matrix3 = null;
    // // @cloneAttributeAsBasicType()
    // // private _isUserSpecifyTheLocalToWorldMatrix: boolean = false;
    // // @cloneAttributeAsCloneable()
    // // private _userLocalToWorldMatrix = null;



    // public selfParent: Transform = null;
    // protected p_parent: Transform = null;
    // @cloneAttributeAsBasicType()
    get parent() {
        // return this.p_parent;
        return getParent(this, ThreeDTransformData);
    }
    set parent(parent: ThreeDTransform) {
        // this.setParent(parent);
        setParent(this, parent, ThreeDTransformData);
    }

    public localToWorldMatrixCache: Matrix4 = null;
    public tempLocalToWorldMatrix: Matrix4 = Matrix4.create();
    public positionCache: Vector3 = null;
    public tempPosition: Vector3 = Vector3.create();
    public localPositionCache: Vector3 = null;
    public tempLocalPosition: Vector3 = Vector3.create();
    public isTranslate:boolean = false;

    // public setBatchPositions(batchData:Array<BatchPositionData>){
    //     setBatchPositions(batchData, GlobalTempData, ThreeDTransformData);
    // }

    public addToSystem() {
        addComponent(this, ThreeDTransformData);
    }

    public disposeFromSystem() {
        disposeComponent(this, GlobalTempData, ThreeDTransformData);
    }

    public init(state: Map<any, any>) {
        return init(GlobalTempData, ThreeDTransformData, state);
    }

    public initWhenCreate() {
        createIndexInArrayBuffer(this, ThreeDTransformData);
    }

    //
    // public sync() {
    //     if (this.dirtyLocal) {
    //         this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);
    //
    //         this.dirtyLocal = false;
    //         this.dirtyWorld = true;
    //     }
    //
    //     if (this.dirtyWorld) {
    //         if (this.p_parent === null) {
    //             this._localToWorldMatrix = this._localToParentMatrix.clone();
    //         }
    //         else {
    //             this._localToWorldMatrix = this.p_parent.localToWorldMatrix.clone().multiply(this._localToParentMatrix);
    //         }
    //
    //         this.dirtyWorld = false;
    //
    //         this.children.forEach((child: ThreeDTransform) => {
    //             child.dirtyWorld = true;
    //         });
    //     }
    // }
    //
    // public translateLocal(translation: Vector3);
    // public translateLocal(x: number, y: number, z: number);
    //
    //
    // public translateLocal(...args) {
    //     var translation = null;
    //
    //     if (args.length === 3) {
    //         translation = Vector3.create(args[0], args[1], args[2]);
    //     }
    //     else {
    //         translation = args[0];
    //     }
    //
    //     this._localPosition = this._localPosition.add(this._localRotation.multiplyVector3(translation));
    //
    //     this.isTranslate = true;
    //
    //     return this;
    // }
    //
    // public translate(translation: Vector3);
    // public translate(x: number, y: number, z: number);
    //
    // public translate(...args) {
    //     var translation = null;
    //
    //     if (args.length === 3) {
    //         translation = Vector3.create(args[0], args[1], args[2]);
    //     }
    //     else {
    //         translation = args[0];
    //     }
    //
    //     this.position = translation.add(this.position);
    //
    //     return this;
    // }
    //
    // public rotate(eulerAngles: Vector3);
    // public rotate(x: number, y: number, z: number);
    //
    // public rotate(...args) {
    //     var eulerAngles = null,
    //         quaternion = Quaternion.create();
    //
    //     if (args.length === 3) {
    //         eulerAngles = Vector3.create(args[0], args[1], args[2]);
    //     }
    //     else {
    //         eulerAngles = args[0];
    //     }
    //
    //     quaternion.setFromEulerAngles(eulerAngles);
    //
    //     if (this.p_parent === null) {
    //         this._localRotation = quaternion.multiply(this._localRotation);
    //     }
    //     else {
    //         //todo why?
    //         quaternion = this.p_parent.rotation.clone().invert().multiply(quaternion);
    //         this._localRotation = quaternion.multiply(this.rotation);
    //     }
    //
    //     this.isRotate = true;
    //
    //     return this;
    // }
    //
    // public rotateLocal(eulerAngles: Vector3);
    // public rotateLocal(x: number, y: number, z: number);
    //
    // public rotateLocal(...args) {
    //     var eulerAngles = null,
    //         quaternion = Quaternion.create();
    //
    //     if (args.length === 3) {
    //         eulerAngles = Vector3.create(args[0], args[1], args[2]);
    //     }
    //     else {
    //         eulerAngles = args[0];
    //     }
    //
    //     quaternion.setFromEulerAngles(eulerAngles);
    //
    //     this._localRotation.multiply(quaternion);
    //
    //     this.isRotate = true;
    //
    //     return this;
    // }
    //
    // public rotateAround(angle: number, center: Vector3, axis: Vector3);
    // public rotateAround(angle: number, centerX: number, centerY: number, centerZ: number, axisX: number, axisY: number, axisZ: number);
    //
    // public rotateAround(...args) {
    //     var angle = null,
    //         center = null,
    //         axis = null,
    //         rot: Quaternion = null,
    //         dir: Vector3 = null;
    //
    //     if (args.length === 3) {
    //         angle = args[0];
    //         center = args[1];
    //         axis = args[2];
    //     }
    //     else {
    //         angle = args[0];
    //         center = Vector3.create(args[1], args[2], args[3]);
    //         axis = Vector3.create(args[4], args[5], args[6]);
    //     }
    //
    //     rot = Quaternion.create().setFromAxisAngle(angle, axis);
    //     // find current direction relative to center
    //     dir = this.position.clone().sub(center);
    //
    //     // rotate the direction
    //     dir = rot.multiplyVector3(dir);
    //
    //     // define new position
    //     this.position = center.add(dir);
    //     //todo why "this.rotation = this.rotation.multiply(rot)" will cause entityObject rotate direction around self?
    //     this.rotation = rot.multiply(this.rotation);
    //
    //     return this;
    // }
    //
    // public lookAt(target: Vector3);
    // public lookAt(targetX: number, targetY: number, targetZ: number);
    // public lookAt(target: Vector3, up: Vector3);
    // public lookAt(targetX: number, targetY: number, targetZ: number, upX: number, upY: number, upZ: number);
    //
    // public lookAt(...args) {
    //     var target = null,
    //         up = null;
    //
    //     if (args.length === 1) {
    //         target = args[0];
    //         up = Vector3.up;
    //     }
    //     else if (args.length === 2) {
    //         target = args[0];
    //         up = args[1];
    //     }
    //     else if (args.length === 3) {
    //         target = Vector3.create(args[0], args[1], args[2]);
    //         up = Vector3.up;
    //     }
    //     else {
    //         target = Vector3.create(args[0], args[1], args[2]);
    //         up = Vector3.create(args[3], args[4], args[5]);
    //     }
    //
    //     this.rotation = Quaternion.create().setFromMatrix(Matrix4.create().setLookAt(this.position, target, up));
    //
    //     return this;
    // }
    //
    // protected clearCache() {
    //     this._localToWorldMatrixCache = null;
        // this._normalMatrixCache = null;
        // this._positionCache = null;
        // this._rotationCache = null;
        // this._scaleCache = null;
        // this._eulerAnglesCache = null;
        // this._localEulerAnglesCache = null;
    // }
    //
    // protected handleWhenSetTransformState(transformState?: ETransformState): void {
    //     var eventName: string = null;
    //
    //     if (transformState === void 0) {
    //         EventManager.trigger(this.entityObject, CustomEvent.create(<any>EEngineEvent.TRANSFORM_TRANSLATE));
    //         EventManager.trigger(this.entityObject, CustomEvent.create(<any>EEngineEvent.TRANSFORM_ROTATE));
    //         EventManager.trigger(this.entityObject, CustomEvent.create(<any>EEngineEvent.TRANSFORM_SCALE));
    //
    //         return;
    //     }
    //
    //     switch (transformState) {
    //         case ETransformState.ISTRANSLATE:
    //             eventName = <any>EEngineEvent.TRANSFORM_TRANSLATE;
    //             break;
    //         case ETransformState.ISROTATE:
    //             eventName = <any>EEngineEvent.TRANSFORM_ROTATE;
    //             break;
    //         case ETransformState.ISSCALE:
    //             eventName = <any>EEngineEvent.TRANSFORM_SCALE;
    //             break;
    //         default:
    //             Log.error(true, Log.info.FUNC_UNKNOW(`transformState:${transformState}`));
    //             break;
    //     }
    //
    //     EventManager.trigger(this.entityObject, CustomEvent.create(eventName));
    // }
}

export interface BatchTransformData{
    uid:number;
    position:Vector3;
    localPosition:Vector3;
}

initData(GlobalTempData, ThreeDTransformData);
