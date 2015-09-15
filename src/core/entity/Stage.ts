/// <reference path="../../definitions.d.ts"/>
module dy {
    export class Stage extends GameObject{
        public static create() {
            var obj = new this();

            return obj;
        }

        public camera:GameObject = null;
        public lights:dyCb.Hash<any> = dyCb.Hash.create<any>();

        public init(){
            this.addComponent(TopCollider.create());

            super.init();
        }

        public addChild(child:GameObject):GameObject{
            if(this._isCamera(child)){
                this.camera = child;
            }
            else if(this._isLight(child)){
                let light:Light = <Light>child.getFirstComponent();

                //limit ambient light to be one?
                if(this._isAmbientLight(light)){
                    this.lights.addChild(light.type, light);
                }
                else{
                    this.lights.appendChild(light.type, light);
                }
            }

            return super.addChild(child);
        }

        public render(renderer:Renderer) {
            dyCb.Log.error(!this.camera, "stage must add camera");

            super.render(renderer, this.camera);
        }

        private _isCamera(child:GameObject){
            return child.hasComponent(Camera);
        }

        private _isLight(child:GameObject){
            return child.hasComponent(Light);
        }

        private _isAmbientLight(light: Light){
            return light instanceof AmbientLight;
        }
    }
}
