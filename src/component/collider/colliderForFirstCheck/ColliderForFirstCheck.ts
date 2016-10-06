module wd {
    export abstract class ColliderForFirstCheck extends Component {
        public entityObject:GameObject;

        public abstract init();
        public abstract update(elapsed:number);

        //todo add to engine?

        public clone(){
            return CloneUtils.clone(this);
        }
    }
}

