module wd{
    export class UIRendererUtils{
        public static getUIRenderer(uiObject:UIObject){
            if(!uiObject){
                return null;
            }

            return uiObject.getComponent<UIRenderer>(UIRenderer);
        }
    }
}

