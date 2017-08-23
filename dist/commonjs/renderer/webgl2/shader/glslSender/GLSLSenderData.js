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
var GLSLSenderDataCommon_1 = require("../../utils/worker/render_file/shader/glslSender/GLSLSenderDataCommon");
var WebGL2GLSLSenderData = (function (_super) {
    __extends(WebGL2GLSLSenderData, _super);
    function WebGL2GLSLSenderData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebGL2GLSLSenderData;
}(GLSLSenderDataCommon_1.WebGL2GLSLSenderDataCommon));
exports.WebGL2GLSLSenderData = WebGL2GLSLSenderData;
//# sourceMappingURL=GLSLSenderData.js.map