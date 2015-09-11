/// <reference path="../../definitions.d.ts"/>
module dy {
    export class Stage extends GameObject{
        public static create() {
            var obj = new this();

            return obj;
        }

        public camera:GameObject = null;

        public init(){
            this.addComponent(TopCollider.create());

            super.init();
        }

        public addChild(child:GameObject):GameObject{
            if(this._isCamera(child)){
                this.camera = child;
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
    }
}
