/// <reference path="../definitions.d.ts"/>
module dy{
    export abstract class Component extends Entity{
        public gameObject:GameObject = null;

        public init(){}
        public dispose(){}

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
