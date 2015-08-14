/// <reference path="../../definitions.d.ts"/>
module dy{
    export class Behavior extends Component{
        public update(time){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
    }
}
