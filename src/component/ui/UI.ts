/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class UI extends Component{
        protected p_dirty:boolean = true;
        @virtual
        get dirty(){
            return this.p_dirty;
        }
        set dirty(dirty:boolean){
            this.p_dirty = dirty;
        }

        public abstract update(elapsedTime:number);
        public abstract init();

        public addToGameObject(gameObject:GameObject){
            super.addToGameObject(gameObject);

            gameObject.uiManager.addChild(this);
        }

        public removeFromGameObject(gameObject:GameObject){
            super.removeFromGameObject(gameObject);

            gameObject.uiManager.removeChild(this);
        }
    }
}

