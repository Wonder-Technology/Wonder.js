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
import { Component } from "../../core/Component";
import { cloneAttributeAsBasicType } from "../../definition/typescript/decorator/clone";
import { ETransformState } from "./ETransformState";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { EventManager } from "../../event/EventManager";
import { EEngineEvent } from "../../event/EEngineEvent";
import { virtual } from "../../definition/typescript/decorator/virtual";
var Transform = (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.p_parent = null;
        _this._isTranslate = false;
        _this._isRotate = false;
        _this._isScale = false;
        _this.dirtyLocal = true;
        _this.children = Collection.create();
        _this._endLoopSubscription = null;
        return _this;
    }
    Object.defineProperty(Transform.prototype, "parent", {
        get: function () {
            return this.p_parent;
        },
        set: function (parent) {
            this.setParent(parent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isTransform", {
        get: function () {
            return this.isTranslate || this.isRotate || this.isScale;
        },
        set: function (isTransform) {
            if (isTransform) {
                this._setGlobalTransformState(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isTranslate", {
        get: function () {
            return this._isTranslate;
        },
        set: function (isTranslate) {
            this._setGlobalTransformState(ETransformState.ISTRANSLATE, isTranslate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isRotate", {
        get: function () {
            return this._isRotate;
        },
        set: function (isRotate) {
            this._setGlobalTransformState(ETransformState.ISROTATE, isRotate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isScale", {
        get: function () {
            return this._isScale;
        },
        set: function (isScale) {
            this._setGlobalTransformState(ETransformState.ISSCALE, isScale);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isLocalTranslate", {
        set: function (isTranslate) {
            this._setLocalTransformState(ETransformState.ISLOCALTRANSLATE, isTranslate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isLocalRotate", {
        set: function (isRotate) {
            this._setLocalTransformState(ETransformState.ISLOCALROTATE, isRotate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isLocalScale", {
        set: function (isScale) {
            this._setLocalTransformState(ETransformState.ISLOCALSCALE, isScale);
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.init = function () {
        var self = this;
        this.clearCache();
        this._endLoopSubscription = EventManager.fromEvent(EEngineEvent.ENDLOOP)
            .subscribe(function () {
            self._resetTransformFlag();
        });
    };
    Transform.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._endLoopSubscription && this._endLoopSubscription.dispose();
    };
    Transform.prototype.addChild = function (child) {
        this.children.addChild(child);
    };
    Transform.prototype.removeChild = function (child) {
        this.children.removeChild(child);
    };
    Transform.prototype.setChildrenTransformState = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var state = args[0];
            if (state) {
                this.children.forEach(function (child) {
                    child.isTransform = true;
                });
            }
        }
        else {
            var transformState_1 = args[0], state = args[1];
            if (state) {
                this.children.forEach(function (child) {
                    child[transformState_1] = true;
                });
            }
        }
    };
    Transform.prototype.handleWhenSetTransformState = function (transformState) {
    };
    Transform.prototype.setParent = function (parent) {
        if (this.p_parent) {
            this.p_parent.removeChild(this);
        }
        if (!parent) {
            this.p_parent = null;
            return;
        }
        this.p_parent = parent;
        this.p_parent.addChild(this);
    };
    Transform.prototype.getMatrix = function (syncMethod, matrixAttriName) {
        var syncList = Collection.create(), current = this.p_parent;
        syncList.addChild(this);
        while (current !== null) {
            syncList.addChild(current);
            current = current.parent;
        }
        syncList.reverse().forEach(function (transform) {
            transform[syncMethod]();
        });
        return this[matrixAttriName];
    };
    Transform.prototype._setGlobalTransformState = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var state = args[0];
            if (!state) {
                return;
            }
            this._isTranslate = true;
            this._isRotate = true;
            this._isScale = true;
            this.dirtyLocal = true;
            this.clearCache();
            this.handleWhenSetTransformState();
            this.setChildrenTransformState(state);
        }
        else {
            var transformState = args[0], state = args[1];
            this["_" + transformState] = state;
            if (state) {
                this.dirtyLocal = true;
                this.clearCache();
                this.handleWhenSetTransformState(transformState);
            }
            if (state) {
                this.setChildrenTransformState(transformState, state);
            }
        }
    };
    Transform.prototype._setLocalTransformState = function (transformState, state) {
        if (state) {
            this.dirtyLocal = true;
            this.clearCache();
        }
        if (state) {
            this.setChildrenTransformState(transformState, state);
        }
    };
    Transform.prototype._resetTransformFlag = function () {
        this.isTranslate = false;
        this.isScale = false;
        this.isRotate = false;
    };
    return Transform;
}(Component));
export { Transform };
__decorate([
    cloneAttributeAsBasicType()
], Transform.prototype, "parent", null);
__decorate([
    virtual
], Transform.prototype, "handleWhenSetTransformState", null);
//# sourceMappingURL=Transform.js.map