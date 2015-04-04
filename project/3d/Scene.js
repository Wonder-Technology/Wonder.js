/// <reference path="Camera.ts"/>
/// <reference path="Sprite.ts"/>
/// <reference path="Light.ts"/>
/// <reference path="Program.ts"/>
var Engine3D;
(function (Engine3D) {
    var Scene = (function () {
        function Scene(camera) {
            this._sprites = null;
            this._pointLightArr = null;
            this._frameBuffer = null;
            this._isDrawInFrameBuffer = null;
            this._scenesInFrameBuffer = null;
            this._camera = null;
            this._program = null;
            this._ambientColor = null;
            this._camera = camera;
        }
        Object.defineProperty(Scene.prototype, "scenesInFrameBuffer", {
            get: function () {
                return this._scenesInFrameBuffer;
            },
            set: function (scenesInFrameBuffer) {
                this._scenesInFrameBuffer = scenesInFrameBuffer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            set: function (camera) {
                this._camera = camera;
            },
            enumerable: true,
            configurable: true
        });
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
                //draw in frameBuffer is before this draw
                //and already update in that draw!
                //todo refactor
                if (!self._isDrawInFrameBuffer) {
                    sprite.update();
                }
                self._setData(sprite);
                sprite.draw(self._program);
            });
        };
        Scene.prototype.setFrameData = function (frameBuffer, data) {
            this._frameBuffer = frameBuffer;
            this._scenesInFrameBuffer = data;
        };
        Scene.prototype.drawScenesInFrameBuffer = function () {
            //draw 6 face
            //todo if not all faces be real-render?
            var i = 0, len = Engine3D.TextureCubeMap.faceTargets.length;
            var self = this;
            for (i = 0; i < len; i++) {
                this._frameBuffer.bind(i);
                //gl.clearColor(0,0,1,0);
                //gl.clearDepth(1);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
                var vpMatrix = self.getVPMatrix(i);
                this._scenesInFrameBuffer.forEach(function (scene) {
                    scene.drawInFrameBuffer(vpMatrix);
                });
            }
            this._frameBuffer.unBind();
        };
        Scene.prototype.getVPMatrix = function (index) {
            var faceViews = [
                { target: [1, 0, 0], up: [0, -1, 0] },
                { target: [-1, 0, 0], up: [0, -1, 0] },
                { target: [0, 1, 0], up: [0, 0, 1] },
                { target: [0, -1, 0], up: [0, 0, -1] },
                { target: [0, 0, 1], up: [0, -1, 0] },
                { target: [0, 0, -1], up: [0, -1, 0] },
            ];
            //todo how to decide eye?eye should be dynamic
            //eye is in center point of sphere, center(target) is towards -z axis
            var eyeX = 0, eyeY = 0, eyeZ = 0;
            var vpMatrix = Math3D.Matrix.create();
            var center = faceViews[index].target;
            var up = faceViews[index].up;
            vpMatrix.lookAt(eyeX, eyeY, eyeZ, center[0], center[1], center[2], up[0], up[1], up[2]);
            vpMatrix.perspective(60, this._frameBuffer.width / this._frameBuffer.height, 0.1, 10);
            return vpMatrix;
        };
        Scene.prototype.drawInFrameBuffer = function (vpMatrix) {
            var self = this;
            this._program.use();
            this._isDrawInFrameBuffer = true;
            this._sprites.forEach(function (sprite) {
                sprite.update();
                self._setData(sprite, vpMatrix);
                sprite.draw(self._program);
            });
        };
        Scene.prototype._setData = function (sprite, vpMatrix) {
            var dataArr = [];
            var self = this;
            this.onSetData(sprite, this._program);
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
            ////todo refactor
            ////todo make it public?
            var mvpMatrix = this._computeMvpMatrix(sprite, vpMatrix);
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
        Scene.prototype._computeMvpMatrix = function (sprite, vpMatrix) {
            if (vpMatrix) {
                var vp = vpMatrix;
                var mvpMatrix = sprite.matrix.copy().concat(vp);
                return mvpMatrix;
            }
            return sprite.matrix.copy().concat(this._camera.computeVpMatrix());
        };
        Scene.prototype._hasLight = function () {
            return !!(this._pointLightArr && this._pointLightArr.length > 0);
        };
        Scene.prototype.initWhenCreate = function () {
            this._sprites = [];
            this._isDrawInFrameBuffer = false;
        };
        Scene.create = function (camera) {
            var obj = new this(camera);
            obj.initWhenCreate();
            return obj;
        };
        //hook
        Scene.prototype.onSetData = function (sprite, program) {
        };
        return Scene;
    })();
    Engine3D.Scene = Scene;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Scene.js.map