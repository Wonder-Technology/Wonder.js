module wd{
    export class WDLightAssembler extends WDComponentAssembler{
        public static create() {
            var obj = new this();

            return obj;
        }

        public createComponent(component:IWDLightAssembler){
            var light = null;

            switch (component.type){
                case "ambient":
                    light = AmbientLight.create();

                    light.color = (<IWDAmbientLightAssembler>component).color;
                    break;
                case "directional":
                    light = DirectionLight.create();

                    light.color = (<IWDDirectionLightAssembler>component).color;
                    break;
                case "point":
                    light = PointLight.create();

                    light.color = (<IWDPointLightAssembler>component).color;

                    WDUtils.addData(light, "constant", (<IWDPointLightAssembler>component).constantAttenuation);
                    WDUtils.addData(light, "linear", (<IWDPointLightAssembler>component).linearAttenuation);
                    WDUtils.addData(light, "quadratic", (<IWDPointLightAssembler>component).quadraticAttenuation);
                    WDUtils.addData(light, "range", (<IWDPointLightAssembler>component).range);
                    break;
                default:
                    //todo support spot
                    break;
            }

            WDUtils.addData(light, "intensity", component.intensity);

            return light;
        }
    }
}

