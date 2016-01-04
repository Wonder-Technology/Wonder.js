/// <reference path="../../filePath.d.ts"/>
module wd {
    export class UIObject extends GameObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public name:string = `uiObject${String(this.uid)}`;
        public transform:RectTransform;
        public uiManager:UIManager = UIManager.create(this);

        //protected children:wdCb.Collection<UIObject>;

        protected createTransform(){
            return RectTransform.create(this);
        }

        protected beforeUpdateChildren(elapsedTime:number){
            this.uiManager.update(elapsedTime);
        }

        //todo addChild:child's ui renderer should be the same as parent
    }
}

