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
var Renderer_1 = require("./Renderer");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var Color_1 = require("../../structure/Color");
var contract_1 = require("../../definition/typescript/decorator/contract");
var Log_1 = require("../../utils/Log");
var DeviceManager_1 = require("../../device/DeviceManager");
var ExtendUtils_1 = require("wonder-commonlib/dist/commonjs/utils/ExtendUtils");
var WebGLRenderer = (function (_super) {
    __extends(WebGLRenderer, _super);
    function WebGLRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._commandQueue = Collection_1.Collection.create();
        _this._clearOptions = {
            color: Color_1.Color.create("#000000")
        };
        return _this;
    }
    WebGLRenderer.create = function () {
        var obj = new this();
        return obj;
    };
    WebGLRenderer.prototype.addCommand = function (command) {
        this._commandQueue.addChild(command);
        command.init();
    };
    WebGLRenderer.prototype.hasCommand = function () {
        return this._commandQueue.getCount() > 0;
    };
    WebGLRenderer.prototype.clear = function () {
        DeviceManager_1.DeviceManager.getInstance().clear(this._clearOptions);
    };
    WebGLRenderer.prototype.render = function () {
        var deviceManager = DeviceManager_1.DeviceManager.getInstance(), webglState = this.webglState;
        this._commandQueue.forEach(function (command) {
            command.webglState = webglState;
            command.execute();
        }, this);
        this._clearCommand();
        this.webglState = null;
    };
    WebGLRenderer.prototype.init = function () {
        var deviceManager = DeviceManager_1.DeviceManager.getInstance();
        deviceManager.depthTest = true;
        deviceManager.blend = false;
        deviceManager.setColorWrite(true, true, true, true);
        deviceManager.side = DeviceManager_1.ESide.FRONT;
        deviceManager.depthWrite = true;
    };
    WebGLRenderer.prototype.setClearColor = function (color) {
        this._setClearOptions({
            color: color
        });
    };
    WebGLRenderer.prototype._clearCommand = function () {
        this._commandQueue.forEach(function (command) {
            command.dispose();
        });
        this._commandQueue.removeAllChildren();
    };
    WebGLRenderer.prototype._setClearOptions = function (clearOptions) {
        ExtendUtils_1.ExtendUtils.extend(this._clearOptions, clearOptions);
    };
    return WebGLRenderer;
}(Renderer_1.Renderer));
__decorate([
    contract_1.ensure(function () {
        contract_1.assert(!this._commandQueue.hasRepeatItems(), Log_1.Log.info.FUNC_SHOULD_NOT("has duplicate render command"));
    })
], WebGLRenderer.prototype, "addCommand", null);
__decorate([
    contract_1.requireCheck(function () {
        contract_1.assert(!!this.webglState, Log_1.Log.info.FUNC_MUST_DEFINE("webglState"));
    })
], WebGLRenderer.prototype, "render", null);
WebGLRenderer = __decorate([
    registerClass_1.registerClass("WebGLRenderer")
], WebGLRenderer);
exports.WebGLRenderer = WebGLRenderer;
//# sourceMappingURL=WebGLRenderer.js.map