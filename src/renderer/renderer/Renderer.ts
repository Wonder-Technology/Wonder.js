module wd{
    export abstract class Renderer{
        private _effect:Effect = null;
        get effect(){
            return this._effect ? this._effect : BasicEffect.create();
        }
        set effect(effect:Effect){
            this._effect = effect;
        }

        public skyboxCommand:QuadCommand = null;

        public abstract addCommand(command:RenderCommand):void;
        public abstract hasCommand():boolean;
        public abstract render():void;
        public abstract clear():void;

        @virtual
        public init(){
        }
    }
}

