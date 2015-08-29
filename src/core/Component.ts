/// <reference path="../definitions.d.ts"/>
module dy{
    export class Component extends Entity{
        public gameObject:GameObject = null;

        public get transform():Transform {
            if(!this.gameObject) {
                return null;
            }

            return this.gameObject.transform;
        }

        public init(){
        }

        public dispose(){
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
