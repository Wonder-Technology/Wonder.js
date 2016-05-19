module wd{
    export abstract class BuildShadowMapState extends WebGLState{
        public setState(material:Material):void{
            var deviceManager = DeviceManager.getInstance();

            deviceManager.side = this.getSide(material);
            deviceManager.blend = false;
        }
    }
}

