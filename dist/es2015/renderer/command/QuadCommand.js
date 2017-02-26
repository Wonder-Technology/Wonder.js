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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RenderCommand } from "./RenderCommand";
import { requireGetter, assert } from "../../definition/typescript/decorator/contract";
import { Log } from "../../utils/Log";
var QuadCommand = (function (_super) {
    __extends(QuadCommand, _super);
    function QuadCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mMatrix = null;
        _this.vMatrix = null;
        _this.pMatrix = null;
        _this.buffers = null;
        _this.material = null;
        _this.target = null;
        _this.sortId = null;
        return _this;
    }
    Object.defineProperty(QuadCommand.prototype, "program", {
        get: function () {
            return this.material.program;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuadCommand.prototype, "mvpMatrix", {
        get: function () {
            return this.mMatrix.applyMatrix(this.vMatrix, true).applyMatrix(this.pMatrix, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuadCommand.prototype, "vpMatrix", {
        get: function () {
            return this.vMatrix.applyMatrix(this.pMatrix, true);
        },
        enumerable: true,
        configurable: true
    });
    QuadCommand.prototype.execute = function () {
        var material = this.material;
        material.updateShader(this);
        this.draw(material);
    };
    return QuadCommand;
}(RenderCommand));
export { QuadCommand };
__decorate([
    requireGetter(function () {
        assert(!!this.mMatrix && !!this.vMatrix && !!this.pMatrix, Log.info.FUNC_NOT_EXIST("mMatrix or vMatrix or pMatrix"));
    })
], QuadCommand.prototype, "mvpMatrix", null);
__decorate([
    requireGetter(function () {
        assert(!!this.vMatrix && !!this.pMatrix, Log.info.FUNC_NOT_EXIST("vMatrix or pMatrix"));
    })
], QuadCommand.prototype, "vpMatrix", null);
//# sourceMappingURL=QuadCommand.js.map