module wd{
    export class BuildTwoDShadowMapState extends BuildShadowMapState{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public setState(material:Material):void{
            var deviceManager = DeviceManager.getInstance();

            super.setState(material);

            if(GPUDetector.getInstance().extensionDepthTexture) {
                //not write to color buffer
                deviceManager.setColorWrite(false, false, false, false);
            }
        }
    }
}

