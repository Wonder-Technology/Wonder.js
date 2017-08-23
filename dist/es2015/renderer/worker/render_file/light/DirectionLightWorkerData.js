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
import { SpecifyLightWorkerData } from "./SpecifyLightWorkerData";
var DirectionLightWorkerData = (function (_super) {
    __extends(DirectionLightWorkerData, _super);
    function DirectionLightWorkerData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DirectionLightWorkerData.intensities = null;
    DirectionLightWorkerData.isPositionDirtys = null;
    DirectionLightWorkerData.isIntensityDirtys = null;
    return DirectionLightWorkerData;
}(SpecifyLightWorkerData));
export { DirectionLightWorkerData };
//# sourceMappingURL=DirectionLightWorkerData.js.map