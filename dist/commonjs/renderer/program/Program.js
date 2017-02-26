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
var Entity_1 = require("../../core/Entity");
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var GLSLDataSender_1 = require("./GLSLDataSender");
var JudgeUtils_1 = require("../../utils/JudgeUtils");
var ProgramTable_1 = require("../../core/entityObject/scene/cache/ProgramTable");
var DeviceManager_1 = require("../../device/DeviceManager");
var BufferTable_1 = require("../../core/entityObject/scene/cache/BufferTable");
var EVariableType_1 = require("../shader/variable/EVariableType");
var Log_1 = require("../../utils/Log");
var contract_1 = require("../../definition/typescript/decorator/contract");
var ArrayBuffer_1 = require("../buffer/ArrayBuffer");
var Program = (function (_super) {
    __extends(Program, _super);
    function Program() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.glProgram = null;
        _this._getAttribLocationCache = Hash_1.Hash.create();
        _this._sender = GLSLDataSender_1.GLSLDataSender.create(_this);
        return _this;
    }
    Program.create = function () {
        var obj = new this();
        return obj;
    };
    Program.prototype.use = function () {
        if (JudgeUtils_1.JudgeUtils.isEqual(this, ProgramTable_1.ProgramTable.lastUsedProgram)) {
            return;
        }
        ProgramTable_1.ProgramTable.lastUsedProgram = this;
        DeviceManager_1.DeviceManager.getInstance().gl.useProgram(this.glProgram);
        this._sender.disableVertexAttribArray();
        BufferTable_1.BufferTable.lastBindedArrayBufferListUidStr = null;
    };
    Program.prototype.getAttribLocation = function (name) {
        var pos = null, gl = DeviceManager_1.DeviceManager.getInstance().gl;
        pos = this._getAttribLocationCache.getChild(name);
        if (pos !== void 0) {
            return pos;
        }
        pos = gl.getAttribLocation(this.glProgram, name);
        this._getAttribLocationCache.addChild(name, pos);
        return pos;
    };
    Program.prototype.getUniformLocation = function (name) {
        return this._sender.getUniformLocation(name);
    };
    Program.prototype.sendUniformData = function (name, type, data) {
        if (data === null) {
            return;
        }
        switch (type) {
            case EVariableType_1.EVariableType.FLOAT_1:
                this._sender.sendFloat1(name, data);
                break;
            case EVariableType_1.EVariableType.FLOAT_2:
                this._sender.sendFloat2(name, data);
                break;
            case EVariableType_1.EVariableType.FLOAT_3:
                this._sender.sendFloat3(name, data);
                break;
            case EVariableType_1.EVariableType.FLOAT_4:
                this._sender.sendFloat4(name, data);
                break;
            case EVariableType_1.EVariableType.VECTOR_2:
                this._sender.sendVector2(name, data);
                break;
            case EVariableType_1.EVariableType.VECTOR_3:
                this._sender.sendVector3(name, data);
                break;
            case EVariableType_1.EVariableType.VECTOR_4:
                this._sender.sendVector4(name, data);
                break;
            case EVariableType_1.EVariableType.COLOR_3:
                this._sender.sendColor3(name, data);
                break;
            case EVariableType_1.EVariableType.FLOAT_MAT3:
                this._sender.sendMatrix3(name, data);
                break;
            case EVariableType_1.EVariableType.FLOAT_MAT4:
                this._sender.sendMatrix4(name, data);
                break;
            case EVariableType_1.EVariableType.NUMBER_1:
            case EVariableType_1.EVariableType.SAMPLER_CUBE:
            case EVariableType_1.EVariableType.SAMPLER_2D:
                this._sender.sendNum1(name, data);
                break;
            case EVariableType_1.EVariableType.FLOAT_MAT4_ARRAY:
                this._sender.sendMatrix4Array(name, data);
                break;
            case EVariableType_1.EVariableType.SAMPLER_ARRAY:
                this._sender.sendSampleArray(name, data);
                break;
            default:
                Log_1.Log.error(true, Log_1.Log.info.FUNC_INVALID("EVariableType:", type));
                break;
        }
    };
    Program.prototype.sendAttributeBuffer = function (name, type, buffer) {
        var pos = null;
        pos = this.getAttribLocation(name);
        if (pos === -1) {
            return;
        }
        this._sender.addBufferToToSendList(pos, buffer);
    };
    Program.prototype.sendStructureData = function (name, type, data) {
        this.sendUniformData(name, type, data);
    };
    Program.prototype.sendFloat1 = function (name, data) {
        this._sender.sendFloat1(name, data);
    };
    Program.prototype.sendFloat2 = function (name, data) {
        this._sender.sendFloat2(name, data);
    };
    Program.prototype.sendFloat3 = function (name, data) {
        this._sender.sendFloat3(name, data);
    };
    Program.prototype.sendFloat4 = function (name, data) {
        this._sender.sendFloat4(name, data);
    };
    Program.prototype.sendVector2 = function (name, data) {
        this._sender.sendVector2(name, data);
    };
    Program.prototype.sendVector3 = function (name, data) {
        this._sender.sendVector3(name, data);
    };
    Program.prototype.sendVector4 = function (name, data) {
        this._sender.sendVector4(name, data);
    };
    Program.prototype.sendColor3 = function (name, data) {
        this._sender.sendColor3(name, data);
    };
    Program.prototype.sendNum1 = function (name, data) {
        this._sender.sendNum1(name, data);
    };
    Program.prototype.sendMatrix3 = function (name, data) {
        this._sender.sendMatrix3(name, data);
    };
    Program.prototype.sendMatrix4 = function (name, data) {
        this._sender.sendMatrix4(name, data);
    };
    Program.prototype.sendMatrix4Array = function (name, data) {
        this._sender.sendMatrix4Array(name, data);
    };
    Program.prototype.sendSampleArray = function (name, data) {
        this._sender.sendSampleArray(name, data);
    };
    Program.prototype.sendAllBufferData = function () {
        this._sender.sendAllBufferData();
        this._sender.clearBufferList();
    };
    Program.prototype.initWithShader = function (shader) {
        var gl = DeviceManager_1.DeviceManager.getInstance().gl, vs = null, fs = null;
        if (this.glProgram) {
            this.dispose();
        }
        this.glProgram = DeviceManager_1.DeviceManager.getInstance().gl.createProgram();
        vs = shader.createVsShader();
        fs = shader.createFsShader();
        gl.attachShader(this.glProgram, vs);
        gl.attachShader(this.glProgram, fs);
        gl.bindAttribLocation(this.glProgram, 0, "a_position");
        gl.linkProgram(this.glProgram);
        Log_1.Log.error(gl.getProgramParameter(this.glProgram, gl.LINK_STATUS) === false, gl.getProgramInfoLog(this.glProgram));
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return this;
    };
    Program.prototype.dispose = function () {
        var gl = DeviceManager_1.DeviceManager.getInstance().gl;
        gl.deleteProgram(this.glProgram);
        this.glProgram = null;
        this._sender.dispose();
        this._clearAllCache();
    };
    Program.prototype._clearAllCache = function () {
        this._getAttribLocationCache.removeAllChildren();
        this._sender.clearAllCache();
    };
    return Program;
}(Entity_1.Entity));
__decorate([
    contract_1.requireCheck(function (name, type, buffer) {
        contract_1.assert(buffer instanceof ArrayBuffer_1.ArrayBuffer, Log_1.Log.info.FUNC_MUST_BE("ArrayBuffer"));
        contract_1.assert(type === EVariableType_1.EVariableType.BUFFER, Log_1.Log.info.FUNC_SHOULD("type", "be EVariableType.BUFFER, but actual is " + type));
    })
], Program.prototype, "sendAttributeBuffer", null);
Program = __decorate([
    registerClass_1.registerClass("Program")
], Program);
exports.Program = Program;
//# sourceMappingURL=Program.js.map