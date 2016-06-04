module wd{
    export class VAOManager{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        //todo optimize: dispose not-used vao

        //todo if buffer or shader lib(may cause sended buffers change) change, set dirty
        //public dirty:boolean = true;

        private _vaoMap:wdCb.Hash<any> = wdCb.Hash.create<any>();
        private _extension:any = null;

        @require(function(){
            assert(!!GPUDetector.getInstance().extensionVAO, Log.info.FUNC_SHOULD("hardware", "support vao extension"));
        })
        public init(){
            //todo

            this._extension = GPUDetector.getInstance().extensionVAO;
        }

        public getVAOData(toSendBuffersUidStr:string){
            //todo if dirty, create new vao?

            var isSetted:boolean = false;
            var vao = this._vaoMap.getChild(toSendBuffersUidStr);

            if(!vao){
                vao = this._extension.createVertexArrayOES();

                this._vaoMap.addChild(toSendBuffersUidStr, vao);

                isSetted = false;
            }
            else{
                isSetted = true;
            }

            this._lastVAO = vao;

            return {
                vao:vao,
                isSetted:isSetted
            }
        }

        public _lastVAO = null;
    }
}
