/// <reference path="../../definitions.d.ts"/>
module dy{
    export abstract class Behavior extends Component{
        public abstract update(time);

        public addToGameObject(gameObject:GameObject){
            super.addToGameObject(gameObject);

            gameObject.behaviors.addChild(this);
        }

        public removeFromGameObject(gameObject:GameObject){
            super.removeFromGameObject(gameObject);

            gameObject.behaviors.removeChild(this);
        }
    }
}
