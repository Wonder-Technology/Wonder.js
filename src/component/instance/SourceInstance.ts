module wd{
    export class SourceInstance extends Instance{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _instanceBuffer:InstanceBuffer = null;
        get instanceBuffer(){
            if(this._instanceBuffer === null){
                this._instanceBuffer = InstanceBuffer.create();
            }

            return this._instanceBuffer;
        }

        public entityObject:GameObject;
    }
}
