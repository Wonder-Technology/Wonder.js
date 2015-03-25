/// <reference path="Program.ts"/>
//todo type/mode直接改为gl.xxx
//todo 重构texture和textureArr属性
var Engine3D;
(function (Engine3D) {
    var Sprite = (function () {
        function Sprite(drawMode) {
            this._drawMode = null;
            this._program = null;
            //private _vertices = null;
            //private _normals = null;
            //private _texCoords = null;
            //private _indices = null;
            this._buffers = null;
            this._drawFunc = null;
            this._textureArr = null;
            //this._buffer = [];
            this._drawMode = drawMode;
        }
        Object.defineProperty(Sprite.prototype, "program", {
            get: function () {
                return this._program;
            },
            set: function (program) {
                this._program = program;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "buffers", {
            get: function () {
                return this._buffers;
            },
            set: function (buffers) {
                this._buffers = buffers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "textureArr", {
            get: function () {
                return this._textureArr;
            },
            set: function (textureArr) {
                if (textureArr.length > 8) {
                    //todo query the supported max num
                    console.log("纹理数超过了8个");
                }
                this._textureArr = textureArr;
            },
            enumerable: true,
            configurable: true
        });
        //get buffers() { return this._buffers; }
        //setVertices(){
        //
        //}
        //
        //setNormals(){
        //
        //}
        Sprite.prototype.setBuffers = function (buffers) {
            var self = this;
            this._buffers = buffers;
            if (this._buffers.indexBuffer) {
                //this.baseBuffer = this.buffers.indices;
                this._drawFunc = function (totalComponents, startOffset) {
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self._buffers.indexBuffer.buffer);
                    gl.drawElements(gl[self._drawMode], totalComponents, self._buffers.indexBuffer.type, self.buffers.indexBuffer.typeSize * startOffset);
                };
            }
            else {
                //for (var key in this.buffers) {
                //    this.baseBuffer = this.buffers[key];
                //    break;
                //}
                //todo 待验证
                this._drawFunc = function (totalComponents, startOffset) {
                    gl.drawArrays(gl[self._drawMode], startOffset, totalComponents);
                };
            }
        };
        Sprite.prototype.draw = function (dataArr) {
            var self = this;
            var uniformDataForTextureArr = null;
            if (dataArr) {
                dataArr.forEach(function (dataObj) {
                    switch (dataObj.category) {
                        case "attribute":
                            self._program.setAttributeData(dataObj.name, dataObj.buffer);
                            break;
                        case "uniform":
                            if (dataObj.type === 4 /* TEXTURE_ARR */) {
                                uniformDataForTextureArr = dataObj;
                                return;
                            }
                            self._program.setUniformData(dataObj.name, dataObj.type, dataObj.val);
                            break;
                        default:
                            break;
                    }
                });
            }
            if (this._textureArr) {
                if (!uniformDataForTextureArr) {
                    throw new Error("对于纹理数组，需要设置片段着色器的sampler2D变量");
                }
                this._textureArr.forEach(function (data, index) {
                    self._program.setUniformData(uniformDataForTextureArr.name, uniformDataForTextureArr.type, index);
                    data.texture.bindToUnit(index);
                    self._drawFunc(data.indexCount, data.indexOffset);
                });
                return;
            }
            var totalComponents = this._buffers.indexBuffer.num;
            var startOffset = 0;
            this._drawFunc(totalComponents, startOffset);
        };
        Sprite.create = function (drawMode) {
            var obj = new this(drawMode);
            return obj;
        };
        return Sprite;
    })();
    Engine3D.Sprite = Sprite;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Sprite.js.map