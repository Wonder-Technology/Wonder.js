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
var DirectionLightData_1 = require("../../../component/light/DirectionLightData");
var WebGL1DirectionLightData = (function (_super) {
    __extends(WebGL1DirectionLightData, _super);
    function WebGL1DirectionLightData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebGL1DirectionLightData.lightGLSLDataStructureMemberNameArr = null;
    return WebGL1DirectionLightData;
}(DirectionLightData_1.DirectionLightData));
exports.WebGL1DirectionLightData = WebGL1DirectionLightData;
//# sourceMappingURL=DirectionLightData.js.map