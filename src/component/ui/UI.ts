/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class UI extends Component{
        public dirty:boolean = true;

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

