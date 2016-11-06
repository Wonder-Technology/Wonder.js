module wd{
    export class Program extends Entity{
        public static create():Program {
            var obj = new this();

            return obj;
        }

        public glProgram:any = null;

        private _getAttribLocationCache:wdCb.Hash<number> = wdCb.Hash.create<number>();
        private _sender:GLSLDataSender = GLSLDataSender.create(this);

        public use(){
            if(JudgeUtils.isEqual(this, ProgramTable.lastUsedProgram)){
                return;
            }

            ProgramTable.lastUsedProgram = this;

            DeviceManager.getInstance().gl.useProgram(this.glProgram);

            this._sender.disableVertexAttribArray();

            BufferTable.lastBindedArrayBufferListUidStr = null;
        }

        /*!
         not use @cache,
         here judge return pos of "getChild", so it don't need to invoke "hasChild"
         */
        public getAttribLocation(name:string){
            var pos = null,
                gl = DeviceManager.getInstance().gl;

            pos = this._getAttribLocationCache.getChild(name);

            if(pos !== void 0){
                return pos;
            }

            pos = gl.getAttribLocation(this.glProgram, name);

            this._getAttribLocationCache.addChild(name, pos);

            return pos;
        }

        public getUniformLocation(name:string){
            return this._sender.getUniformLocation(name);
        }

        public sendUniformData(name:string, type:EVariableType, data:any){
            if(data === null){
                return;
            }

            switch (type){
                case EVariableType.FLOAT_1:
                    this._sender.sendFloat1(name, data);
                    break;
                case EVariableType.FLOAT_2:
                    this._sender.sendFloat2(name, data);
                    break;
                case EVariableType.FLOAT_3:
                    this._sender.sendFloat3(name, data);
                    break;
                case EVariableType.FLOAT_4:
                    this._sender.sendFloat4(name, data);
                    break;
                case EVariableType.VECTOR_2:
                    this._sender.sendVector2(name, data);
                    break;
                case EVariableType.VECTOR_3:
                    this._sender.sendVector3(name, data);
                    break;
                case EVariableType.VECTOR_4:
                    this._sender.sendVector4(name, data);
                    break;
                case EVariableType.FLOAT_MAT3:
                    this._sender.sendMatrix3(name, data);
                    break;
                case EVariableType.FLOAT_MAT4:
                    this._sender.sendMatrix4(name, data);
                    break;
                case EVariableType.NUMBER_1:
                case EVariableType.SAMPLER_CUBE:
                case EVariableType.SAMPLER_2D:
                    this._sender.sendNum1(name, data);
                    break;
                case EVariableType.SAMPLER_ARRAY:
                    this._sender.sendSampleArray(name, data);
                    break;
                default :
                    Log.error(true, Log.info.FUNC_INVALID("EVariableType:", type));
                    break;
            }
        }

        @require(function(name:string, type:EVariableType, buffer:ArrayBuffer){
            assert(buffer instanceof ArrayBuffer, Log.info.FUNC_MUST_BE("ArrayBuffer"));

            assert(type === EVariableType.BUFFER, Log.info.FUNC_SHOULD("type", `be EVariableType.BUFFER, but actual is ${type}`));
        })
        public sendAttributeBuffer(name:string, type:EVariableType, buffer:ArrayBuffer){
            var pos:number = null;

            pos = this.getAttribLocation(name);

            if (pos === -1) {
                return;
            }

            this._sender.addBufferToToSendList(pos, buffer);
        }

        public sendStructureData(name:string, type:EVariableType, data:any){
            this.sendUniformData(name, type, data);
        }

        public sendFloat1(name:string, data:any){
            this._sender.sendFloat1(name, data);
        }

        public sendFloat2(name:string, data:any){
            this._sender.sendFloat2(name, data);
        }

        public sendFloat3(name:string, data:any){
            this._sender.sendFloat3(name, data);
        }

        public sendFloat4(name:string, data:any){
            this._sender.sendFloat4(name, data);
        }

        public sendVector2(name:string, data:any){
            this._sender.sendVector2(name, data);
        }

        public sendVector3(name:string, data:any){
            this._sender.sendVector3(name, data);
        }

        public sendVector4(name:string, data:any){
            this._sender.sendVector4(name, data);
        }

        public sendColor3(name:string, data:any){
            this._sender.sendColor3(name, data);
        }

        public sendColor4(name:string, data:any){
            this._sender.sendColor4(name, data);
        }

        public sendNum1(name:string, data:any){
            this._sender.sendNum1(name, data);
        }

        public sendMatrix3(name:string, data:any){
            this._sender.sendMatrix3(name, data);
        }

        public sendMatrix4(name:string, data:any){
            this._sender.sendMatrix4(name, data);
        }

        public sendSampleArray(name:string, data:any){
            this._sender.sendSampleArray(name, data);
        }

        public sendAllBufferData(vaoManager:VAOManager){
            this._sender.sendAllBufferData(vaoManager);
            this._sender.clearBufferList();
        }

        public initWithShader(shader:Shader){
            var gl = DeviceManager.getInstance().gl,
                vs = null,
                fs = null;

            if(this.glProgram){
                this.dispose();
            }

            this.glProgram = DeviceManager.getInstance().gl.createProgram();

            vs = shader.createVsShader();
            fs = shader.createFsShader();

            gl.attachShader(this.glProgram, vs);
            gl.attachShader(this.glProgram, fs);


            /*!
             if warn:"Attribute 0 is disabled. This has significant performance penalty" when run,
             then do this before linkProgram:
             gl.bindAttribLocation( this.glProgram, 0, "a_position");



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
            gl.bindAttribLocation( this.glProgram, 0, "a_position");


            gl.linkProgram(this.glProgram);

            Log.error(gl.getProgramParameter(this.glProgram, gl.LINK_STATUS) === false, gl.getProgramInfoLog(this.glProgram));




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

            gl.deleteProgram(this.glProgram);
            this.glProgram = null;

            this._sender.dispose();

            this._clearAllCache();
        }

        private _clearAllCache(){
            this._getAttribLocationCache.removeAllChildren();
            this._sender.clearAllCache();
        }
    }
}

