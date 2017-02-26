var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { Transform } from "../../../component/transform/Transform";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { RendererComponent } from "../../../component/renderer/RendererComponent";
import { Geometry } from "../../../component/geometry/Geometry";
import { SortUtils } from "../../../utils/SortUtils";
import { Component } from "../../Component";
import { ComponentInitOrderTable } from "../../../component/data/ComponentInitOrderTable";
import { JudgeUtils } from "../../../utils/JudgeUtils";
import { requireCheck, it } from "../../../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
var ComponentManager = (function () {
    function ComponentManager(entityObject) {
        this.transform = null;
        this._entityObject = null;
        this._components = Collection.create();
        this._rendererComponent = null;
        this._geometry = null;
        this._entityObject = entityObject;
    }
    ComponentManager.create = function (entityObject) {
        var obj = new this(entityObject);
        return obj;
    };
    ComponentManager.prototype.init = function () {
        for (var _i = 0, _a = SortUtils.insertSort(this._components.getChildren(), function (a, b) {
            return ComponentInitOrderTable.getOrder(a) < ComponentInitOrderTable.getOrder(b);
        }); _i < _a.length; _i++) {
            var component = _a[_i];
            component.init();
        }
    };
    ComponentManager.prototype.dispose = function () {
        var components = this.removeAllComponent();
        components.forEach(function (component) {
            component.dispose();
        });
        this._components.removeAllChildren();
    };
    ComponentManager.prototype.removeAllComponent = function () {
        var _this = this;
        var result = Collection.create();
        this._components.forEach(function (component) {
            _this._removeComponentHandler(component);
            result.addChild(component);
        }, this);
        return result;
    };
    ComponentManager.prototype.getComponent = function (_class) {
        return this._components.findOne(function (component) {
            return component instanceof _class;
        });
    };
    ComponentManager.prototype.getComponents = function () {
        return this._components;
    };
    ComponentManager.prototype.findComponentByUid = function (uid) {
        return this._components.findOne(function (component) {
            return component.uid === uid;
        });
    };
    ComponentManager.prototype.forEachComponent = function (func) {
        this._components.forEach(func);
        return this;
    };
    ComponentManager.prototype.hasComponent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = null;
        if (JudgeUtils.isComponenet(args[0])) {
            var component = args[0];
            result = this._components.hasChild(component);
        }
        else {
            var _class_1 = args[0];
            result = this._components.hasChildWithFunc(function (component) {
                return component instanceof _class_1;
            });
        }
        return result;
    };
    ComponentManager.prototype.addComponent = function (component, isShareComponent) {
        if (isShareComponent === void 0) { isShareComponent = false; }
        if (!component) {
            return;
        }
        if (component instanceof RendererComponent) {
            this._rendererComponent = component;
        }
        else if (component instanceof Geometry) {
            this._geometry = component;
        }
        else if (component instanceof Transform) {
            if (this.transform) {
                this.removeComponent(this.transform);
            }
            this.transform = component;
        }
        component.addToObject(this._entityObject, isShareComponent);
        this._components.addChild(component);
        return this;
    };
    ComponentManager.prototype.removeComponent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var component = null;
        if (args[0] instanceof Component) {
            component = args[0];
        }
        else {
            component = this.getComponent(args[0]);
        }
        if (component) {
            this._components.removeChild(component);
            this._removeComponentHandler(component);
        }
        return this;
    };
    ComponentManager.prototype.getComponentCount = function (_class) {
        return this._components.filter(function (component) {
            return component instanceof _class;
        }).getCount();
    };
    ComponentManager.prototype.getGeometry = function () {
        return this._geometry;
    };
    ComponentManager.prototype.getRendererComponent = function () {
        return this._rendererComponent;
    };
    ComponentManager.prototype._removeComponentHandler = function (component) {
        component.removeFromObject(this._entityObject);
    };
    return ComponentManager;
}());
__decorate([
    requireCheck(function (component, isShareComponent) {
        var _this = this;
        if (isShareComponent === void 0) { isShareComponent = false; }
        if (!component) {
            return;
        }
        it("should not add the component which is already added", function () {
            expect(_this.hasComponent(component)).false;
        });
    })
], ComponentManager.prototype, "addComponent", null);
__decorate([
    requireCheck(function () {
        var _this = this;
        it("entityObject shouldn't contain more than 1 geometry component", function () {
            expect(_this.getComponentCount(Geometry)).lessThan(2);
        });
    })
], ComponentManager.prototype, "getGeometry", null);
__decorate([
    requireCheck(function () {
        var _this = this;
        it("entityObject shouldn't contain more than 1 rendererComponent", function () {
            expect(_this.getComponentCount(RendererComponent)).lessThan(2);
        });
    })
], ComponentManager.prototype, "getRendererComponent", null);
ComponentManager = __decorate([
    registerClass("ComponentManager")
], ComponentManager);
export { ComponentManager };
//# sourceMappingURL=ComponentManager.js.map