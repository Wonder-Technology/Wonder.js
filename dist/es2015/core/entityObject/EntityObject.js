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
import { Entity } from "../Entity";
import { cloneAttributeAsBasicType, CloneUtils } from "../../definition/typescript/decorator/clone";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { ComponentManager } from "./manager/ComponentManager";
import { EntityObjectManager } from "./manager/EntityObjectManager";
import { virtual } from "../../definition/typescript/decorator/virtual";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { Geometry } from "../../component/geometry/Geometry";
import { EventManager } from "../../event/EventManager";
import { cache } from "../../definition/typescript/decorator/cache";
import { ensure, it } from "../../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
import { JudgeUtils } from "../../utils/JudgeUtils";
var EntityObject = (function (_super) {
    __extends(EntityObject, _super);
    function EntityObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bubbleParent = null;
        _this.name = null;
        _this.parent = null;
        _this.customEventMap = Hash.create();
        _this.componentManager = ComponentManager.create(_this);
        _this._hasComponentCache = Hash.create();
        _this._getComponentCache = Hash.create();
        _this._componentChangeSubscription = null;
        _this._entityObjectManager = EntityObjectManager.create(_this);
        return _this;
    }
    Object.defineProperty(EntityObject.prototype, "bubbleParent", {
        get: function () {
            return this._bubbleParent ? this._bubbleParent : this.parent;
        },
        set: function (bubbleParent) {
            this._bubbleParent = bubbleParent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityObject.prototype, "componentDirty", {
        set: function (componentDirty) {
            if (componentDirty === true) {
                this.clearCache();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityObject.prototype, "transform", {
        get: function () {
            return this.componentManager.transform;
        },
        enumerable: true,
        configurable: true
    });
    EntityObject.prototype.initWhenCreate = function () {
        this.addComponent(this.createTransform());
    };
    EntityObject.prototype.clone = function (config) {
        if (config === void 0) { config = {}; }
        var result = null;
        if (CloneUtils.isNotClone((this))) {
            return null;
        }
        config = ExtendUtils.extend({
            cloneChildren: true,
            shareGeometry: false,
            cloneGeometry: true
        }, config);
        result = CloneUtils.clone(this);
        this.forEachComponent(function (component) {
            if (!config.cloneGeometry && component instanceof Geometry) {
                return;
            }
            if (config.shareGeometry && component instanceof Geometry) {
                result.addComponent(component, true);
                return;
            }
            result.addComponent(component.clone());
        });
        if (config.cloneChildren) {
            this._cloneChildren(result);
        }
        return result;
    };
    EntityObject.prototype.init = function () {
        var self = this;
        this.componentManager.init();
        this._entityObjectManager.init();
        this.afterInitChildren();
        return this;
    };
    EntityObject.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
        }
        this.componentManager.dispose();
        this._entityObjectManager.dispose();
        EventManager.off(this);
    };
    EntityObject.prototype.hasChild = function (child) {
        return this._entityObjectManager.hasChild(child);
    };
    EntityObject.prototype.addChild = function (child) {
        this._entityObjectManager.addChild(child);
        return this;
    };
    EntityObject.prototype.getChildren = function () {
        return this._entityObjectManager.getChildren();
    };
    EntityObject.prototype.removeChild = function (child) {
        this._entityObjectManager.removeChild(child);
        return this;
    };
    EntityObject.prototype.forEach = function (func) {
        this._entityObjectManager.forEach(func);
        return this;
    };
    EntityObject.prototype.getComponent = function (_class) {
        return this.componentManager.getComponent(_class);
    };
    EntityObject.prototype.hasComponent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = this._getHasComponentCacheKey(args[0]), result = this._hasComponentCache.getChild(key);
        if (result !== void 0) {
            return result;
        }
        result = this.componentManager.hasComponent(args[0]);
        this._hasComponentCache.addChild(key, result);
        return result;
    };
    EntityObject.prototype.addComponent = function (component, isShareComponent) {
        if (isShareComponent === void 0) { isShareComponent = false; }
        this.componentManager.addComponent(component, isShareComponent);
        this.componentDirty = true;
        return this;
    };
    EntityObject.prototype.removeComponent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.componentManager.removeComponent(args[0]);
        this.componentDirty = true;
        return this;
    };
    EntityObject.prototype.forEachComponent = function (func) {
        this.componentManager.forEachComponent(func);
        return this;
    };
    EntityObject.prototype.render = function (renderer, camera) {
        var rendererComponent = null;
        rendererComponent = this.componentManager.getRendererComponent();
        if (rendererComponent) {
            rendererComponent.render(renderer, this, camera);
        }
        this.getRenderList().forEach(function (child) {
            child.render(renderer, camera);
        });
    };
    EntityObject.prototype.update = function (elapsed) {
        this.forEach(function (child) {
            child.update(elapsed);
        });
    };
    EntityObject.prototype.clearCache = function () {
        this._hasComponentCache.removeAllChildren();
        this._getComponentCache.removeAllChildren();
    };
    EntityObject.prototype.getGeometry = function () {
        return this.componentManager.getGeometry();
    };
    EntityObject.prototype.afterInitChildren = function () {
    };
    EntityObject.prototype.getRenderList = function () {
        return this.getChildren();
    };
    EntityObject.prototype._getHasComponentCacheKey = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (JudgeUtils.isComponenet(args[0])) {
            var component = args[0];
            return String(component.uid);
        }
        else {
            var _class = args[0];
            return _class.name;
        }
    };
    EntityObject.prototype._cloneChildren = function (result) {
        this.forEach(function (child) {
            var resultChild = child.clone();
            if (resultChild !== null) {
                result.addChild(resultChild);
            }
        });
    };
    return EntityObject;
}(Entity));
export { EntityObject };
__decorate([
    cloneAttributeAsBasicType()
], EntityObject.prototype, "bubbleParent", null);
__decorate([
    cloneAttributeAsBasicType()
], EntityObject.prototype, "name", void 0);
__decorate([
    cloneAttributeAsBasicType()
], EntityObject.prototype, "parent", void 0);
__decorate([
    virtual
], EntityObject.prototype, "initWhenCreate", null);
__decorate([
    cache(function (_class) {
        return this._getComponentCache.hasChild(_class.name);
    }, function (_class) {
        return this._getComponentCache.getChild(_class.name);
    }, function (result, _class) {
        this._getComponentCache.addChild(_class.name, result);
    })
], EntityObject.prototype, "getComponent", null);
__decorate([
    virtual
], EntityObject.prototype, "render", null);
__decorate([
    virtual
], EntityObject.prototype, "getGeometry", null);
__decorate([
    virtual
], EntityObject.prototype, "afterInitChildren", null);
__decorate([
    virtual
], EntityObject.prototype, "getRenderList", null);
__decorate([
    ensure(function (key) {
        it("key:" + key + " be string", function () {
            expect(JudgeUtils.isString(key)).true;
        });
    })
], EntityObject.prototype, "_getHasComponentCacheKey", null);
//# sourceMappingURL=EntityObject.js.map