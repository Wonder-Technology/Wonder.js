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
import { ShaderLib } from "./ShaderLib";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { VariableLib } from "../variable/VariableLib";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { virtual } from "../../../definition/typescript/decorator/virtual";
import { EVariableType } from "../variable/EVariableType";
import { requireCheck, assert, it } from "../../../definition/typescript/decorator/contract";
import { Log } from "../../../utils/Log";
import { empty } from "../chunk/ShaderChunk";
import { JudgeUtils } from "../../../utils/JudgeUtils";
import expect from "wonder-expect.js";
var EngineShaderLib = (function (_super) {
    __extends(EngineShaderLib, _super);
    function EngineShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = Hash.create();
        _this.uniforms = Hash.create();
        _this.vsSourceTop = "";
        _this.vsSourceDefine = "";
        _this.vsSourceVarDeclare = "";
        _this.vsSourceFuncDeclare = "";
        _this.vsSourceFuncDefine = "";
        _this.vsSourceBody = "";
        _this.vsSource = null;
        _this.fsSourceTop = "";
        _this.fsSourceDefine = "";
        _this.fsSourceVarDeclare = "";
        _this.fsSourceFuncDeclare = "";
        _this.fsSourceFuncDefine = "";
        _this.fsSourceBody = "";
        _this.fsSource = null;
        _this.vsSourceDefineList = Collection.create();
        _this.fsSourceDefineList = Collection.create();
        _this.vsSourceExtensionList = Collection.create();
        _this.fsSourceExtensionList = Collection.create();
        return _this;
    }
    EngineShaderLib.prototype.setShaderDefinition = function (cmd, material) {
        var vs = null, fs = null;
        this._clearShaderDefinition();
        vs = this.getVsChunk();
        fs = this.getFsChunk();
        vs && this.setVsSource(vs);
        fs && this.setFsSource(fs);
    };
    EngineShaderLib.prototype.sendAttributeBuffer = function (program, name, data) {
        program.sendAttributeBuffer(name, EVariableType.BUFFER, data);
    };
    EngineShaderLib.prototype.sendUniformData = function (program, name, data) {
        program.sendUniformData(name, VariableLib[name].type, data);
    };
    EngineShaderLib.prototype.getVsChunk = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var chunk = args.length === 0 ? this.vsChunk : args[0];
        return this._getChunk(chunk, EShaderLibType.vs);
    };
    EngineShaderLib.prototype.getFsChunk = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var chunk = args.length === 0 ? this.fsChunk : args[0];
        return this._getChunk(chunk, EShaderLibType.fs);
    };
    EngineShaderLib.prototype.setVsSource = function (vs, operator) {
        if (operator === void 0) { operator = "="; }
        if (JudgeUtils.isString(vs)) {
            this.vsSource = vs;
        }
        else {
            this._setSource(vs, EShaderLibType.vs, operator);
        }
    };
    EngineShaderLib.prototype.setFsSource = function (fs, operator) {
        if (operator === void 0) { operator = "="; }
        if (JudgeUtils.isString(fs)) {
            this.fsSource = fs;
        }
        else {
            this._setSource(fs, EShaderLibType.fs, operator);
        }
    };
    EngineShaderLib.prototype.addAttributeVariable = function (variableArr) {
        this._addVariable(this.attributes, variableArr);
    };
    EngineShaderLib.prototype.addUniformVariable = function (variableArr) {
        this._addVariable(this.uniforms, variableArr);
    };
    EngineShaderLib.prototype._addVariable = function (target, variableArr) {
        variableArr.forEach(function (variable) {
            assert(VariableLib[variable], Log.info.FUNC_SHOULD(variable, "exist in VariableLib"));
            target.addChild(variable, VariableLib[variable]);
        });
    };
    EngineShaderLib.prototype._clearShaderDefinition = function () {
        this.attributes.removeAllChildren();
        this.uniforms.removeAllChildren();
        this.vsSourceDefineList.removeAllChildren();
        this.fsSourceDefineList.removeAllChildren();
        this.vsSourceExtensionList.removeAllChildren();
        this.fsSourceExtensionList.removeAllChildren();
        this.vsSourceTop = "";
        this.vsSourceDefine = "";
        this.vsSourceVarDeclare = "";
        this.vsSourceFuncDeclare = "";
        this.vsSourceFuncDefine = "";
        this.vsSourceBody = "";
        this.vsSource = null;
        this.fsSourceTop = "";
        this.fsSourceDefine = "";
        this.fsSourceVarDeclare = "";
        this.fsSourceFuncDeclare = "";
        this.fsSourceFuncDefine = "";
        this.fsSourceBody = "";
        this.fsSource = null;
    };
    EngineShaderLib.prototype._getChunk = function (chunk, sourceType) {
        var key = null;
        if (chunk === null) {
            return empty;
        }
        return chunk;
    };
    EngineShaderLib.prototype._setSource = function (chunk, sourceType, operator) {
        if (!chunk) {
            return;
        }
        switch (operator) {
            case "+":
                this[sourceType + "SourceTop"] += chunk.top;
                this[sourceType + "SourceDefine"] += chunk.define;
                this[sourceType + "SourceVarDeclare"] += chunk.varDeclare;
                this[sourceType + "SourceFuncDeclare"] += chunk.funcDeclare;
                this[sourceType + "SourceFuncDefine"] += chunk.funcDefine;
                this[sourceType + "SourceBody"] += chunk.body;
                break;
            case "=":
                this[sourceType + "SourceTop"] = chunk.top;
                this[sourceType + "SourceDefine"] = chunk.define;
                this[sourceType + "SourceVarDeclare"] = chunk.varDeclare;
                this[sourceType + "SourceFuncDeclare"] = chunk.funcDeclare;
                this[sourceType + "SourceFuncDefine"] = chunk.funcDefine;
                this[sourceType + "SourceBody"] = chunk.body;
                break;
            default:
                Log.error(true, Log.info.FUNC_INVALID("opertor:", operator));
                break;
        }
    };
    return EngineShaderLib;
}(ShaderLib));
export { EngineShaderLib };
__decorate([
    virtual
], EngineShaderLib.prototype, "setShaderDefinition", null);
__decorate([
    requireCheck(function (program, name, data) {
        assert(!!VariableLib[name], name + " should exist in VariableLib");
    })
], EngineShaderLib.prototype, "sendUniformData", null);
__decorate([
    requireCheck(function () {
        assert(this.vsSource === null, Log.info.FUNC_SHOULD("vsSource", "be null"));
    })
], EngineShaderLib.prototype, "setVsSource", null);
__decorate([
    requireCheck(function () {
        assert(this.fsSource === null, Log.info.FUNC_SHOULD("fsSource", "be null"));
    })
], EngineShaderLib.prototype, "setFsSource", null);
__decorate([
    requireCheck(function (target, variableArr) {
        variableArr.forEach(function (variable) {
            it("should exist in VariableLib", function () {
                expect(VariableLib[variable]).exist;
            });
        });
    })
], EngineShaderLib.prototype, "_addVariable", null);
var EShaderLibType;
(function (EShaderLibType) {
    EShaderLibType[EShaderLibType["vs"] = "vs"] = "vs";
    EShaderLibType[EShaderLibType["fs"] = "fs"] = "fs";
})(EShaderLibType || (EShaderLibType = {}));
//# sourceMappingURL=EngineShaderLib.js.map