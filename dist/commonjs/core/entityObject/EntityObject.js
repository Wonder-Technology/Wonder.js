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
var Entity_1 = require("../Entity");
var clone_1 = require("../../definition/typescript/decorator/clone");
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var ComponentManager_1 = require("./manager/ComponentManager");
var EntityObjectManager_1 = require("./manager/EntityObjectManager");
var virtual_1 = require("../../definition/typescript/decorator/virtual");
var ExtendUtils_1 = require("wonder-commonlib/dist/commonjs/utils/ExtendUtils");
var Geometry_1 = require("../../component/geometry/Geometry");
var EventManager_1 = require("../../event/EventManager");
var cache_1 = require("../../definition/typescript/decorator/cache");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var JudgeUtils_1 = require("../../utils/JudgeUtils");
var EntityObject = (function (_super) {
    __extends(EntityObject, _super);
    function EntityObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bubbleParent = null;
        _this.name = null;
        _this.parent = null;
        _this.customEventMap = Hash_1.Hash.create();
        _this.componentManager = ComponentManager_1.ComponentManager.create(_this);
        _this._hasComponentCache = Hash_1.Hash.create();
        _this._getComponentCache = Hash_1.Hash.create();
        _this._componentChangeSubscription = null;
        _this._entityObjectManager = EntityObjectManager_1.EntityObjectManager.create(_this);
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
        if (clone_1.CloneUtils.isNotClone((this))) {
            return null;
        }
        config = ExtendUtils_1.ExtendUtils.extend({
            cloneChildren: true,
            shareGeometry: false,
            cloneGeometry: true
        }, config);
        result = clone_1.CloneUtils.clone(this);
        this.forEachComponent(function (component) {
            if (!config.cloneGeometry && component instanceof Geometry_1.Geometry) {
                return;
            }
            if (config.shareGeometry && component instanceof Geometry_1.Geometry) {
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
        EventManager_1.EventManager.off(this);
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
        if (JudgeUtils_1.JudgeUtils.isComponenet(args[0])) {
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
}(Entity_1.Entity));
__decorate([
    clone_1.cloneAttributeAsBasicType()
], EntityObject.prototype, "bubbleParent", null);
__decorate([
    clone_1.cloneAttributeAsBasicType()
], EntityObject.prototype, "name", void 0);
__decorate([
    clone_1.cloneAttributeAsBasicType()
], EntityObject.prototype, "parent", void 0);
__decorate([
    virtual_1.virtual
], EntityObject.prototype, "initWhenCreate", null);
__decorate([
    cache_1.cache(function (_class) {
        return this._getComponentCache.hasChild(_class.name);
    }, function (_class) {
        return this._getComponentCache.getChild(_class.name);
    }, function (result, _class) {
        this._getComponentCache.addChild(_class.name, result);
    })
], EntityObject.prototype, "getComponent", null);
__decorate([
    virtual_1.virtual
], EntityObject.prototype, "render", null);
__decorate([
    virtual_1.virtual
], EntityObject.prototype, "getGeometry", null);
__decorate([
    virtual_1.virtual
], EntityObject.prototype, "afterInitChildren", null);
__decorate([
    virtual_1.virtual
], EntityObject.prototype, "getRenderList", null);
__decorate([
    contract_1.ensure(function (key) {
        contract_1.it("key:" + key + " be string", function () {
            wonder_expect_js_1.default(JudgeUtils_1.JudgeUtils.isString(key)).true;
        });
    })
], EntityObject.prototype, "_getHasComponentCacheKey", null);
exports.EntityObject = EntityObject;
//# sourceMappingURL=EntityObject.js.map