"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../../definition/typescript/decorator/registerClass");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var JudgeUtils_1 = require("../../../utils/JudgeUtils");
var EntityObjectManager = (function () {
    function EntityObjectManager(entityObject) {
        this._entityObject = null;
        this._children = Collection_1.Collection.create();
        this._entityObject = entityObject;
    }
    EntityObjectManager.create = function (entityObject) {
        var obj = new this(entityObject);
        return obj;
    };
    EntityObjectManager.prototype.init = function () {
        this.forEach(function (child) {
            child.init();
        });
    };
    EntityObjectManager.prototype.dispose = function () {
        this.forEach(function (child) {
            child.dispose();
        });
    };
    EntityObjectManager.prototype.hasChild = function (child) {
        return this._children.hasChild(child);
    };
    EntityObjectManager.prototype.addChild = function (child) {
        if (child.parent) {
            child.parent.removeChild(child);
        }
        child.parent = this._entityObject;
        child.transform.parent = this._entityObject.transform;
        this._children.addChild(child);
        return this;
    };
    EntityObjectManager.prototype.addChildren = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (JudgeUtils_1.JudgeUtils.isArray(args[0])) {
            var children = args[0];
            for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
                var child = children_1[_a];
                this.addChild(child);
            }
        }
        else if (JudgeUtils_1.JudgeUtils.isCollection(args[0])) {
            var children = args[0];
            children.forEach(function (child) {
                _this.addChild(child);
            });
        }
        else {
            this.addChild(args[0]);
        }
        return this;
    };
    EntityObjectManager.prototype.forEach = function (func) {
        this._children.forEach(func);
        return this;
    };
    EntityObjectManager.prototype.filter = function (func) {
        return this._children.filter(func);
    };
    EntityObjectManager.prototype.sort = function (func, isSortSelf) {
        if (isSortSelf === void 0) { isSortSelf = false; }
        return this._children.sort(func, isSortSelf);
    };
    EntityObjectManager.prototype.getChildren = function () {
        return this._children;
    };
    EntityObjectManager.prototype.getAllChildren = function () {
        var result = Collection_1.Collection.create();
        var getChildren = function (entityObject) {
            result.addChildren(entityObject.getChildren());
            entityObject.forEach(function (child) {
                getChildren(child);
            });
        };
        getChildren(this._entityObject);
        return result;
    };
    EntityObjectManager.prototype.getChild = function (index) {
        return this._children.getChild(index);
    };
    EntityObjectManager.prototype.findChildByUid = function (uid) {
        return this._children.findOne(function (child) {
            return child.uid === uid;
        });
    };
    EntityObjectManager.prototype.findChildByTag = function (tag) {
        return this._children.findOne(function (child) {
            return child.hasTag(tag);
        });
    };
    EntityObjectManager.prototype.findChildByName = function (name) {
        return this._children.findOne(function (child) {
            return child.name.search(name) > -1;
        });
    };
    EntityObjectManager.prototype.findChildrenByName = function (name) {
        return this._children.filter(function (child) {
            return child.name.search(name) > -1;
        });
    };
    EntityObjectManager.prototype.removeChild = function (child) {
        this._children.removeChild(child);
        child.parent = null;
        return this;
    };
    EntityObjectManager.prototype.removeAllChildren = function () {
        var _this = this;
        this._children.forEach(function (child) {
            _this.removeChild(child);
        }, this);
    };
    return EntityObjectManager;
}());
EntityObjectManager = __decorate([
    registerClass_1.registerClass("EntityObjectManager")
], EntityObjectManager);
exports.EntityObjectManager = EntityObjectManager;
//# sourceMappingURL=EntityObjectManager.js.map