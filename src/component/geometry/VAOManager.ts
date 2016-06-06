module wd{
    export class VAOManager{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _vaoMap:wdCb.Hash<any> = wdCb.Hash.create<any>();
        private _extension:any = null;

        @require(function(){
            assert(!!GPUDetector.getInstance().extensionVAO, Log.info.FUNC_SHOULD("hardware", "support vao extension"));
        })
        public init(){
            this._extension = GPUDetector.getInstance().extensionVAO;
        }

        public dispose(){
            //todo dispose vao?

            this._vaoMap.removeAllChildren();
        }

        public getVAOData(toSendBuffersUidStr:string){
            var isSetted:boolean = false,
                vao = this._vaoMap.getChild(toSendBuffersUidStr);

            if(!vao){
                vao = this._extension.createVertexArrayOES();

                this._vaoMap.addChild(toSendBuffersUidStr, vao);

                isSetted = false;
            }
            else{
                isSetted = true;
            }

            return {
                vao:vao,
                isSetted:isSetted
            }
        }

        public sendAllBufferData(toSendBuffersUidStr:string, toSendBufferArr:Array<ArrayBuffer>){
            var {vao, isSetted} = this.getVAOData(toSendBuffersUidStr);

            BufferTable.lastBindedElementBuffer = null;

            this._extension.bindVertexArrayOES(vao);

            if(isSetted){
                return;
            }

            for(let pos = 0, len = toSendBufferArr.length; pos < len; pos++){
                let buffer = toSendBufferArr[pos];

                if(!buffer){}

                if(buffer){
                    var gl = DeviceManager.getInstance().gl;

                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
                    gl.vertexAttribPointer(pos, buffer.size, gl[buffer.type], false, 0, 0);

                    gl.enableVertexAttribArray(pos);
                }
            }
        }
    }
}
