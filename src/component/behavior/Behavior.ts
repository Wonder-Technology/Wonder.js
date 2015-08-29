/// <reference path="../../definitions.d.ts"/>
module dy{
    export class Behavior extends Component{
        public update(time){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public addToGameObject(gameObject:GameObject){
            gameObject.behaviors.addChild(this);
        }

        public removeFromGameObject(gameObject:GameObject){
            gameObject.behaviors.removeChild(this);
        }
    }
}
