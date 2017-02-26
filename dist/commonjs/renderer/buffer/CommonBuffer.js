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
Object.defineProperty(exports, "__esModule", { value: true });
var Buffer_1 = require("./Buffer");
var EBufferUsage_1 = require("./EBufferUsage");
var DeviceManager_1 = require("../../device/DeviceManager");
var CommonBuffer = (function (_super) {
    __extends(CommonBuffer, _super);
    function CommonBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = null;
        _this.count = null;
        _this.usage = null;
        return _this;
    }
    CommonBuffer.prototype.resetBufferData = function (glBufferTargetStr, typedData, offset) {
        if (offset === void 0) { offset = 0; }
        var gl = DeviceManager_1.DeviceManager.getInstance().gl;
        if (this.usage === EBufferUsage_1.EBufferUsage.STATIC_DRAW && offset === 0) {
            gl.bufferData(gl[glBufferTargetStr], typedData, gl.DYNAMIC_DRAW);
            return;
        }
        gl.bufferSubData(gl[glBufferTargetStr], offset, typedData);
    };
    return CommonBuffer;
}(Buffer_1.Buffer));
exports.CommonBuffer = CommonBuffer;
//# sourceMappingURL=CommonBuffer.js.map