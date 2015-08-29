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
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public removeFromGameObject(gameObject:GameObject){
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
    }
}
