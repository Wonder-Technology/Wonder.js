/// <reference path="../filePath.d.ts"/>
module wd{
    export abstract class Component extends Entity{
        public entityObject:EntityObject = null;

        @virtual
        public init(){
        }

        @virtual
        public dispose(){
        }

        public get transform():Transform {
            if(!this.entityObject) {
                return null;
            }

            return this.entityObject.transform;
        }

        public addToObject(entityObject:EntityObject){
            if(this.entityObject) {
                this.entityObject.removeComponent(this);
            }
            this.entityObject = entityObject;
        }

        public removeFromObject(entityObject:EntityObject){
            this.entityObject = null;
        }
    }
}
