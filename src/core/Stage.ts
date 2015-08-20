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
            super.init();

            this.program = render.Program.create();

            this.addComponent(TopCollider.create());

            this.forEach((child:GameObject) => {
                child.init();
            });
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

        public onEnter(){
            super.onEnter();

            this.forEach((child:GameObject) => {
                child.onEnter();
            });
        }

        //todo onExit

        public onStartLoop(){
            super.onStartLoop();

            this.forEach((child:GameObject) => {
                child.onStartLoop();
            });
        }

        public onEndLoop(){
            super.onEndLoop();

            this.forEach((child:GameObject) => {
                child.onEndLoop();
            });
        }

        private _isCamera(child:GameObject){
            return child.hasComponent(Camera);
        }
    }
}
