module wd{
    export class VAOManager{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        //todo if buffer or shader lib(may cause sended buffers change) change, set dirty
        public dirty:boolean = true;

        private _vao:any = null;
        private _extension:any = null;

        @require(function(){
            assert(!!GPUDetector.getInstance().extensionVAO, Log.info.FUNC_SHOULD("hardware", "support vao extension"));
        })
        public init(){
            //todo

            this._extension = GPUDetector.getInstance().extensionVAO;
        }

        public getVAO(){
            //todo if dirty, create new vao?


            if(!this._vao){
                this._vao = this._extension.createVertexArrayOES();
            }

            return this._vao;
        }
    }
}
