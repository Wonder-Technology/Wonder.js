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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var RendererComponent_1 = require("./RendererComponent");
var contract_1 = require("../../definition/typescript/decorator/contract");
var CameraController_1 = require("../camera/controller/CameraController");
var wonder_expect_js_1 = require("wonder-expect.js");
var SingleDrawCommand_1 = require("../../renderer/command/SingleDrawCommand");
var MeshRenderer = (function (_super) {
    __extends(MeshRenderer, _super);
    function MeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshRenderer.create = function () {
        var obj = new this();
        return obj;
    };
    MeshRenderer.prototype.render = function (renderer, target, camera) {
        var geometry = target.getGeometry();
        if (!geometry) {
            return;
        }
        renderer.addCommand(this.createDrawCommand(target, geometry, camera));
    };
    MeshRenderer.prototype.createDrawCommand = function (target, geometry, camera) {
        var cmd = null, cameraComponent = camera.getComponent(CameraController_1.CameraController), material = geometry.material;
        cmd = this._createCommand(target, material);
        cmd.target = target;
        cmd.buffers = geometry.buffers;
        cmd.drawMode = geometry.drawMode;
        cmd.mMatrix = target.transform.localToWorldMatrix;
        if (target.data && target.data.vMatrix) {
            cmd.vMatrix = target.data.vMatrix;
        }
        else {
            cmd.vMatrix = cameraComponent.worldToCameraMatrix;
        }
        if (target.data && target.data.pMatrix) {
            cmd.pMatrix = target.data.pMatrix;
        }
        else {
            cmd.pMatrix = cameraComponent.pMatrix;
        }
        cmd.material = material;
        return cmd;
    };
    MeshRenderer.prototype._createCommand = function (target, material) {
        var cmd = null;
        cmd = SingleDrawCommand_1.SingleDrawCommand.create();
        cmd.normalMatrix = this.entityObject.transform.normalMatrix;
        return cmd;
    };
    return MeshRenderer;
}(RendererComponent_1.RendererComponent));
__decorate([
    contract_1.requireCheck(function (target, geometry, camera) {
        var controller = camera.getComponent(CameraController_1.CameraController);
        contract_1.it("camera must add Camera Component", function () {
            wonder_expect_js_1.default(!!controller && !!controller.camera).true;
        });
        contract_1.it("Mesh must add geometry component", function () {
            wonder_expect_js_1.default(!!geometry).true;
        });
    })
], MeshRenderer.prototype, "createDrawCommand", null);
MeshRenderer = __decorate([
    registerClass_1.registerClass("MeshRenderer")
], MeshRenderer);
exports.MeshRenderer = MeshRenderer;
//# sourceMappingURL=MeshRenderer.js.map