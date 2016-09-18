module wd{
    export abstract class SourceInstance extends Instance{
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
