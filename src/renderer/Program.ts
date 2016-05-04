module wd{
    export class Program extends Entity{
        public static create():Program {
            var obj = new this();

            return obj;
        }

        private _program:any = null;
        private _shader:Shader = null;
        private _getAttribLocationCache:wdCb.Hash<number> = wdCb.Hash.create<number>();
        private _getUniformLocationCache:wdCb.Hash<number> = wdCb.Hash.create<number>();
        private _vertexAttribHistory:wdCb.Hash<number> = wdCb.Hash.create<number>();

        public use(){
            DeviceManager.getInstance().gl.useProgram(this._program);
        }

        /*!
         not use @cache,
         here judge return pos of "getChild", so it don't need to invoke "hasChild"
         */
        public getUniformLocation(name:string){
            var pos = null,
                gl = DeviceManager.getInstance().gl;


            if(!this._shader.dirty){
                pos = this._getUniformLocationCache.getChild(name);

                if(pos !== void 0){
                    return pos;
                }
            }

            pos = gl.getUniformLocation(this._program, name);

            this._getUniformLocationCache.addChild(name, pos);

            return pos;
        }

        /*!
         not use @cache,
         here judge return pos of "getChild", so it don't need to invoke "hasChild"
         */
        public getAttribLocation(name:string){
            var pos = null,
                gl = DeviceManager.getInstance().gl;

            if(!this._shader.dirty){
                pos = this._getAttribLocationCache.getChild(name);

                if(pos !== void 0){
                    return pos;
                }
            }

            pos = gl.getAttribLocation(this._program, name);

            this._getAttribLocationCache.addChild(name, pos);

            return pos;
        }

        public sendUniformData(name:string, type:EVariableType, data:any);
        public sendUniformData(pos:WebGLUniformLocation, type:EVariableType, data:any);

        //todo ensure: only send data of the same name one time in one frame
        public sendUniformData(...args){
            var gl = DeviceManager.getInstance().gl,
                pos = null,
                type:EVariableType = null,
                data:any = null;

            type = args[1];
            data = args[2];

            if(JudgeUtils.isString(args[0])){
                let name:string = args[0];

                pos = this.getUniformLocation(name);
            }
            else{
                pos = args[0];
            }

            if (this.isUniformDataNotExistByLocation(pos) || data === null) {
                return;
            }

            switch (type){
                case EVariableType.FLOAT_1:
                    gl.uniform1f(pos, Number(data));
                    break;
                case EVariableType.FLOAT_2:
                    data = this._convertToArray2(data);
                    gl.uniform2f(pos, data[0], data[1]);
                    break;
                case EVariableType.FLOAT_3:
                    data = this._convertToArray3(data);
                    gl.uniform3f(pos, data[0], data[1], data[2]);
                    break;
                case EVariableType.FLOAT_4:
                    data = this._convertToArray4(data);
                    gl.uniform4f(pos, data[0], data[1], data[2], data[3]);
                    break;
                case EVariableType.FLOAT_MAT3:
                    gl.uniformMatrix3fv(pos,false, data.values);
                    break;
                case EVariableType.FLOAT_MAT4:
                    gl.uniformMatrix4fv(pos,false, data.values);
                    break;
                case EVariableType.NUMBER_1:
                case EVariableType.SAMPLER_CUBE:
                case EVariableType.SAMPLER_2D:
                    gl.uniform1i(pos, Number(data));
                    break;
                case EVariableType.SAMPLER_ARRAY:
                    this._sendSampleArray(gl, pos, data);
                    break;
                default :
                    Log.error(true, Log.info.FUNC_INVALID("EVariableType:", type));
                    break;
            }
        }

        //todo ensure: only send data of the same name one time in one frame
        @require(function(name:string, type:EVariableType, data:any){
            if(data){
                assert(data instanceof ArrayBuffer, Log.info.FUNC_MUST_BE("ArrayBuffer"));

                assert(type === EVariableType.BUFFER, Log.info.FUNC_SHOULD("type", `be EVariableType.BUFFER, but actual is ${type}`));
            }
        })
        public sendAttributeData(name:string, type:EVariableType, data:any){
            var gl = DeviceManager.getInstance().gl,
                pos:number = null,
                buffer:ArrayBuffer = null;

            pos = this.getAttribLocation(name);

            if (pos === -1 || data === null) {
                return;
            }

            buffer = data;

            switch (type){
                case EVariableType.BUFFER:
                    this._vertexAttribHistory.addChild(String(pos), true);

                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
                    gl.vertexAttribPointer(pos, buffer.size, buffer.type, false, 0, 0);
                    gl.enableVertexAttribArray(pos);
                    break;
                default :
                    Log.error(true, Log.info.FUNC_INVALID("EVariableType:", type));
                    break;
            }
        }

        public sendStructureData(name:string, type:EVariableType, data:any){
            this.sendUniformData(name, type, data);
        }

        public initWithShader(shader:Shader){
            var gl = DeviceManager.getInstance().gl,
                vs = null,
                fs = null;

            if(this._program){
                this.dispose();
            }

            this._program = DeviceManager.getInstance().gl.createProgram();

            vs = shader.createVsShader();
            fs = shader.createFsShader();

            this._shader = shader;

            gl.attachShader(this._program, vs);
            gl.attachShader(this._program, fs);


            /*!
             if warn:"Attribute 0 is disabled. This has significant performance penalty" when run,
             then do this before linkProgram:
             gl.bindAttribLocation( this._program, 0, "a_position");



             can reference here:
             http://stackoverflow.com/questions/20305231/webgl-warning-attribute-0-is-disabled-this-has-significant-performance-penalt?answertab=votes#tab-top


             OpenGL requires attribute zero to be enabled otherwise it will not render anything.
             On the other hand OpenGL ES 2.0 on which WebGL is based does not. So, to emulate OpenGL ES 2.0 on top of OpenGL if you don't enable attribute 0 the browser has to make a buffer for you large enough for the number of vertices you've requested to be drawn, fill it with the correct value (see gl.vertexAttrib),
             attach it to attribute zero, and enable it.

             It does all this behind the scenes but it's important for you to know that it takes time to create and fill that buffer. There are optimizations the browser can make but in the general case,
             if you were to assume you were running on OpenGL ES 2.0 and used attribute zero as a constant like you are supposed to be able to do, without the warning you'd have no idea of the work the browser is doing on your behalf to emulate that feature of OpenGL ES 2.0 that is different from OpenGL.

             require your particular case the warning doesn't have much meaning. It looks like you are only drawing a single point. But it would not be easy for the browser to figure that out so it just warns you anytime you draw and attribute 0 is not enabled.
             */
            /*!
             Always have vertex attrib 0 array enabled. If you draw with vertex attrib 0 array disabled, you will force the browser to do complicated emulation when running on desktop OpenGL (e.g. on Mac OSX). This is because in desktop OpenGL, nothing gets drawn if vertex attrib 0 is not array-enabled. You can use bindAttribLocation() to force a vertex attribute to use location 0, and use enableVertexAttribArray() to make it array-enabled.
             */
            gl.bindAttribLocation( this._program, 0, "a_position");


            gl.linkProgram(this._program);

            Log.error(gl.getProgramParameter(this._program, gl.LINK_STATUS) === false, gl.getProgramInfoLog(this._program));




            /*!
             should detach and delete shaders after linking the program

             explain:
             The shader object, due to being attached to the program object, will continue to exist even if you delete the shader object. It will only be deleted by the system when it is no longer attached to any program object (and when the user has asked to delete it, of course).

             "Deleting" the shader, as with all OpenGL objects, merely sets a flag that says you don't need it any more. OpenGL will keep it around for as long as it needs it itself, and will do the actual delete any time later (most likely, but not necessarily, after the program is deleted).
             */
            gl.deleteShader(vs);
            gl.deleteShader(fs);

            return this;
        }

        public dispose(){
            var gl = DeviceManager.getInstance().gl;

            gl.deleteProgram(this._program);
            this._program = null;

            this._vertexAttribHistory.forEach((value:boolean, pos:string) => {
                var position = Number(pos);

                if (position > gl.VERTEX_ATTRIB_ARRAY_ENABLED) {
                    return;
                }

                gl.disableVertexAttribArray(position);
            });

            this._clearCache();
        }

        public isUniformDataNotExistByLocation(pos:any){
            return pos === null;
        }

        private _clearCache(){
            this._getAttribLocationCache.removeAllChildren();
            this._getUniformLocationCache.removeAllChildren();
        }

        private _convertToArray2(data:Array<number>);
        private _convertToArray2(data:Vector2);

        @require(function (data:any) {
            assert(JudgeUtils.isArray(data) || data instanceof Vector2, Log.info.FUNC_MUST_BE("shader->attributes->value", "Array<Array<any>> or Array<Vector2> stucture"));
        })
        private _convertToArray2(data:any) {
            if(JudgeUtils.isArray(data)){
                return data;
            }

            return [data.x, data.y];
        }

        private _convertToArray3(data:Array<number>);
        private _convertToArray3(data:Vector3);

        @require(function (data:any) {
            assert(JudgeUtils.isArray(data) || data instanceof Vector3, Log.info.FUNC_MUST_BE("shader->attributes->value", "Array<Array<any>> or Array<Vector3> stucture"));
        })
        private _convertToArray3(data:any) {
            if(JudgeUtils.isArray(data)){
                return data;
            }

            return [data.x, data.y, data.z];
        }

        private _convertToArray4(data:Array<number>);
        private _convertToArray4(data:Vector4);

        @require(function (data:any) {
            assert(JudgeUtils.isArray(data) || data instanceof Vector4, Log.info.FUNC_MUST_BE("shader->attributes->value", "Array<Array<any>> or Array<Vector4> stucture"));
        })
        private _convertToArray4(data:any) {
            if(JudgeUtils.isArray(data)){
                return data;
            }

            return [data.x, data.y, data.z, data.w];
        }

        @require(function(gl:any, pos:string, data:Array<number>){
            assert(JudgeUtils.isArrayExactly(data), Log.info.FUNC_SHOULD("data", `be array, but actual is ${data}`));

            for(let unit of data){
                assert(JudgeUtils.isNumber(unit), Log.info.FUNC_SHOULD("data", `be Array<number>, but actual is ${data}`));
            }
        })
        private _sendSampleArray(gl:any, pos:string, data:Array<number>){
            gl.uniform1iv(pos, data);
        }
    }
}

