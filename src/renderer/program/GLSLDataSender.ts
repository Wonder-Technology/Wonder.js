module wd{
    export class GLSLDataSender{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _uniformTable:wdCb.Hash<any> = wdCb.Hash.create<any>();
        private _vertexAttribHistory:wdCb.Hash<number> = wdCb.Hash.create<number>();

        @cache(function(name:string, pos:number, data:any){
            var recordedData:any = this._uniformTable.getChild(name);

            return recordedData == data;
        }, function(name:string, pos:number, data:any){
        }, function(result:any, name:string, pos:number, data:any){
            this._recordUniformData(name, data);
        })
        public sendFloat1(name:string, pos:number, data:any){
            var gl = DeviceManager.getInstance().gl;

            gl.uniform1f(pos, Number(data));
        }

        @cache(function(name:string, pos:number, data:any){
            var recordedData:any = this._uniformTable.getChild(name);

            if(!recordedData){
                return false;
            }

            if(JudgeUtils.isArray(data)){
                return recordedData[0] === data[0] && recordedData[1] === data[1];
            }

            return (<Vector2>recordedData).isEqual(<Vector2>data);
        }, function(name:string, pos:number, data:any){
        }, function(result:any, name:string, pos:number, data:any){
            this._recordUniformData(name, data);
        })
        public sendFloat2(name:string, pos:number, data:any){
            var gl = DeviceManager.getInstance().gl;

            data = this._convertToArray2(data);

            gl.uniform2f(pos, data[0], data[1]);
        }

        @cache(function(name:string, pos:number, data:any){
            var recordedData:any = this._uniformTable.getChild(name);

            if(!recordedData){
                return false;
            }

            if(JudgeUtils.isArray(data)){
                return recordedData[0] === data[0] && recordedData[1] === data[1] && recordedData[2] === data[2];
            }

            return (<Vector3>recordedData).isEqual(<Vector3>data);
        }, function(name:string, pos:number, data:any){
        }, function(result:any, name:string, pos:number, data:any){
            this._recordUniformData(name, data);
        })
        public sendFloat3(name:string, pos:number, data:any){
            var gl = DeviceManager.getInstance().gl;

            data = this._convertToArray3(data);

            gl.uniform3f(pos, data[0], data[1], data[2]);
        }


        @cache(function(name:string, pos:number, data:any){
            var recordedData:any = this._uniformTable.getChild(name);

            if(!recordedData){
                return false;
            }

            if(JudgeUtils.isArray(data)){
                return recordedData[0] === data[0] && recordedData[1] === data[1] && recordedData[2] === data[2] && recordedData[3] === data[3];
            }

            return (<Vector4>recordedData).isEqual(<Vector4>data);
        }, function(name:string, pos:number, data:any){
        }, function(result:any, name:string, pos:number, data:any){
            this._recordUniformData(name, data);
        })
        public sendFloat4(name:string, pos:number, data:any){
            var gl = DeviceManager.getInstance().gl;

            data = this._convertToArray4(data);

            gl.uniform4f(pos, data[0], data[1], data[2], data[3]);
        }

        @cache(function(name:string, pos:number, data:any){
            var recordedData:any = this._uniformTable.getChild(name);

            return recordedData == data;
        }, function(name:string, pos:number, data:any){
        }, function(result:any, name:string, pos:number, data:any){
            this._recordUniformData(name, data);
        })
        public sendNum1(name:string, pos:number, data:any){
            var gl = DeviceManager.getInstance().gl;

            gl.uniform1i(pos, Number(data));
        }

        public sendMatrix3(name:string, pos:number, data:Matrix3){
            var gl = DeviceManager.getInstance().gl;

            gl.uniformMatrix3fv(pos,false, data.values);
        }

        public sendMatrix4(name:string, pos:number, data:Matrix4){
            var gl = DeviceManager.getInstance().gl;

            gl.uniformMatrix4fv(pos,false, data.values);
        }

        @require(function(name:string, pos:number, data:Array<number>){
            assert(JudgeUtils.isArrayExactly(data), Log.info.FUNC_SHOULD("data", `be array, but actual is ${data}`));

            for(let unit of data){
                assert(JudgeUtils.isNumber(unit), Log.info.FUNC_SHOULD("data", `be Array<number>, but actual is ${data}`));
            }
        })
        @cache(function(name:string, pos:number, data:Array<number>){
            var recordedData:any = this._uniformTable.getChild(name),
                isEqual:boolean = true;

            if(!recordedData){
                return false;
            }

            for(let i = 0, len = data.length; i < len; i++){
                if(recordedData[i] !== data[i]){
                    isEqual = false;
                    break;
                }
            }

            return isEqual;
        }, function(name:string, pos:number, data:Array<number>){
        }, function(result:any, name:string, pos:number, data:Array<number>){
            this._recordUniformData(name, data);
        })
        public sendSampleArray(name:string, pos:number, data:Array<number>){
            var gl = DeviceManager.getInstance().gl;

            gl.uniform1iv(pos, data);
        }

        public addBufferToToSendList(pos:number, buffer:ArrayBuffer){
            this._toSendBufferList.addChild({
                pos:pos,
                buffer:buffer
            });
        }

        @require(function(){
            assert(!this._toSendBufferList.map((data:ToSendBufferData) => {
                    return data.buffer;
                })
                .hasRepeatItems(), Log.info.FUNC_SHOULD_NOT("_toSendBufferList", "has repeat buffer"));
        })
        @cache(function(){
            var result = true,
                toSendBufferList = this._toSendBufferList;

            if(!BufferTable.lastBindedArrayBufferList){
                return false;
            }

            //todo optimize?

            BufferTable.lastBindedArrayBufferList.forEach((lastBindedArrayBufferData:ToSendBufferData, index:number) => {
                var bufferData:ToSendBufferData = toSendBufferList.getChild(index);

                if(!bufferData || !JudgeUtils.isEqual(lastBindedArrayBufferData.buffer, bufferData.buffer)){
                    result = false;
                    return wdCb.$BREAK;
                }
            });

            return result;
        }, function(){
        }, function(result:any){
            BufferTable.lastBindedArrayBufferList = this._toSendBufferList.clone(false);
        })
        public sendAllBufferData(){
            this._toSendBufferList.forEach((data:ToSendBufferData) => {
                this.sendBuffer(data.pos, data.buffer);
            }, this);
        }

        public clearBufferList(){
            this._toSendBufferList.removeAllChildren();
        }

        private _toSendBufferList:wdCb.Collection<ToSendBufferData> = wdCb.Collection.create<ToSendBufferData>();









        //todo pass test
        public sendBuffer(pos:number, buffer:ArrayBuffer){
            var gl = DeviceManager.getInstance().gl;

            this._vertexAttribHistory.addChild(String(pos), true);

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
            gl.vertexAttribPointer(pos, buffer.size, gl[buffer.type], false, 0, 0);
            gl.enableVertexAttribArray(pos);
        }

        public clearAllCache(){
            this._uniformTable.removeAllChildren();
        }

        public dispose(){
            var gl = DeviceManager.getInstance().gl;

            this._vertexAttribHistory.forEach((value:boolean, pos:string) => {
                var position = Number(pos);

                if (position > gl.VERTEX_ATTRIB_ARRAY_ENABLED) {
                    return;
                }

                gl.disableVertexAttribArray(position);
            });
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

        private _recordUniformData(name:string, data:any){
            this._uniformTable.addChild(name, data);
        }
    }

    export type ToSendBufferData = {
        pos:number;
        buffer:ArrayBuffer;
    }
}
