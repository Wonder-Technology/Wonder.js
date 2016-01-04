/// <reference path="../filePath.d.ts"/>
module wd {
    //todo add copy method
    export class GameObject extends EntityObject{
        public static create() {
            var obj = new this();

            return obj;
        }

        public name:string = `gameObject${String(this.uid)}`;
        public transform:ThreeDTransform = ThreeDTransform.create(this);

        protected children:wdCb.Collection<GameObject>;
    }
}

