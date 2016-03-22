module wd{
    export class InstanceDrawerProxy implements IInstanceDrawer{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public glslData:EInstanceGLSLData = null;

        public draw(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer, program:Program, buffers:BufferContainer, drawMode:EDrawMode):void{
            var drawer:InstanceDrawer = null;

            switch (this.glslData){
                case EInstanceGLSLData.MODELMATRIX:
                    drawer = ModelMatrixInstanceDrawer.create();
                    break;
                case EInstanceGLSLData.NORMALMATRIX_MODELMATRIX:
                    drawer = NormalMatrixModelMatrixInstanceDrawer.create();
                    break;
            }

            drawer.draw(instanceList, instanceBuffer, program, buffers, drawMode);
        }
    }
}
