/// <reference path="../../definitions.d.ts"/>
module dy {
    export class Collider extends Component {
        collideXY(localX:number, localY:number):boolean {
            return false;
        }

        collide(collider:Collider):boolean {
            return false;
        }
    }
}

