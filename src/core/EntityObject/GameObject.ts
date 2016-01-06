module wd {
    export class GameObject extends GameEntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public transform:ThreeDTransform;

        public name:string = `gameObject${String(this.uid)}`;

        protected children:wdCb.Collection<GameObject>;

        protected createTransform(){
            return ThreeDTransform.create();
        }
    }
}

