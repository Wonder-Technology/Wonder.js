/// <reference path="Camera.ts"/>
/// <reference path="Sprite.ts"/>
/// <reference path="Light.ts"/>
/// <reference path="Program.ts"/>
var Engine3D;
(function (Engine3D) {
    var Scene = (function () {
        function Scene(camera) {
            this._camera = null;
            this._sprites = null;
            this._pointLightArr = null;
            this._program = null;
            this._ambientColor = null;
            this._camera = camera;
        }
        Object.defineProperty(Scene.prototype, "program", {
            get: function () {
                return this._program;
            },
            set: function (program) {
                this._program = program;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "ambientColor", {
            get: function () {
                return this._ambientColor;
            },
            set: function (ambientColor) {
                this._ambientColor = ambientColor;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.addSprites = function (spriteArr) {
            this._sprites = this._sprites.concat(spriteArr);
        };
        Scene.prototype.addLight = function (pointLightArr) {
            this._pointLightArr = pointLightArr;
        };
        Scene.prototype.onStartLoop = function () {
            this._sprites.forEach(function (x) { return x.onStartLoop(); });
        };
        Scene.prototype.onEndLoop = function () {
            this._sprites.forEach(function (x) { return x.onEndLoop(); });
        };
        Scene.prototype.run = function () {
            var self = this;
            this._program.use();
            this._sprites.forEach(function (sprite) {
                sprite.update();
                self._setData(sprite);
                sprite.draw(self._program);
            });
        };
        Scene.prototype._setData = function (sprite) {
            var dataArr = [];
            var self = this;
            if (sprite.buffers.vertexBuffer) {
                dataArr.push({
                    name: "a_position",
                    buffer: sprite.buffers.vertexBuffer,
                    category: "attribute"
                });
            }
            if (sprite.buffers.texCoordBuffer) {
                dataArr.push({
                    name: "a_texCoord",
                    buffer: sprite.buffers.texCoordBuffer,
                    category: "attribute"
                });
            }
            if (sprite.buffers.normalBuffer) {
                dataArr.push({
                    name: "a_normal",
                    buffer: sprite.buffers.normalBuffer,
                    category: "attribute"
                });
            }
            if (this._hasLight()) {
                var viewPos = this._camera.computeViewPosInWorldCoordinate();
                var normalMatrix = Math3D.Matrix.create();
                normalMatrix.setInverseOf(sprite.matrix);
                normalMatrix.transpose();
                dataArr = dataArr.concat([{
                    name: "u_normalMatrix",
                    type: 3 /* FLOAT_MAT4 */,
                    val: normalMatrix.values,
                    category: "uniform"
                }, {
                    name: "u_mMatrix",
                    type: 3 /* FLOAT_MAT4 */,
                    val: sprite.matrix.values,
                    category: "uniform"
                }, {
                    name: "u_ambient",
                    type: 2 /* FLOAT_3 */,
                    val: this._ambientColor,
                    category: "uniform"
                }, {
                    name: "u_viewPos",
                    type: 2 /* FLOAT_3 */,
                    val: viewPos,
                    category: "uniform"
                }]);
                this._pointLightArr.forEach(function (light, index) {
                    dataArr.push({
                        name: "u_pointLights[" + index + "]",
                        type: 8 /* STRUCT */,
                        val: {
                            member: [
                                ["FLOAT_3", "position"],
                                ["FLOAT_3", "color"],
                                ["FLOAT", "intensity"],
                                ["FLOAT", "range"],
                                ["FLOAT", "constant"],
                                ["FLOAT", "linear"],
                                ["FLOAT", "quadratic"]
                            ],
                            val: light
                        },
                        category: "uniform"
                    });
                });
            }
            var mvpMatrix = this._computeMvpMatrix(sprite);
            dataArr.push({
                name: "u_mvpMatrix",
                type: 3 /* FLOAT_MAT4 */,
                val: mvpMatrix.values,
                category: "uniform"
            });
            dataArr.forEach(function (dataObj) {
                switch (dataObj.category) {
                    case "attribute":
                        self._program.setAttributeData(dataObj.name, dataObj.buffer);
                        break;
                    case "uniform":
                        self._program.setUniformData(dataObj.name, dataObj.type, dataObj.val);
                        break;
                    default:
                        break;
                }
            });
        };
        Scene.prototype._computeMvpMatrix = function (sprite) {
            return sprite.matrix.copy().concat(this._camera.computeVpMatrix());
        };
        Scene.prototype._hasLight = function () {
            return !!(this._pointLightArr && this._pointLightArr.length > 0);
        };
        Scene.prototype.initWhenCreate = function () {
            this._sprites = [];
        };
        Scene.create = function (camera) {
            var obj = new this(camera);
            obj.initWhenCreate();
            return obj;
        };
        return Scene;
    })();
    Engine3D.Scene = Scene;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Scene.js.map