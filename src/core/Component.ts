/// <reference path="../filePath.d.ts"/>
module wd{
    export abstract class Component extends Entity{
        //todo change to EntityObject
        public gameObject:EntityObject = null;

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

        public addToObject(gameObject:EntityObject){
            if(this.gameObject) {
                this.gameObject.removeComponent(this);
            }
            this.gameObject = gameObject;
        }

        public removeFromObject(gameObject:EntityObject){
            this.gameObject = null;
        }
    }
}
