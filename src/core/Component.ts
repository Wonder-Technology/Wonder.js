/// <reference path="../filePath.d.ts"/>
module wd{
    export abstract class Component extends Entity{
        public gameObject:GameObject = null;

        @virtual
        public init(){
        }

        @virtual
        public dispose(){
        }

        public get transform():Transform {
            if(!this.gameObject) {
                return null;
            }

            return this.gameObject.transform;
        }

        public addToGameObject(gameObject:GameObject){
            if(this.gameObject) {
                this.gameObject.removeComponent(this);
            }
            this.gameObject = gameObject;
        }

        public removeFromGameObject(gameObject:GameObject){
            this.gameObject = null;
        }
    }
}
