module wd{
    export class ObjectInstance extends Instance{
        public static create() {
            var obj = new this();

            return obj;
        }

        get toRenderInstanceListForDraw(){
            return this.sourceObject.getComponent<SourceInstance>(SourceInstance).toRenderInstanceListForDraw;
        }

        get instanceBuffer(){
            return this.sourceObject.getComponent<SourceInstance>(SourceInstance).instanceBuffer;
        }

        public sourceObject:GameObject = null;

        public hasInstance(){
            return false;
        }

        public hasInstanceAndHardwareSupport(){
            return false;
        }

        //todo remove?
        public hasToRenderInstance(){
            return false;
        }

        public isInstance(){
            return this.sourceObject !== null;
        }

        public isInstanceAndHardwareSupport(){
            return GPUDetector.getInstance().extensionInstancedArrays !== null && this.sourceObject !== null;
        }
    }
}

