/// <reference path="WebGLContext.ts"/>
/// <reference path="Shader.ts"/>
/// <reference path="ShaderType.ts"/>
/// <reference path="UniformDataType.ts"/>
/// <reference path="AttributeDataType.ts"/>
/// <reference path="math/Matrix.ts"/>
module Engine3D{
    export class Program{
        public static create(vsSource:string, fsSource:string):Program {
            var obj = new this();

            obj.initWhenCreate(vsSource, fsSource);

            return obj;
        }

        private _program:any = WebGLContext.gl.createProgram();

        constructor(){
        }

        public use(){
            WebGLContext.gl.useProgram(this._program);
        }

        public setUniformData(name:string, type:UniformDataType, data:Matrix){
            var gl = WebGLContext.gl,
                pos= gl.getUniformLocation(this._program, name);

            switch (type){
                case UniformDataType.FLOAT_MAT4:
                    gl.uniformMatrix4fv(pos,false, data.values);
                    break;
                default :
                    throw new Error("数据类型错误");
                    break;
            }
        }

        public setAttributeData(name:string, type:AttributeDataType, data:ArrayBuffer|number[]){
            var gl = WebGLContext.gl,
                pos = gl.getAttribLocation(this._program, name);

            if(pos === 0){
                gl.bindAttribLocation( this._program, 0, name);
            }

            switch (type){
                case AttributeDataType.FLOAT_4:
                    let dataArr:number[] = <Array<number>>data;
                    gl.vertexAttrib4f(pos, dataArr[0], dataArr[1], dataArr[2], dataArr[3]);
                    break;
                case AttributeDataType.BUFFER:
                    let buffer:ArrayBuffer = <ArrayBuffer>data;
                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
                    gl.vertexAttribPointer(pos, buffer.num, buffer.type, false, 0, 0);
                    gl.enableVertexAttribArray(pos);
                    break;
                default :
                    throw new Error("数据类型错误");
                    break;
            }
        }

        public initWhenCreate(vsSource:string, fsSource:string){
            var gl = WebGLContext.gl,
                vs = null,
                fs = null;

            vs = Shader.createShader(vsSource, ShaderType.VS);
            fs = Shader.createShader(fsSource, ShaderType.FS);

            // 向程序对象里分配着色器
            gl.attachShader(this._program, vs);
            gl.attachShader(this._program, fs);


            /*!
            if bower warn:"Attribute 0 is disabled. This has significant performance penalty",
            then do this before linkProgram:
             gl.bindAttribLocation( this._program, 0, "a_position");



             can reference here:
             http://stackoverflow.com/questions/20305231/webgl-warning-attribute-0-is-disabled-this-has-significant-performance-penalt?answertab=votes#tab-top


             OpenGL requires attribute zero to be enabled otherwise it will not render anything.
             On the other hand OpenGL ES 2.0 on which WebGL is based does not. So, to emulate OpenGL ES 2.0 on top of OpenGL if you don't enable attribute 0 the browser has to make a buffer for you large enough for the number of vertices you've requested to be drawn, fill it with the correct value (see gl.vertexAttrib),
              attach it to attribute zero, and enable it.

             It does all this behind the scenes but it's important for you to know that it takes time to create and fill that buffer. There are optimizations the browser can make but in the general case,
             if you were to assume you were running on OpenGL ES 2.0 and used attribute zero as a constant like you are supposed to be able to do, without the warning you'd have no idea of the work the browser is doing on your behalf to emulate that feature of OpenGL ES 2.0 that is different from OpenGL.

             In your particular case the warning doesn't have much meaning. It looks like you are only drawing a single point. But it would not be easy for the browser to figure that out so it just warns you anytime you draw and attribute 0 is not enabled.


             https://github.com/mrdoob/three.js/issues/3896
             */

            // 将着色器连接
            gl.linkProgram(this._program);

            // 判断着色器的连接是否成功
            if(gl.getProgramParameter(this._program, gl.LINK_STATUS)){

                // 返回程序对象
                return this._program;
            }else{

                // 如果失败，弹出错误信息
                alert(gl.getProgramInfoLog(this._program));

                return null;
            }
        }
    }
}
