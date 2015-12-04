/// <reference path="../../filePath.d.ts"/>
module wd {
    export class Pick extends Component {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public init(){
        }

        public dispose(){
        }

        public isPick(localX:number, localY:number):boolean {
            return true;
        }
    }
}

