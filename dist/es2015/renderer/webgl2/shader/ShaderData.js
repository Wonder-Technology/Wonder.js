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
import { WebGL2ShaderDataCommon } from "../utils/worker/render_file/shader/ShaderDataCommon";
var WebGL2ShaderData = (function (_super) {
    __extends(WebGL2ShaderData, _super);
    function WebGL2ShaderData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebGL2ShaderData;
}(WebGL2ShaderDataCommon));
export { WebGL2ShaderData };
//# sourceMappingURL=ShaderData.js.map