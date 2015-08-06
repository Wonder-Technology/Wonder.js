/// <reference path="../definitions.d.ts"/>
module dy{
    export class Component extends Entity{
        private _gameObject:GameObject = null;
        get gameObject(){
            return this._gameObject;
        }
        set gameObject(gameObject:GameObject){
            this._gameObject = gameObject;
        }

        public get transform():Transform {
            if(!this._gameObject) {
                return null;
            }

            return this._gameObject.transform;
        }

        public init(){
        }
    }
}
