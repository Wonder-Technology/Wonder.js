module wd{
    export class BuildShadowMapState extends WebGLState{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public setState(material:Material):void{
            var deviceManager = DeviceManager.getInstance();

            deviceManager.side = this.getSide(material);
            deviceManager.blend = false;
        }
    }
}

