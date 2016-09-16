module wd{
    export class OneToOneHardwareInstanceCommand extends HardwareInstanceCommand {
         public static create(){
            var obj = new this();

            return obj;
        }

        public instanceList:wdCb.Collection<GameObject> = null;

        protected draw(material:Material) {
            var drawer:OneToOneHardwareInstanceDrawer = null;

            if (!this._hasInstance()) {
                return;
            }

            this.webglState.setState(material);

            switch (this.glslData){
                case EInstanceGLSLData.MODELMATRIX:
                    drawer = ModelMatrixHardwareInstanceDrawer.getInstance();
                    break;
                case EInstanceGLSLData.NORMALMATRIX_MODELMATRIX:
                    drawer = NormalMatrixModelMatrixHardwareInstanceDrawer.getInstance();
                    break;
                default:
                    Log.error(true, Log.info.FUNC_INVALID(`glslData:${this.glslData}`));
                    break;
            }

            drawer.draw(this.instanceList, this.instanceBuffer, this.program, this.buffers, this.drawMode);
        }

        @ensure(function(hasInstance:boolean){
            assert(JudgeUtils.isBoolean(hasInstance), Log.info.FUNC_SHOULD("return boolean value"));

            if(hasInstance){
                assert(InstanceUtils.isHardwareSupport(), Log.info.FUNC_SHOULD("hardware", "support instance"));

                assert(!!this.instanceBuffer, Log.info.FUNC_MUST_DEFINE("instanceBuffer"));
            }
        })
        private _hasInstance(){
            return !!this.instanceList && this.instanceList.getCount() > 0;
        }
    }
}

