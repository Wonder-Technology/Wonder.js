/// <reference path="../definitions.d.ts"/>
module dy{
    declare var document:any;

    export class Shader{
        constructor(){}

        public static createShader(source:string, type:ShaderType){
            var shader = null,
                gl = Director.getInstance().gl;

            switch(type){
                case ShaderType.VS:
                    shader = gl.createShader(gl.VERTEX_SHADER);
                    break;
                case ShaderType.FS:
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                    break;
                default :
                    return;
            }

            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
                return shader;
            }
            else{
                dyCb.Log.log(gl.getShaderInfoLog(shader));
            }
        }
    }
}
