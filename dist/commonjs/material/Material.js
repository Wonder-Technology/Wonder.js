"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Color_1 = require("../structure/Color");
var clone_1 = require("../definition/typescript/decorator/clone");
var ShaderManager_1 = require("./ShaderManager");
var Material = (function () {
    function Material() {
        this._color = Color_1.Color.create("#ffffff");
        this.geometry = null;
        this._shaderManager = ShaderManager_1.ShaderManager.create(this);
    }
    Object.defineProperty(Material.prototype, "program", {
        get: function () {
            return this.shader.program;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            if (this._color.isEqual(color)) {
                return;
            }
            this._color = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "shader", {
        get: function () {
            return this._shaderManager.shader;
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.clone = function () {
        return clone_1.CloneUtils.clone(this);
    };
    Material.prototype.initWhenCreate = function () {
        this._shaderManager.setShader(this.createShader());
    };
    Material.prototype.init = function () {
        this._shaderManager.init();
    };
    Material.prototype.dispose = function () {
        this._shaderManager.dispose();
    };
    Material.prototype.updateShader = function (quadCmd) {
        this._shaderManager.update(quadCmd);
    };
    return Material;
}());
__decorate([
    clone_1.cloneAttributeAsCloneable()
], Material.prototype, "color", null);
__decorate([
    clone_1.cloneAttributeAsBasicType()
], Material.prototype, "geometry", void 0);
exports.Material = Material;
//# sourceMappingURL=Material.js.map