module wd{
    export class UIObjectEventTriggerUtils extends EventTriggerUtils{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        protected getTopObject(triggerList:wdCb.Collection<UIObject>){
            return triggerList.sort((a:UIObject, b:UIObject) => {
                    return b.transform.zIndex - a.transform.zIndex;
                })
                .getChild(0);
        }
    }
}

