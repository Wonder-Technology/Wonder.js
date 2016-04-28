module wd{
    export interface IInstanceDrawer{
        draw(instanceList:wdCb.Collection<GameObject>, instanceBuffer:InstanceBuffer, program:Program, buffers:BufferContainer, drawMode:EDrawMode):void;
    }
}
