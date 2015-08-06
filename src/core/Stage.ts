/// <reference path="../definitions.d.ts"/>
module dy {
    export class Stage extends GameObject{
        public static create() {
            var obj = new this();

            return obj;
        }

        //todo move it elsewhere?
        public program:render.Program = null;

        private _camera:GameObject = null;

        public init(){
            this.program = render.Program.create();
        }

        public addChild(child:GameObject):GameObject{
            if(this._isCamera(child)){
                this._camera = child;
            }

            return super.addChild(child);
        }

        public render(renderer:render.Renderer) {
            dyCb.Log.error(!this._camera, "stage must add camera");

            super.render(renderer, this._camera);
        }

        public onStartLoop(){
            super.onStartLoop();

            this.getChilren().forEach((child:GameObject) => {
                child.onStartLoop();
            });
        }

        public onEndLoop(){
            super.onEndLoop();

            this.getChilren().forEach((child:GameObject) => {
                child.onEndLoop();
            });
        }

        private _isCamera(child:GameObject){
            return child.hasComponent(Camera);
        }
    }
}
