/// <reference path="Program.ts"/>
/// <reference path="Matrix.ts"/>
//todo type/mode直接改为gl.xxx
//todo 重构texture和textureArr属性
var Engine3D;
(function (Engine3D) {
    var Sprite = (function () {
        function Sprite(drawMode) {
            this._drawMode = null;
            //private _vertices = null;
            //private _normals = null;
            //private _texCoords = null;
            //private _indices = null;
            this._drawFunc = null;
            //private _action:{} = null;
            this._actionContainer = null;
            this._matrix = null;
            this._program = null;
            this._buffers = null;
            this._textureArr = null;
            this._drawMode = drawMode;
            //this._action = {};
            this._actionContainer = [];
            this._matrix = Math3D.Matrix.create();
        }
        Object.defineProperty(Sprite.prototype, "matrix", {
            get: function () {
                return this._matrix;
            },
            set: function (matrix) {
                this._matrix = matrix;
            },
            enumerable: true,
            configurable: true
        });
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
                            if (dataObj.type === 6 /* TEXTURE_ARR */) {
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
            }
            else {
                var totalComponents = this._buffers.indexBuffer.num;
                var startOffset = 0;
                this._drawFunc(totalComponents, startOffset);
            }
        };
        Sprite.prototype.init = function () {
            var self = this;
            if (this._buffers.indexBuffer) {
                //this.baseBuffer = this.buffers.indices;
                this._drawFunc = function (totalComponents, startOffset) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, self._buffers.vertexBuffer.buffer);
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
            //o.actionData = {
            //    "rotate": {
            //        action: "rotate",
            //        axis: [0, 1, 0],
            //        speed:10
            //    }
            //};
            //this._initAction();
            this.initData();
        };
        //
        //addActions(actionData){
        //    this._action = actionData;
        //}
        //private _initAction(){
        //    if(!this._actionData){
        //        return;
        //    }
        //
        //    var i = null;
        //
        //    for(i in this._actionData){
        //        if(this._actionData.hasOwnProperty(i)){
        //            this._action[i] =
        //        }
        //    }
        //    this._angle = 0;
        //    //switch (this._actionData.action){
        //    //    case "rotate":
        //    //        this._matrix.rotate(this.
        //    //}
        //}
        Sprite.prototype.runAction = function (action) {
            //todo 判断是否已有重复的
            this._actionContainer.push(action);
        };
        Sprite.prototype.runOnlyOneAction = function (action) {
            this._actionContainer = [action];
        };
        Sprite.prototype.update = function () {
            this._actionContainer.map("update");
            this._actionContainer.map("run");
        };
        Sprite.prototype.runRotateAction = function () {
            this.runOnlyOneAction(Engine3D.Action.Rotate.create(this._matrix, { axis: [0, 1, 0], speed: 1 }));
        };
        Sprite.create = function (drawMode) {
            var obj = new this(drawMode);
            return obj;
        };
        Sprite.prototype.onStartLoop = function () {
            this._matrix.push();
        };
        Sprite.prototype.onEndLoop = function () {
            this._matrix.pop();
        };
        //*钩子
        Sprite.prototype.initData = function () {
        };
        return Sprite;
    })();
    Engine3D.Sprite = Sprite;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Sprite.js.map