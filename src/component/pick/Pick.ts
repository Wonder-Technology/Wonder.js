/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class Pick extends Component {
        public init(){
        }

        public dispose(){
        }

        public isPick(localX:number, localY:number):boolean {
            return true;
        }
    }
}

