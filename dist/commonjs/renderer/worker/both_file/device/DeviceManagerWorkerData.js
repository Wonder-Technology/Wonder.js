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
var DeviceManagerDataCommon_1 = require("../../../utils/worker/render_file/device/DeviceManagerDataCommon");
var DeviceManagerWorkerData = (function (_super) {
    __extends(DeviceManagerWorkerData, _super);
    function DeviceManagerWorkerData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DeviceManagerWorkerData;
}(DeviceManagerDataCommon_1.DeviceManagerDataCommon));
exports.DeviceManagerWorkerData = DeviceManagerWorkerData;
//# sourceMappingURL=DeviceManagerWorkerData.js.map