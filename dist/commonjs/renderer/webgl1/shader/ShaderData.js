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
var ShaderDataCommon_1 = require("../utils/worker/render_file/shader/ShaderDataCommon");
var WebGL1ShaderData = (function (_super) {
    __extends(WebGL1ShaderData, _super);
    function WebGL1ShaderData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebGL1ShaderData;
}(ShaderDataCommon_1.WebGL1ShaderDataCommon));
exports.WebGL1ShaderData = WebGL1ShaderData;
//# sourceMappingURL=ShaderData.js.map