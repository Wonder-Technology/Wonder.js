module wd{
    export class CustomEventListenerMap extends EventListenerMap{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected globalListenerMap: wdCb.Hash<wdCb.Collection<CustomEventRegisterData>> = wdCb.Hash.create<wdCb.Collection<CustomEventRegisterData>>();
        protected targetListenerMap: wdCb.Hash<wdCb.Hash<wdCb.Collection<CustomEventRegisterData>>> = wdCb.Hash.create<wdCb.Hash<wdCb.Collection<CustomEventRegisterData>>>();

        public hasChild(target:EntityObject){
            return this.targetListenerMap.hasChild(this.buildFirstLevelKey(target));
        }

        public appendChild(eventName:EEventName, data:any);
        public appendChild(target:EntityObject, eventName:EEventName, data:any);

        public appendChild(...args){
            if(args.length === 2){
                let eventName:EEventName = args[0],
                    data:any = args[1];

                this.globalListenerMap.appendChild(<any>eventName, data);
            }
            else{
                let target:EntityObject = args[0],
                    eventName:EEventName = args[1],
                    data:any = args[2],
                    firstLevelKey = this.buildFirstLevelKey(target);

                if(!this.targetListenerMap.hasChild(firstLevelKey)){
                    let secondMap = wdCb.Hash.create<wdCb.Collection<EventRegisterData>>();

                    secondMap.addChild(this.buildSecondLevelKey(eventName), wdCb.Collection.create<EventRegisterData>([data]));

                    this.targetListenerMap.addChild(firstLevelKey, secondMap);

                    return;
                }

                this.targetListenerMap.getChild(firstLevelKey).appendChild(this.buildSecondLevelKey(eventName), data);
            }
        }

        public forEachAll(func:(list:wdCb.Collection<CustomEventRegisterData>, eventName:EEventName) => void){
            this.globalListenerMap.forEach(func);

            this.targetListenerMap.forEach((secondMap:wdCb.Hash<wdCb.Collection<CustomEventRegisterData>>) => {
                secondMap.forEach(func);
            });
        }

        public forEachEventName(func:(list:wdCb.Collection<CustomEventRegisterData>, eventName:EEventName) => void){
            this.globalListenerMap.forEach(func);
        }

        public clear(){
            this.globalListenerMap.removeAllChildren();
            this.targetListenerMap.removeAllChildren();
        }

        public getChild(eventName:EEventName):wdCb.Collection<CustomEventRegisterData>;
        public getChild(target:EntityObject):wdCb.Collection<CustomEventRegisterData>;
        public getChild(target:EntityObject, eventName:EEventName):wdCb.Collection<CustomEventRegisterData>;

        public getChild(...args):any{
            if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                return this.globalListenerMap.getChild(eventName);
            }
            else if(args.length === 1 && args[0] instanceof EntityObject){
                let target = args[0];

                return this.targetListenerMap.getChild(this.buildFirstLevelKey(target));
            }
            else if(args.length === 2){
                let target = args[0],
                    eventName = args[1],
                    secondMap = null;

                secondMap = this.targetListenerMap.getChild(this.buildFirstLevelKey(target));

                if(!secondMap){
                    return null;
                }

                return secondMap.getChild(this.buildSecondLevelKey(eventName));
            }
        }

        public removeChild(eventName:EEventName):void;
        public removeChild(target:EntityObject):void;

        public removeChild(eventName:EEventName, handler:Function):void;
        public removeChild(uid:number, eventName:EEventName):void;
        public removeChild(target:EntityObject, eventName:EEventName):void;

        public removeChild(target:EntityObject, eventName:EEventName, handler:Function):void;


        public removeChild(...args):void{
            if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0];

                this.globalListenerMap.removeChild(eventName);
            }
            else if(args.length === 1 && args[0] instanceof EntityObject){
                let target = args[0];

                this.targetListenerMap.removeChild(this.buildFirstLevelKey(target));
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    list = null;

                list = this.globalListenerMap.getChild(eventName);

                if(!!list){
                    list.removeChild((val:CustomEventRegisterData) => {
                        return val.originHandler === handler;
                    })

                    if(list.getCount() === 0){
                        this.globalListenerMap.removeChild(eventName);
                    }
                }
            }
            else if(args.length === 2 && JudgeUtils.isNumber(args[0])){
                let uid = args[0],
                    eventName = args[1],
                    secondMap = null;
                secondMap = this.targetListenerMap.getChild(this.buildFirstLevelKey(uid));

                if(!!secondMap){
                    secondMap.removeChild(this.buildSecondLevelKey(eventName));
                }
            }
            else if(args.length === 2 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1],
                    secondMap = null;

                secondMap = this.targetListenerMap.getChild(this.buildFirstLevelKey(target));

                if(!!secondMap){
                    secondMap.removeChild(this.buildSecondLevelKey(eventName));
                }
            }
            else if(args.length === 3 && args[0] instanceof EntityObject){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    secondMap = null;

                secondMap = this.targetListenerMap.getChild(this.buildFirstLevelKey(target));

                if(!!secondMap){
                    let secondList = secondMap.getChild(eventName);

                    if(!!secondList){
                        secondList.removeChild((val:CustomEventRegisterData) => {
                            return val.originHandler === handler;
                        });

                        if(secondList.getCount() === 0){
                            secondMap.removeChild(eventName);
                        }
                    }
                }
            }
        }

        protected buildFirstLevelKey(target:EntityObject);
        protected buildFirstLevelKey(uid:number);

        protected buildFirstLevelKey(...args){
            var v = args[0],
                uid = v.uid;

            if(uid){
                return String(uid);
            }

            return v;
        }
    }
}
