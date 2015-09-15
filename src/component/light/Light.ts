/// <reference path="../../definitions.d.ts"/>
module dy {
    export abstract class Light extends Component {
        public color:Color = Color.create("#ffffff");
        //abstract attribute
        public type:string = null;


        public init() {
            //todo implement
        }

        public dispose(){
            //todo implement
        }
    }
}

