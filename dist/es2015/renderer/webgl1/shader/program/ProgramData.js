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
import { WebGL1ProgramDataCommon } from "../../utils/worker/render_file/shader/program/ProgramDataCommon";
var WebGL1ProgramData = (function (_super) {
    __extends(WebGL1ProgramData, _super);
    function WebGL1ProgramData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebGL1ProgramData;
}(WebGL1ProgramDataCommon));
export { WebGL1ProgramData };
//# sourceMappingURL=ProgramData.js.map