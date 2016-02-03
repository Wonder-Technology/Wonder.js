module wd{
    export class GLTFAssembler{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _result:wdCb.Hash<IGLTFResult> = wdCb.Hash.create<IGLTFResult>();

        //todo geometry add drawMode

        public build(parseData:IGLTFParseData){
            return this._result;
        }
    }
}
