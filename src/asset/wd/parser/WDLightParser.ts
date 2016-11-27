module wd{
    export class WDLightParser extends WDComponentParser{
        public static create() {
        	var obj = new this();

        	return obj;
        }


        @require(function(json:IWDJsonDataParser,lightId:string){
            it("should exist corresponding light data", () => {
                var lights = json.lights;

                expect(lights).exist;
                expect(lights[lightId]).exist;
            }, this);
        })
        public parse(json:IWDJsonDataParser,lightId:string):IWDLightAssembler{
            var lightData = json.lights[lightId],
                light:IWDLightAssembler = <any>{};

            WDUtils.addData(light, "type", lightData.type);

            this._parseLightDataByType(light, lightData, light.type);

            return light;
        }

        private _parseLightDataByType(light:IWDLightAssembler, lightData:any, type:string){
            var data = lightData[type];

            WDUtils.addData(light, "intensity", data.intensity);

            switch (type){
                case "ambient":
                case "directional":
                    light.color = WDUtils.getColor(data.color);
                    break;
                case "point":
                    light.color = WDUtils.getColor(data.color);
                    WDUtils.addData(light, "range", data.range);
                    WDUtils.addData(light, "constantAttenuation", data.constantAttenuation);
                    WDUtils.addData(light, "linearAttenuation", data.linearAttenuation);
                    WDUtils.addData(light, "quadraticAttenuation", data.quadraticAttenuation);
                    break;
                default:
                    //todo support spot
                    break;
            }
        }
    }
}
