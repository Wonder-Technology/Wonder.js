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
var LocationDataCommon_1 = require("../../../../../webgl2/utils/worker/render_file/shader/location/LocationDataCommon");
var WebGL2LocationWorkerData = (function (_super) {
    __extends(WebGL2LocationWorkerData, _super);
    function WebGL2LocationWorkerData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebGL2LocationWorkerData;
}(LocationDataCommon_1.WebGL2LocationDataCommon));
exports.WebGL2LocationWorkerData = WebGL2LocationWorkerData;
//# sourceMappingURL=LocationWorkerData.js.map