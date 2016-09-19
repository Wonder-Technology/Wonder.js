module wd{
    export abstract class HardwareInstanceDrawer extends InstanceDrawer{
        protected abstract getOffsetLocationArray(...args):Array<number>;
        protected abstract setCapacity(...args):void;
        protected abstract sendGLSLData(...args):void;

        protected unBind(instanceBuffer:InstanceBuffer, offsetLocationArr: Array<number>): void {
            var gl = DeviceManager.getInstance().gl;
            var extension = GPUDetector.getInstance().extensionInstancedArrays;

            gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer.buffer);

            for(let offsetLocation of offsetLocationArr){
                gl.disableVertexAttribArray(offsetLocation);
                extension.vertexAttribDivisorANGLE(offsetLocation, 0);
            }
        }

        protected drawElementsInstancedANGLE(indexBuffer:ElementBuffer, instancesCount:number, drawMode:EDrawMode){
            var startOffset:number = 0,
                gl = DeviceManager.getInstance().gl;

            BufferTable.bindIndexBuffer(indexBuffer);

            GlUtils.drawElementsInstancedANGLE(gl[drawMode], indexBuffer.count, gl[indexBuffer.type], indexBuffer.typeSize * startOffset, instancesCount);
        }
    }
}
