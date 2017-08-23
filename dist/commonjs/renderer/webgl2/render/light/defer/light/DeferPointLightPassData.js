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
var DeferPointLightPassDataCommon_1 = require("../../../../utils/render/light/defer/light/DeferPointLightPassDataCommon");
var DeferPointLightPassData = (function (_super) {
    __extends(DeferPointLightPassData, _super);
    function DeferPointLightPassData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DeferPointLightPassData;
}(DeferPointLightPassDataCommon_1.DeferPointLightPassDataCommon));
exports.DeferPointLightPassData = DeferPointLightPassData;
//# sourceMappingURL=DeferPointLightPassData.js.map