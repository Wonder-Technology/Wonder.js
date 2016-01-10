module wd{
    export class UIEventTriggerUtils{
        public static getTopUIObject(triggerList:wdCb.Collection<UIObject>){
            return triggerList.sort((a:UIObject, b:UIObject) => {
                    return a.transform.zIndex - b.transform.zIndex;
                })
                .getChild(0);
        }
    }
}

