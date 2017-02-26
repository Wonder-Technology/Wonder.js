"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var contract_1 = require("../definition/typescript/decorator/contract");
var Log_1 = require("../utils/Log");
var Director_1 = require("../core/Director");
var ShaderManager = (function () {
    function ShaderManager(material) {
        this._material = null;
        this._mainShader = null;
        this._material = material;
    }
    ShaderManager.create = function (material) {
        var obj = new this(material);
        return obj;
    };
    Object.defineProperty(ShaderManager.prototype, "shader", {
        get: function () {
            var scene = Director_1.Director.getInstance().scene;
            return this._mainShader;
        },
        enumerable: true,
        configurable: true
    });
    ShaderManager.prototype.setShader = function (shader) {
        this._mainShader = shader;
    };
    ShaderManager.prototype.init = function () {
        var material = this._material;
        this._mainShader.init(material);
    };
    ShaderManager.prototype.dispose = function () {
        this._mainShader.dispose();
    };
    ShaderManager.prototype.update = function (quadCmd) {
        this.shader.update(quadCmd, this._material);
    };
    return ShaderManager;
}());
__decorate([
    contract_1.ensureGetter(function (shader) {
        contract_1.assert(!!shader, Log_1.Log.info.FUNC_NOT_EXIST("shader"));
    })
], ShaderManager.prototype, "shader", null);
ShaderManager = __decorate([
    registerClass_1.registerClass("ShaderManager")
], ShaderManager);
exports.ShaderManager = ShaderManager;
//# sourceMappingURL=ShaderManager.js.map