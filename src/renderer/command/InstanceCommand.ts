module wd{
    export class InstanceCommand extends QuadCommand {
        public static create(){
            var obj = new this();

            return obj;
        }

        public instanceList:wdCb.Collection<GameObject> = null;
        public instanceBuffer:InstanceBuffer = null;
        public glslData:EInstanceGLSLData = EInstanceGLSLData.MODELMATRIX;

        private _instanceDrawerProxy:InstanceDrawerProxy = InstanceDrawerProxy.create();

        protected draw(material:Material) {
            if (!this._hasInstance()) {
                return;
            }

            this.setEffects(material);

            this._instanceDrawerProxy.glslData = this.glslData;

            //this._instanceDrawerProxy.draw(this.instanceList, this.instanceBuffer, this.program, this.buffers, this.drawMode);

            //todo refactor
            var program = null;
            var scene:SceneDispatcher = Director.getInstance().scene;

            if(scene.isUseProgram){
                program = scene.shader.program;
            }
            else{
                program = this.program;
            }


            this._instanceDrawerProxy.draw(this.instanceList, this.instanceBuffer, program, this.buffers, this.drawMode);
        }

        @ensure(function(hasInstance:boolean){
            assert(JudgeUtils.isBoolean(hasInstance), Log.info.FUNC_SHOULD("return boolean value"));

            if(hasInstance){
                assert(GPUDetector.getInstance().extensionInstancedArrays !== null, Log.info.FUNC_SHOULD("hardware", "support instance"));

                assert(!!this.instanceBuffer, Log.info.FUNC_MUST_DEFINE("instanceBuffer"));
            }
        })
        private _hasInstance(){
            return !!this.instanceList && this.instanceList.getCount() > 0;
        }
    }
}
