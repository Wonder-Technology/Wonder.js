/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class Collider extends Component {
        public abstract getCollideObjects(checkTargetList:wdCb.Collection<GameObject>):wdCb.Collection<GameObject>;

        public abstract update(time:number);
    }
}

