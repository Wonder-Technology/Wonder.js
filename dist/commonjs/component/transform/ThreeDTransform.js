"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var Transform_1 = require("./Transform");
var Matrix4_1 = require("../../math/Matrix4");
var cache_1 = require("../../definition/typescript/decorator/cache");
var Vector3_1 = require("../../math/Vector3");
var clone_1 = require("../../definition/typescript/decorator/clone");
var Quaternion_1 = require("../../math/Quaternion");
var ETransformState_1 = require("./ETransformState");
var EventManager_1 = require("../../event/EventManager");
var CustomEvent_1 = require("../../event/object/CustomEvent");
var EEngineEvent_1 = require("../../event/EEngineEvent");
var Log_1 = require("../../utils/Log");
var ThreeDTransform = (function (_super) {
    __extends(ThreeDTransform, _super);
    function ThreeDTransform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._localToWorldMatrix = null;
        _this._position = Vector3_1.Vector3.create();
        _this._rotation = Quaternion_1.Quaternion.create(0, 0, 0, 1);
        _this._scale = Vector3_1.Vector3.create(1, 1, 1);
        _this._eulerAngles = null;
        _this._localPosition = Vector3_1.Vector3.create(0, 0, 0);
        _this._localRotation = Quaternion_1.Quaternion.create(0, 0, 0, 1);
        _this._localEulerAngles = null;
        _this._localScale = Vector3_1.Vector3.create(1, 1, 1);
        _this.dirtyWorld = null;
        _this._localToParentMatrix = Matrix4_1.Matrix4.create();
        _this._localToWorldMatrixCache = null;
        _this._positionCache = null;
        _this._rotationCache = null;
        _this._scaleCache = null;
        _this._eulerAnglesCache = null;
        _this._localEulerAnglesCache = null;
        _this._normalMatrixCache = null;
        _this._isUserSpecifyTheLocalToWorldMatrix = false;
        _this._userLocalToWorldMatrix = null;
        return _this;
    }
    ThreeDTransform.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(ThreeDTransform.prototype, "localToWorldMatrix", {
        get: function () {
            if (this._isUserSpecifyTheLocalToWorldMatrix) {
                return this._userLocalToWorldMatrix;
            }
            return this.getMatrix("sync", "_localToWorldMatrix");
        },
        set: function (matrix) {
            this._isUserSpecifyTheLocalToWorldMatrix = true;
            this._userLocalToWorldMatrix = matrix;
            this.isTransform = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "normalMatrix", {
        get: function () {
            return this.localToWorldMatrix.invertTo3x3().transpose();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "position", {
        get: function () {
            this._position = this.localToWorldMatrix.getTranslation();
            return this._position;
        },
        set: function (position) {
            if (this.p_parent === null) {
                this._localPosition = position;
            }
            else {
                this._localPosition = this.p_parent.localToWorldMatrix.clone().invert().multiplyPoint(position);
            }
            this.isTranslate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "rotation", {
        get: function () {
            this._rotation.setFromMatrix(this.localToWorldMatrix);
            return this._rotation;
        },
        set: function (rotation) {
            if (this.p_parent === null) {
                this._localRotation = rotation;
            }
            else {
                this._localRotation = this.p_parent.rotation.clone().invert().multiply(rotation);
            }
            this.isRotate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "scale", {
        get: function () {
            this._scale = this.localToWorldMatrix.getScale();
            return this._scale;
        },
        set: function (scale) {
            if (this.p_parent === null) {
                this._localScale = scale;
            }
            else {
                this._localScale = this.p_parent.localToWorldMatrix.clone().invert().multiplyVector3(scale);
            }
            this.isScale = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "eulerAngles", {
        get: function () {
            this._eulerAngles = this.localToWorldMatrix.getEulerAngles();
            return this._eulerAngles;
        },
        set: function (eulerAngles) {
            this._localRotation.setFromEulerAngles(eulerAngles);
            if (this.p_parent !== null) {
                this._localRotation = this.p_parent.rotation.clone().invert().multiply(this._localRotation);
            }
            this.isRotate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "localPosition", {
        get: function () {
            return this._localPosition;
        },
        set: function (position) {
            this._localPosition = position;
            this.isLocalTranslate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "localRotation", {
        get: function () {
            return this._localRotation;
        },
        set: function (rotation) {
            this._localRotation = rotation;
            this.isLocalRotate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "localEulerAngles", {
        get: function () {
            this._localEulerAngles = this._localRotation.getEulerAngles();
            return this._localEulerAngles;
        },
        set: function (localEulerAngles) {
            this._localRotation.setFromEulerAngles(localEulerAngles);
            this.isLocalRotate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "localScale", {
        get: function () {
            return this._localScale;
        },
        set: function (scale) {
            this._localScale = scale;
            this.isLocalScale = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "up", {
        get: function () {
            return this.localToWorldMatrix.getY().normalize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "right", {
        get: function () {
            return this.localToWorldMatrix.getX().normalize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "forward", {
        get: function () {
            return this.localToWorldMatrix.getZ().normalize().scale(-1);
        },
        enumerable: true,
        configurable: true
    });
    ThreeDTransform.prototype.sync = function () {
        if (this.dirtyLocal) {
            this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);
            this.dirtyLocal = false;
            this.dirtyWorld = true;
        }
        if (this.dirtyWorld) {
            if (this.p_parent === null) {
                this._localToWorldMatrix = this._localToParentMatrix.clone();
            }
            else {
                this._localToWorldMatrix = this.p_parent.localToWorldMatrix.clone().multiply(this._localToParentMatrix);
            }
            this.dirtyWorld = false;
            this.children.forEach(function (child) {
                child.dirtyWorld = true;
            });
        }
    };
    ThreeDTransform.prototype.translateLocal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var translation = null;
        if (args.length === 3) {
            translation = Vector3_1.Vector3.create(args[0], args[1], args[2]);
        }
        else {
            translation = args[0];
        }
        this._localPosition = this._localPosition.add(this._localRotation.multiplyVector3(translation));
        this.isTranslate = true;
        return this;
    };
    ThreeDTransform.prototype.translate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var translation = null;
        if (args.length === 3) {
            translation = Vector3_1.Vector3.create(args[0], args[1], args[2]);
        }
        else {
            translation = args[0];
        }
        this.position = translation.add(this.position);
        return this;
    };
    ThreeDTransform.prototype.rotate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eulerAngles = null, quaternion = Quaternion_1.Quaternion.create();
        if (args.length === 3) {
            eulerAngles = Vector3_1.Vector3.create(args[0], args[1], args[2]);
        }
        else {
            eulerAngles = args[0];
        }
        quaternion.setFromEulerAngles(eulerAngles);
        if (this.p_parent === null) {
            this._localRotation = quaternion.multiply(this._localRotation);
        }
        else {
            quaternion = this.p_parent.rotation.clone().invert().multiply(quaternion);
            this._localRotation = quaternion.multiply(this.rotation);
        }
        this.isRotate = true;
        return this;
    };
    ThreeDTransform.prototype.rotateLocal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eulerAngles = null, quaternion = Quaternion_1.Quaternion.create();
        if (args.length === 3) {
            eulerAngles = Vector3_1.Vector3.create(args[0], args[1], args[2]);
        }
        else {
            eulerAngles = args[0];
        }
        quaternion.setFromEulerAngles(eulerAngles);
        this._localRotation.multiply(quaternion);
        this.isRotate = true;
        return this;
    };
    ThreeDTransform.prototype.rotateAround = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var angle = null, center = null, axis = null, rot = null, dir = null;
        if (args.length === 3) {
            angle = args[0];
            center = args[1];
            axis = args[2];
        }
        else {
            angle = args[0];
            center = Vector3_1.Vector3.create(args[1], args[2], args[3]);
            axis = Vector3_1.Vector3.create(args[4], args[5], args[6]);
        }
        rot = Quaternion_1.Quaternion.create().setFromAxisAngle(angle, axis);
        dir = this.position.clone().sub(center);
        dir = rot.multiplyVector3(dir);
        this.position = center.add(dir);
        this.rotation = rot.multiply(this.rotation);
        return this;
    };
    ThreeDTransform.prototype.lookAt = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var target = null, up = null;
        if (args.length === 1) {
            target = args[0];
            up = Vector3_1.Vector3.up;
        }
        else if (args.length === 2) {
            target = args[0];
            up = args[1];
        }
        else if (args.length === 3) {
            target = Vector3_1.Vector3.create(args[0], args[1], args[2]);
            up = Vector3_1.Vector3.up;
        }
        else {
            target = Vector3_1.Vector3.create(args[0], args[1], args[2]);
            up = Vector3_1.Vector3.create(args[3], args[4], args[5]);
        }
        this.rotation = Quaternion_1.Quaternion.create().setFromMatrix(Matrix4_1.Matrix4.create().setLookAt(this.position, target, up));
        return this;
    };
    ThreeDTransform.prototype.clearCache = function () {
        this._localToWorldMatrixCache = null;
        this._normalMatrixCache = null;
        this._positionCache = null;
        this._rotationCache = null;
        this._scaleCache = null;
        this._eulerAnglesCache = null;
        this._localEulerAnglesCache = null;
    };
    ThreeDTransform.prototype.handleWhenSetTransformState = function (transformState) {
        var eventName = null;
        if (transformState === void 0) {
            EventManager_1.EventManager.trigger(this.entityObject, CustomEvent_1.CustomEvent.create(EEngineEvent_1.EEngineEvent.TRANSFORM_TRANSLATE));
            EventManager_1.EventManager.trigger(this.entityObject, CustomEvent_1.CustomEvent.create(EEngineEvent_1.EEngineEvent.TRANSFORM_ROTATE));
            EventManager_1.EventManager.trigger(this.entityObject, CustomEvent_1.CustomEvent.create(EEngineEvent_1.EEngineEvent.TRANSFORM_SCALE));
            return;
        }
        switch (transformState) {
            case ETransformState_1.ETransformState.ISTRANSLATE:
                eventName = EEngineEvent_1.EEngineEvent.TRANSFORM_TRANSLATE;
                break;
            case ETransformState_1.ETransformState.ISROTATE:
                eventName = EEngineEvent_1.EEngineEvent.TRANSFORM_ROTATE;
                break;
            case ETransformState_1.ETransformState.ISSCALE:
                eventName = EEngineEvent_1.EEngineEvent.TRANSFORM_SCALE;
                break;
            default:
                Log_1.Log.error(true, Log_1.Log.info.FUNC_UNKNOW("transformState:" + transformState));
                break;
        }
        EventManager_1.EventManager.trigger(this.entityObject, CustomEvent_1.CustomEvent.create(eventName));
    };
    return ThreeDTransform;
}(Transform_1.Transform));
__decorate([
    cache_1.cacheGetter(function () {
        return this._localToWorldMatrixCache !== null;
    }, function () {
        return this._localToWorldMatrixCache;
    }, function (result) {
        this._localToWorldMatrixCache = result;
    })
], ThreeDTransform.prototype, "localToWorldMatrix", null);
__decorate([
    cache_1.cacheGetter(function () {
        return this._normalMatrixCache !== null;
    }, function () {
        return this._normalMatrixCache;
    }, function (result) {
        this._normalMatrixCache = result;
    })
], ThreeDTransform.prototype, "normalMatrix", null);
__decorate([
    clone_1.cloneAttributeAsCloneable(),
    cache_1.cacheGetter(function () {
        return this._positionCache !== null;
    }, function () {
        return this._positionCache;
    }, function (result) {
        this._positionCache = result;
    })
], ThreeDTransform.prototype, "position", null);
__decorate([
    clone_1.cloneAttributeAsCloneable(),
    cache_1.cacheGetter(function () {
        return this._rotationCache !== null;
    }, function () {
        return this._rotationCache;
    }, function (result) {
        this._rotationCache = result;
    })
], ThreeDTransform.prototype, "rotation", null);
__decorate([
    clone_1.cloneAttributeAsCloneable(),
    cache_1.cacheGetter(function () {
        return this._scaleCache !== null;
    }, function () {
        return this._scaleCache;
    }, function (result) {
        this._scaleCache = result;
    })
], ThreeDTransform.prototype, "scale", null);
__decorate([
    cache_1.cacheGetter(function () {
        return this._eulerAnglesCache !== null;
    }, function () {
        return this._eulerAnglesCache;
    }, function (result) {
        this._eulerAnglesCache = result;
    })
], ThreeDTransform.prototype, "eulerAngles", null);
__decorate([
    clone_1.cloneAttributeAsCloneable()
], ThreeDTransform.prototype, "localPosition", null);
__decorate([
    clone_1.cloneAttributeAsCloneable()
], ThreeDTransform.prototype, "localRotation", null);
__decorate([
    cache_1.cacheGetter(function () {
        return this._localEulerAnglesCache !== null;
    }, function () {
        return this._localEulerAnglesCache;
    }, function (result) {
        this._localEulerAnglesCache = result;
    })
], ThreeDTransform.prototype, "localEulerAngles", null);
__decorate([
    clone_1.cloneAttributeAsCloneable()
], ThreeDTransform.prototype, "localScale", null);
__decorate([
    clone_1.cloneAttributeAsBasicType()
], ThreeDTransform.prototype, "_isUserSpecifyTheLocalToWorldMatrix", void 0);
__decorate([
    clone_1.cloneAttributeAsCloneable()
], ThreeDTransform.prototype, "_userLocalToWorldMatrix", void 0);
ThreeDTransform = __decorate([
    registerClass_1.registerClass("ThreeDTransform")
], ThreeDTransform);
exports.ThreeDTransform = ThreeDTransform;
//# sourceMappingURL=ThreeDTransform.js.map