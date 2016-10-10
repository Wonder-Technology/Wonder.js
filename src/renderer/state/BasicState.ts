module wd{
    export class BasicState extends WebGLState{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        @require(function(material:Material){
            if(material.blendFuncSeparate && material.blendEquationSeparate){
            }
            else{
                assert(!!material.blendSrc && !!material.blendDst && !!material.blendEquation, wdCb.Log.info.FUNC_MUST("material.blendSrc && material.blendDst && material.blendEquation", "be set"));
            }
        })
        public setState(material:Material):void{
            var deviceManager = DeviceManager.getInstance();

            deviceManager.setColorWrite(material.redWrite, material.greenWrite, material.blueWrite, material.alphaWrite);
            deviceManager.polygonOffsetMode = material.polygonOffsetMode;

            deviceManager.side = this.getSide(material);

            deviceManager.blend = material.blend;

            if(material.blendFuncSeparate && material.blendEquationSeparate){
                deviceManager.setBlendFuncSeparate(material.blendFuncSeparate);
                deviceManager.setBlendEquationSeparate(material.blendEquationSeparate);
            }
            else{
                deviceManager.setBlendFunc(material.blendSrc, material.blendDst);
                deviceManager.setBlendEquation(material.blendEquation);
            }

            if(material.alphaToCoverage){
                deviceManager.alphaToCoverage = material.alphaToCoverage;
            }
        }
    }
}

