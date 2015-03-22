/// <reference path="Program.ts"/>
//todo type/mode直接改为gl.xxx
var Engine3D;
(function (Engine3D) {
    var Sprite = (function () {
        function Sprite(drawMode) {
            this._drawMode = null;
            this._program = null;
            this._vertices = null;
            this._normals = null;
            this._texCoords = null;
            this._indices = null;
            this._buffers = null;
            this._texture = null;
            this._drawFunc = null;
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
                    gl.drawElements(gl[this._drawMode], totalComponents, this._buffers.indexBuffer.type, startOffset);
                };
            }
            else {
                //for (var key in this.buffers) {
                //    this.baseBuffer = this.buffers[key];
                //    break;
                //}
                this._drawFunc = function (totalComponents, startOffset) {
                    gl.drawArrays(gl[this._drawMode], startOffset, totalComponents);
                };
            }
        };
        Sprite.prototype.draw = function (dataArr) {
            var self = this;
            if (dataArr) {
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
            }
            //var totalComponents = buffers.indices? buffers.indices.totalComponents(): buffers.position.numElements();
            var totalComponents = this._buffers.indexBuffer.num;
            var startOffset = 0;
            this._drawFunc(totalComponents, startOffset);
        };
        Sprite.create = function (drawMode) {
            var obj = new Sprite(drawMode);
            return obj;
        };
        return Sprite;
    })();
    Engine3D.Sprite = Sprite;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Sprite.js.map