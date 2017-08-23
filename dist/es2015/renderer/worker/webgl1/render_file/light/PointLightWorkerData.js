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
import { PointLightWorkerData } from "../../../render_file/light/PointLightWorkerData";
var WebGL1PointLightWorkerData = (function (_super) {
    __extends(WebGL1PointLightWorkerData, _super);
    function WebGL1PointLightWorkerData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebGL1PointLightWorkerData.positionArr = null;
    WebGL1PointLightWorkerData.lightGLSLDataStructureMemberNameArr = null;
    return WebGL1PointLightWorkerData;
}(PointLightWorkerData));
export { WebGL1PointLightWorkerData };
//# sourceMappingURL=PointLightWorkerData.js.map