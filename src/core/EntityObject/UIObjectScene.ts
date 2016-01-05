/// <reference path="../../filePath.d.ts"/>
module wd {
    export class UIObjectScene extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        protected createTransform(){
            return null;
        }
    }
}

