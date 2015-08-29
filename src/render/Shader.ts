/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class Shader{
        public static create(vsSource:string, fsSource:string) {
        	var obj = new this(vsSource, fsSource);

        	return obj;
        }

        public vsSource:string = null;
        public fsSource:string = null;

        constructor(vsSource:string, fsSource:string){
        	this.vsSource = vsSource;
        	this.fsSource = fsSource;
        }

        public createVsShader(){
            var gl = Director.getInstance().gl;

            return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
        }

        public createFsShader(){
            var gl = Director.getInstance().gl;

            return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this.fsSource);
        }

        public isEqual(other:Shader){
            return this.vsSource === other.vsSource
            && this.fsSource === other.fsSource;
        }

        private _initShader(shader, source){
            var gl = Director.getInstance().gl;

            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
                return shader;
            }
            else{
                //todo error?
                dyCb.Log.log(gl.getShaderInfoLog(shader));
            }
        }
    }
}
