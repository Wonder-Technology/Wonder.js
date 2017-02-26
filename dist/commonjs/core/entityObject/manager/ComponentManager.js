"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../../definition/typescript/decorator/registerClass");
var Transform_1 = require("../../../component/transform/Transform");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var RendererComponent_1 = require("../../../component/renderer/RendererComponent");
var Geometry_1 = require("../../../component/geometry/Geometry");
var SortUtils_1 = require("../../../utils/SortUtils");
var Component_1 = require("../../Component");
var ComponentInitOrderTable_1 = require("../../../component/data/ComponentInitOrderTable");
var JudgeUtils_1 = require("../../../utils/JudgeUtils");
var contract_1 = require("../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var ComponentManager = (function () {
    function ComponentManager(entityObject) {
        this.transform = null;
        this._entityObject = null;
        this._components = Collection_1.Collection.create();
        this._rendererComponent = null;
        this._geometry = null;
        this._entityObject = entityObject;
    }
    ComponentManager.create = function (entityObject) {
        var obj = new this(entityObject);
        return obj;
    };
    ComponentManager.prototype.init = function () {
        for (var _i = 0, _a = SortUtils_1.SortUtils.insertSort(this._components.getChildren(), function (a, b) {
            return ComponentInitOrderTable_1.ComponentInitOrderTable.getOrder(a) < ComponentInitOrderTable_1.ComponentInitOrderTable.getOrder(b);
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
        var result = Collection_1.Collection.create();
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
        if (JudgeUtils_1.JudgeUtils.isComponenet(args[0])) {
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
        if (component instanceof RendererComponent_1.RendererComponent) {
            this._rendererComponent = component;
        }
        else if (component instanceof Geometry_1.Geometry) {
            this._geometry = component;
        }
        else if (component instanceof Transform_1.Transform) {
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
        if (args[0] instanceof Component_1.Component) {
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
    contract_1.requireCheck(function (component, isShareComponent) {
        var _this = this;
        if (isShareComponent === void 0) { isShareComponent = false; }
        if (!component) {
            return;
        }
        contract_1.it("should not add the component which is already added", function () {
            wonder_expect_js_1.default(_this.hasComponent(component)).false;
        });
    })
], ComponentManager.prototype, "addComponent", null);
__decorate([
    contract_1.requireCheck(function () {
        var _this = this;
        contract_1.it("entityObject shouldn't contain more than 1 geometry component", function () {
            wonder_expect_js_1.default(_this.getComponentCount(Geometry_1.Geometry)).lessThan(2);
        });
    })
], ComponentManager.prototype, "getGeometry", null);
__decorate([
    contract_1.requireCheck(function () {
        var _this = this;
        contract_1.it("entityObject shouldn't contain more than 1 rendererComponent", function () {
            wonder_expect_js_1.default(_this.getComponentCount(RendererComponent_1.RendererComponent)).lessThan(2);
        });
    })
], ComponentManager.prototype, "getRendererComponent", null);
ComponentManager = __decorate([
    registerClass_1.registerClass("ComponentManager")
], ComponentManager);
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=ComponentManager.js.map