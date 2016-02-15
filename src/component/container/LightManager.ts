module wd {
    export class LightManager {
        public static create() {
            var obj = new this();

            return obj;
        }

        get ambientLight():GameObject {
            return this._lights.getChild(AmbientLight.type);
        }

        get directionLights(): wdCb.Collection<GameObject>{
            return this._lights.getChild(DirectionLight.type);
        }

        get pointLights(): wdCb.Collection<GameObject>{
            return this._lights.getChild(PointLight.type);
        }

        private _lights:wdCb.Hash<any> = wdCb.Hash.create<any>();

        public addChild(light:GameObject){
            if(light.hasComponent(AmbientLight)){
                this._lights.addChild(AmbientLight.type, light);
            }
            else if(light.hasComponent(DirectionLight)){
                this._lights.appendChild(DirectionLight.type, light);
            }
            else if(light.hasComponent(PointLight)){
                this._lights.appendChild(PointLight.type, light);
            }
            else{
                 Log.error(true, Log.info.FUNC_INVALID("light"));
            }
        }

        public addChildren(lightList:wdCb.Collection<GameObject>){
            var self = this;

            lightList.forEach((light:GameObject) => {
                self.addChild(light);
            })
        }
    }
}

