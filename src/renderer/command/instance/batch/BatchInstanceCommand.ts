module wd {
    export class BatchInstanceCommand extends InstanceCommand {
        public static create() {
            var obj = new this();

            return obj;
        }

        public instanceList:wdCb.Collection<GameObject> = null;
        public glslData:EInstanceGLSLData = EInstanceGLSLData.MODELMATRIX;
        public geometry:InstanceGeometry = null;

        protected draw(material:Material) {
            var drawer:BatchInstanceDrawer = null;

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
                //todo rename CUSTOM to ?
                case EInstanceGLSLData.CUSTOM:
                    drawer = CustomBatchInstanceDrawer.getInstance();

                    //todo refactor?
                    drawer.geometry = this.geometry;
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

