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
import { DirectionLightWorkerData } from "../../../render_file/light/DirectionLightWorkerData";
var WebGL1DirectionLightWorkerData = (function (_super) {
    __extends(WebGL1DirectionLightWorkerData, _super);
    function WebGL1DirectionLightWorkerData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebGL1DirectionLightWorkerData.positionArr = null;
    WebGL1DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr = null;
    return WebGL1DirectionLightWorkerData;
}(DirectionLightWorkerData));
export { WebGL1DirectionLightWorkerData };
//# sourceMappingURL=DirectionLightWorkerData.js.map