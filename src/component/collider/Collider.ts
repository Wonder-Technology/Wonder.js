/// <reference path="../../definitions.d.ts"/>
module dy {
    export class Collider extends Component {
        public collideXY(localX:number, localY:number):boolean {
            return false;
        }

        public collide(collider:Collider):boolean {
            return false;
        }

        public addToGameObject(gameObject:GameObject){
            dyCb.Log.assert(!gameObject.collider, "renderer is overwrite");

            gameObject.collider = this;
        }

        public removeFromGameObject(gameObject:GameObject){
            gameObject.collider = null;
        }
    }
}

