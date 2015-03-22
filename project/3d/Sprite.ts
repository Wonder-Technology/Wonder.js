/// <reference path="Program.ts"/>

//todo type/mode直接改为gl.xxx
module Engine3D{
    declare var gl:any;

    export class Sprite{
        constructor(drawMode){
            //this._buffer = [];
            this._drawMode = drawMode;
        }

        private _drawMode = null;
        private _program:Program = null;
        private _vertices = null;
        private _normals = null;
        private _texCoords = null;
        private _indices = null;
        private _buffers:any = null;
        private _texture = null;
        private _drawFunc = null;


        get program() { return this._program; }
        set program(program:Program) {
            this._program = program;
        }

        get buffers() { return this._buffers; }
        set buffers(buffers:any) {
            this._buffers = buffers;
        }

        //get buffers() { return this._buffers; }

        //setVertices(){
        //
        //}
        //
        //setNormals(){
        //
        //}

        setBuffers(buffers){
            var self = this;

            this._buffers = buffers;
            if (this._buffers.indexBuffer) {
                //this.baseBuffer = this.buffers.indices;
                this._drawFunc = function(totalComponents, startOffset) {
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self._buffers.indexBuffer.buffer);
                    gl.drawElements(gl[this._drawMode], totalComponents, this._buffers.indexBuffer.type, startOffset);
                }
            } else {
                //for (var key in this.buffers) {
                //    this.baseBuffer = this.buffers[key];
                //    break;
                //}
                this._drawFunc = function(totalComponents, startOffset) {
                    gl.drawArrays(gl[this._drawMode], startOffset, totalComponents);
                }
            }
        }
        draw(dataArr){
            var self = this;

            if(dataArr){
                dataArr.forEach(function(dataObj){
                    switch (dataObj.category){
                        case "attribute":
                            self._program.setAttributeData(dataObj.name, dataObj.buffer);
                            break;
                        case "uniform":
                            self._program.setUniformData(dataObj.name, dataObj.type,dataObj.val);
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
        }

        public static create(drawMode):Sprite {
            var obj = new Sprite(drawMode);

            return obj;
        }
    }
}