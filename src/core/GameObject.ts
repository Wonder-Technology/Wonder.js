/// <reference path="../filePath.d.ts"/>
module wd {
    //todo add copy method
    export class GameObject extends EntityObject{
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

