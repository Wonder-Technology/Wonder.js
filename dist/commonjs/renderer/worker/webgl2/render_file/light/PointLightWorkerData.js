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
var PointLightWorkerData_1 = require("../../../render_file/light/PointLightWorkerData");
var WebGL2PointLightWorkerData = (function (_super) {
    __extends(WebGL2PointLightWorkerData, _super);
    function WebGL2PointLightWorkerData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebGL2PointLightWorkerData.positionArr = null;
    return WebGL2PointLightWorkerData;
}(PointLightWorkerData_1.PointLightWorkerData));
exports.WebGL2PointLightWorkerData = WebGL2PointLightWorkerData;
//# sourceMappingURL=PointLightWorkerData.js.map