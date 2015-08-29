/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class Program{
        public static create():Program {
            var obj = new this();

            return obj;
        }

        private _program:any = Director.getInstance().gl.createProgram();
        private _shader:Shader = null;

        public use(){
            Director.getInstance().gl.useProgram(this._program);
        }

        public getUniformLocation(name:string){
            return Director.getInstance().gl.getUniformLocation(this._program, name);
        }

        public setUniformData(name:string, type:UniformDataType, data:any){
            var gl = Director.getInstance().gl,
                pos= gl.getUniformLocation(this._program, name);

            if(pos === null){
                return;
            }

            switch (type){
                case UniformDataType.FLOAT_MAT4:
                    gl.uniformMatrix4fv(pos,false, data.values);
                    break;
                case UniformDataType.FLOAT_4:
                    gl.uniform4f(pos, data.x, data.y, data.z, data.w);
                    break;
                case UniformDataType.NUMBER_1:
                    gl.uniform1i(pos, data);
                    break;
                default :
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("UniformDataType"));
                    break;
            }
        }

        public setAttributeData(name:string, type:AttributeDataType, data:render.ArrayBuffer|number[]){
            var gl = Director.getInstance().gl,
                pos = gl.getAttribLocation(this._program, name);

            if(pos === -1){
                return;
            }

            switch (type){
                case AttributeDataType.FLOAT_4:
                    let dataArr:number[] = <Array<number>>data;
                    gl.vertexAttrib4f(pos, dataArr[0], dataArr[1], dataArr[2], dataArr[3]);
                    break;
                case AttributeDataType.BUFFER:
                    let buffer:render.ArrayBuffer = <render.ArrayBuffer>data;
                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
                    gl.vertexAttribPointer(pos, buffer.num, buffer.type, false, 0, 0);
                    gl.enableVertexAttribArray(pos);
                    break;
                default :
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("AttributeDataType"));
                    break;
            }
        }

        public initWithShader(shader:Shader){
            var gl = Director.getInstance().gl,
                result = null,
                vs = null,
                fs = null;

            vs = shader.createVsShader();
            fs = shader.createFsShader();

            this._shader = shader;

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


            gl.linkProgram(this._program);

            dyCb.Log.error(gl.getProgramParameter(this._program, gl.LINK_STATUS) === false, gl.getProgramInfoLog(this._program));

            result = this._program;

            /*!
             should detach and delete shaders after linking the program

             explain:
             The shader object, due to being attached to the program object, will continue to exist even if you delete the shader object. It will only be deleted by the system when it is no longer attached to any program object (and when the user has asked to delete it, of course).

             "Deleting" the shader, as with all OpenGL objects, merely sets a flag that says you don't need it any more. OpenGL will keep it around for as long as it needs it itself, and will do the actual delete any time later (most likely, but not necessarily, after the program is deleted).
             */
            gl.deleteShader(vs);
            gl.deleteShader(fs);

            return result;
        }

        public isChangeShader(shader:Shader){
            return this._shader ? !this._shader.isEqual(shader) : true;
        }
    }
}
