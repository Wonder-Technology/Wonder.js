module wd{
    export class GLSLDataSender{
        public static create(program:Program) {
            var obj = new this(program);

            return obj;
        }

        constructor(program:Program){
            this._program = program;
        }

        private _program:Program = null;
        private _uniformCache:Object = {};
        private _vertexAttribHistory:Array<boolean> = [];
        private _getUniformLocationCache:Object = {};
        private _toSendBufferArr:Array<ArrayBuffer> = [];

        public sendFloat1(name:string, data:any){
            var gl = null,
                pos = null;

            if(this._uniformCache[name] == data){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform1f(pos, Number(data));
        }

        public sendFloat2(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData[0] === data[0] && recordedData[1] === data[1]){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform2f(pos, data[0], data[1]);
        }

        public sendFloat3(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData[0] === data[0] && recordedData[1] === data[1] && recordedData[2] === data[2]){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform3f(pos, data[0], data[1], data[2]);
        }

        public sendFloat4(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData[0] === data[0] && recordedData[1] === data[1] && recordedData[2] === data[2] && recordedData[3] === data[3]){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform4f(pos, data[0], data[1], data[2], data[3]);
        }

        public sendVector2(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData[0] == data.x && recordedData[1] == data.y){
                return;
            }

            let x = data.x,
                y = data.y;

            this._recordUniformData(name, [x, y]);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform2f(pos, x, y);
        }

        public sendVector3(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData[0] == data.x && recordedData[1] == data.y && recordedData[2] == data.z){
                return;
            }

            let x = data.x,
                y = data.y,
                z = data.z;

            this._recordUniformData(name, [x, y, z]);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform3f(pos, x, y, z);
        }

        public sendVector4(name:string, data:any){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name];

            if(recordedData && recordedData[0] == data.x && recordedData[1] == data.y && recordedData[2] == data.z && recordedData[3] == data.w){
                return;
            }

            let x = data.x,
                y = data.y,
                z = data.z,
                w = data.w;

            this._recordUniformData(name, [x, y, z, w]);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform4f(pos, x, y, z, w);
        }

        public sendColor4(name:string, data:Color){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name],
                convertedData = null;

            if(recordedData && recordedData[0] == data.r && recordedData[1] == data.g && recordedData[2] == data.b && recordedData[3] == data.a){
                return;
            }

            let r = data.r,
                g = data.g,
                b = data.b,
                a = data.a;

            this._recordUniformData(name, [r, g, b, a]);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform4f(pos, r, g, b, a);
        }

        @require(function(name:string, data:number){
            assert(JudgeUtils.isNumber(data), Log.info.FUNC_MUST_BE("data", "be number"));
        })
        public sendNum1(name:string, data:number){
            var gl = null,
                pos = null;

            if(this._uniformCache[name] === data){
                return;
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform1i(pos, data);
        }

        public sendMatrix3(name:string, data:Matrix3){
            var gl = DeviceManager.getInstance().gl,
                pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniformMatrix3fv(pos,false, data.values);
        }

        public sendMatrix4(name:string, data:Matrix4){
            var gl = DeviceManager.getInstance().gl,
                pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniformMatrix4fv(pos,false, data.values);
        }

        @require(function(name:string, data:Array<number>){
            assert(JudgeUtils.isArrayExactly(data), Log.info.FUNC_SHOULD("data", `be array, but actual is ${data}`));

            for(let unit of data){
                assert(JudgeUtils.isNumber(unit), Log.info.FUNC_SHOULD("data", `be Array<number>, but actual is ${data}`));
            }
        })
        public sendSampleArray(name:string, data:Array<number>){
            var gl = null,
                pos = null,
                recordedData:any = this._uniformCache[name],
                isEqual:boolean = true;

            if(recordedData){
                for(let i = 0, len = data.length; i < len; i++){
                    if(recordedData[i] !== data[i]){
                        isEqual = false;
                        break;
                    }
                }

                if(isEqual){
                    return;
                }
            }

            this._recordUniformData(name, data);

            gl = DeviceManager.getInstance().gl;
            pos = this.getUniformLocation(name);

            if(this._isUniformDataNotExistByLocation(pos)){
                return;
            }

            gl.uniform1iv(pos, data);
        }

        /*!
         not use @cache,
         here judge return pos of "getChild", so it don't need to invoke "hasChild"
         */
        public getUniformLocation(name:string){
            var pos = null,
                gl = DeviceManager.getInstance().gl;

            pos = this._getUniformLocationCache[name];

            if(pos !== void 0){
                return pos;
            }

            pos = gl.getUniformLocation(this._program.glProgram, name);

            this._getUniformLocationCache[name] = pos;

            return pos;
        }

        public addBufferToToSendList(pos:number, buffer:ArrayBuffer){
            this._toSendBufferArr[pos] = buffer;
        }

        //todo finish
        //@require(function(){
        //    assert(!ArrayUtils.hasRepeatItems(this._toSendBufferArr), Log.info.FUNC_SHOULD_NOT("_toSendBufferArr", "has repeat buffer"));
        //})
        //@cache(function(){
        //    var toSendBufferArr = this._toSendBufferArr,
        //        lastBindedArrayBufferArr = BufferTable.lastBindedArrayBufferArr;
        //
        //    if(!lastBindedArrayBufferArr){
        //        return false;
        //    }
        //
        //    for(let i = 0, len = toSendBufferArr.length; i < len; i++){
        //        let buffer = toSendBufferArr[i];
        //        if(buffer && buffer !== lastBindedArrayBufferArr[i]){
        //            return false;
        //        }
        //    }
        //
        //    return true;
        //}, function(){
        //}, function(){
        //    BufferTable.lastBindedArrayBufferArr = this._toSendBufferArr;
        //})
        public sendAllBufferData(vaoManager:VAOManager){
            var toSendBufferArr = this._toSendBufferArr;

            //todo refactor:move to VAOManager?

            if(vaoManager){
                var extensionVAO:any = GPUDetector.getInstance().extensionVAO;

                if(extensionVAO){
                    let vao = vaoManager.getVAO();

                    extensionVAO.bindVertexArrayOES(vao);

                    //if(!vaoManager.isSetted || vaoManager.dirty){
                    if(vaoManager.dirty){
                        //let vao = extensionVAO.createVertexArrayOES();
                        //let vao = vaoManager.getVAO();
                        //
                        //extensionVAO.bindVertexArrayOES(vao);


                        for(let pos = 0, len = toSendBufferArr.length; pos < len; pos++){
                            let buffer = toSendBufferArr[pos];

                            if(buffer){

                                var gl = DeviceManager.getInstance().gl;

                                gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
                                gl.vertexAttribPointer(pos, buffer.size, gl[buffer.type], false, 0, 0);

                                gl.enableVertexAttribArray(pos);
                            }
                        }


                        vaoManager.dirty = false;
                    }


                    //extensionVAO.bindVertexArrayOES(null);

                    return;
                }
            }


            //var extensionVAO:any = GPUDetector.getInstance().extensionVAO;
            //if(extensionVAO){
            //    if(!this._isSetVAO){
            //
            //    }
            //}

            for(let pos = 0, len = toSendBufferArr.length; pos < len; pos++){
                let buffer = toSendBufferArr[pos];

                if(buffer){
                    this.sendBuffer(pos, buffer);
                }
            }
        }


        //private _isSetVAO:boolean = false;



        //todo modify with vao?
        public clearBufferList(){
            this._toSendBufferArr = [];
        }

        public sendBuffer(pos:number, buffer:ArrayBuffer){
            var gl = DeviceManager.getInstance().gl;

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
            gl.vertexAttribPointer(pos, buffer.size, gl[buffer.type], false, 0, 0);

            if(this._vertexAttribHistory[pos] !== true){
                gl.enableVertexAttribArray(pos);

                this._vertexAttribHistory[pos] = true;
            }
        }

        public disableVertexAttribArray(){
            var gl = DeviceManager.getInstance().gl;

            for(let i in this._vertexAttribHistory){
                //make sure this is a number)
                let iAsNumber = +i;

                if (iAsNumber > gl.VERTEX_ATTRIB_ARRAY_ENABLED || !this._vertexAttribHistory[iAsNumber]) {
                    continue;
                }
                this._vertexAttribHistory[iAsNumber] = false;
                gl.disableVertexAttribArray(iAsNumber);
            }

            this._vertexAttribHistory = [];
        }

        public clearAllCache(){
            this._getUniformLocationCache = {};

            this._uniformCache = {};
        }

        public dispose(){
            this.disableVertexAttribArray();
        }

        private _recordUniformData(name:string, data:any){
            this._uniformCache[name] = data;
        }

        private _isUniformDataNotExistByLocation(pos:number){
            return pos === null;
        }
    }

    export type ToSendBufferData = {
        pos:number;
        buffer:ArrayBuffer;
    }
}

