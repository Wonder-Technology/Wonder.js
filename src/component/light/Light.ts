/// <reference path="../../definitions.d.ts"/>
module dy {
    export abstract class Light extends Component {
        get position(){
            return this.gameObject.transform.position;
        }

        public color:Color = Color.create("#ffffff");
    }
}

