module wd {
    export class OneToOneBatchInstanceCommand extends BatchInstanceCommand {
        public static create() {
            var obj = new this();

            return obj;
        }

        public instanceList:wdCb.Collection<GameObject> = null;

        protected draw(material:Material) {
            var drawer:OneToOneBatchInstanceDrawer = null;

            if (!this._hasInstance()) {
                return;
            }

            this.webglState.setState(material);

            switch (this.glslData){
                case EInstanceGLSLData.MODELMATRIX:
                    drawer = ModelMatrixBatchInstanceDrawer.getInstance();
                    break;
                case EInstanceGLSLData.NORMALMATRIX_MODELMATRIX:
                    drawer = NormalMatrixModelMatrixBatchInstanceDrawer.getInstance();
                    break;
                default:
                    Log.error(true, Log.info.FUNC_INVALID(`glslData:${this.glslData}`));
                    break;
            }

            drawer.draw(this.instanceList, this.program, this.buffers, this.drawMode);
        }

        @ensure(function(hasInstance:boolean){
            assert(JudgeUtils.isBoolean(hasInstance), Log.info.FUNC_SHOULD("return boolean value"));

            if(hasInstance){
                assert(!InstanceUtils.isHardwareSupport(), Log.info.FUNC_SHOULD_NOT("hardware", "support instance"));
            }
        })
        private _hasInstance(){
            return !!this.instanceList && this.instanceList.getCount() > 0;
        }

    }
}

