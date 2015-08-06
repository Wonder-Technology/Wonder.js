/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class Shader{
        public static create(vsSource:string, fsSource:string) {
        	var obj = new this(vsSource, fsSource);

        	return obj;
        }

        private _vsSource:string = null;
        get vsSource(){
            return this._vsSource;
        }
        set vsSource(vsSource:string){
            this._vsSource = vsSource;
        }
        private _fsSource:string = null;
        get fsSource(){
            return this._fsSource;
        }
        set fsSource(fsSource:string){
            this._fsSource = fsSource;
        }

        constructor(vsSource:string, fsSource:string){
        	this._vsSource = vsSource;
        	this._fsSource = fsSource;
        }

        public createVsShader(){
            var gl = Director.getInstance().gl;

            return this._initShader(gl.createShader(gl.VERTEX_SHADER), this._vsSource);
        }

        public createFsShader(){
            var gl = Director.getInstance().gl;

            return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this._fsSource);
        }

        public isEqual(other:Shader){
            return this._vsSource === other.vsSource
            && this._fsSource === other.fsSource;
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
