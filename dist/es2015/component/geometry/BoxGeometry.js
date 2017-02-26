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
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Geometry } from "./Geometry";
import { cloneAttributeAsBasicType } from "../../definition/typescript/decorator/clone";
import { Vector3 } from "../../math/Vector3";
import { GeometryUtils } from "./GeometryUtils";
var BoxGeometry = (function (_super) {
    __extends(BoxGeometry, _super);
    function BoxGeometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = null;
        _this.height = null;
        _this.depth = null;
        _this.widthSegments = 1;
        _this.heightSegments = 1;
        _this.depthSegments = 1;
        return _this;
    }
    BoxGeometry.create = function () {
        var geom = new this();
        return geom;
    };
    BoxGeometry.prototype.computeData = function () {
        var width = this.width, height = this.height, depth = this.depth, widthSegments = this.widthSegments, heightSegments = this.heightSegments, depthSegments = this.depthSegments, sides = {
            FRONT: 0,
            BACK: 1,
            TOP: 2,
            BOTTOM: 3,
            RIGHT: 4,
            LEFT: 5
        };
        var faceAxes = [
            [0, 1, 3],
            [4, 5, 7],
            [3, 2, 6],
            [1, 0, 4],
            [1, 4, 2],
            [5, 0, 6]
        ];
        var corners = [
            Vector3.create(-width, -height, depth),
            Vector3.create(width, -height, depth),
            Vector3.create(width, height, depth),
            Vector3.create(-width, height, depth),
            Vector3.create(width, -height, -depth),
            Vector3.create(-width, -height, -depth),
            Vector3.create(-width, height, -depth),
            Vector3.create(width, height, -depth)
        ];
        var vertices = [];
        var indices = [];
        function generateFace(side, uSegments, vSegments) {
            var x, y, z, u, v;
            var i, j;
            var offset = vertices.length / 3;
            for (i = 0; i <= uSegments; i++) {
                for (j = 0; j <= vSegments; j++) {
                    var temp1 = Vector3.create();
                    var temp2 = Vector3.create();
                    var temp3 = Vector3.create();
                    var r = Vector3.create();
                    temp1.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][1]], i / uSegments);
                    temp2.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][2]], j / vSegments);
                    temp3.sub2(temp2, corners[faceAxes[side][0]]);
                    r.add2(temp1, temp3);
                    u = i / uSegments;
                    v = j / vSegments;
                    vertices.push(r.x, r.y, r.z);
                    if ((i < uSegments) && (j < vSegments)) {
                        indices.push(offset + j + i * (uSegments + 1), offset + j + (i + 1) * (uSegments + 1), offset + j + i * (uSegments + 1) + 1);
                        indices.push(offset + j + (i + 1) * (uSegments + 1), offset + j + (i + 1) * (uSegments + 1) + 1, offset + j + i * (uSegments + 1) + 1);
                    }
                }
            }
        }
        generateFace(sides.FRONT, widthSegments, heightSegments);
        generateFace(sides.BACK, widthSegments, heightSegments);
        generateFace(sides.TOP, widthSegments, depthSegments);
        generateFace(sides.BOTTOM, widthSegments, depthSegments);
        generateFace(sides.RIGHT, depthSegments, heightSegments);
        generateFace(sides.LEFT, depthSegments, heightSegments);
        return {
            vertices: vertices,
            faces: GeometryUtils.convertToFaces(indices)
        };
    };
    return BoxGeometry;
}(Geometry));
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "width", void 0);
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "height", void 0);
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "depth", void 0);
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "widthSegments", void 0);
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "heightSegments", void 0);
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "depthSegments", void 0);
BoxGeometry = __decorate([
    registerClass("BoxGeometry")
], BoxGeometry);
export { BoxGeometry };
//# sourceMappingURL=BoxGeometry.js.map