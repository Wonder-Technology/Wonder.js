module wd{
    export class BuildShadowMapEffect extends Effect{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public setEffect(material:Material):void{
            var deviceManager = DeviceManager.getInstance();

            deviceManager.side = this.getSide(material);

            deviceManager.blend = false;
        }
    }
}

