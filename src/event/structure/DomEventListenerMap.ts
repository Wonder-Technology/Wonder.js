module wd{
    export class DomEventListenerMap extends EventListenerMap{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _targetListenerMap: wdCb.Hash<wdCb.Hash<wdCb.Collection<DomEventRegisterData>>> = wdCb.Hash.create<wdCb.Hash<wdCb.Collection<DomEventRegisterData>>>();

        public hasChild(dom:HTMLElement, eventName:EEventName):boolean{
            var list:any = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));

            if(!list){
                return false;
            }

            list = list.getChild(eventName);

            return list && list.getCount() > 0;
        }

        public appendChild(dom:HTMLElement, eventName:EEventName, data:any){
            var firstLevelKey = this.buildFirstLevelKey(dom);

            if(!this._targetListenerMap.hasChild(firstLevelKey)){
                let secondMap = wdCb.Hash.create<wdCb.Collection<EventRegisterData>>();

                secondMap.addChild(this.buildSecondLevelKey(eventName), wdCb.Collection.create<EventRegisterData>([data]));

                this._targetListenerMap.addChild(firstLevelKey, secondMap);

                return;
            }

            this._targetListenerMap.getChild(firstLevelKey).appendChild(this.buildSecondLevelKey(eventName), data);
        }

        public forEachAll(func:(list:wdCb.Collection<DomEventRegisterData>, eventName:EEventName) => void){
            this._targetListenerMap.forEach((secondMap:wdCb.Collection<EventRegisterData>) => {
                secondMap.forEach(func);
            });
        }

        public forEachEventName(func:(list:wdCb.Collection<DomEventRegisterData>, eventName:EEventName) => void){
            this.forEachAll(func);
        }

        public clear(){
            this._targetListenerMap.removeAllChildren();
        }

        public getChild(dom:HTMLElement):wdCb.Collection<DomEventRegisterData>;
        public getChild(dom:HTMLElement, eventName:EEventName):wdCb.Collection<DomEventRegisterData>;

        public getChild(...args):any{
            if(args.length === 1){
                let dom = args[0];

                return this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));
            }
            else if(args.length === 2){
                let dom = args[0],
                    eventName = args[1],
                    secondMap = null;

                secondMap = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));

                if(!secondMap){
                    return null;
                }

                return secondMap.getChild(this.buildSecondLevelKey(eventName));
            }
        }

        public removeChild(eventName:EEventName):wdCb.Collection<DomEventOffData>;
        public removeChild(eventName:EEventName, handler:Function):wdCb.Collection<DomEventOffData>;
        public removeChild(dom:HTMLElement, eventName:EEventName):wdCb.Collection<DomEventOffData>;
        public removeChild(dom:HTMLElement, eventName:EEventName, handler:Function):wdCb.Collection<DomEventOffData>;

        public removeChild(...args){
            var result:any = null;

            if(args.length === 1 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    arr:Array<wdCb.Collection<DomEventRegisterData>> = [];

                this._targetListenerMap.forEach((secondMap:wdCb.Hash<wdCb.Collection<DomEventRegisterData>>, firstLevelKey:string) => {
                    var secondLevelKey = this.buildSecondLevelKey(eventName);

                    if(secondMap.hasChild(secondLevelKey)){
                        arr.push(secondMap.removeChild(secondLevelKey).getChild(0));
                    }
                });

                let l = wdCb.Collection.create<DomEventRegisterData>();

                for(let list of arr){
                    l.addChildren(list);
                }

                result = this._getEventDataOffDataList(eventName, l);
            }
            else if(args.length === 2 && JudgeUtils.isString(args[0])){
                let eventName = args[0],
                    handler = args[1],
                    arr:Array<wdCb.Collection<DomEventRegisterData>> = [];

                this._targetListenerMap.forEach((secondMap:wdCb.Hash<wdCb.Collection<DomEventRegisterData>>, firstLevelKey:string) => {
                    let list = secondMap.getChild(this.buildSecondLevelKey(eventName));

                    if(list){
                        arr.push(list.removeChild((data:DomEventRegisterData) => {
                            return data.originHandler === handler
                        }));
                    }
                });

                let l = wdCb.Collection.create<DomEventRegisterData>();

                for(let list of arr){
                    l.addChildren(list);
                }

                result = this._getEventDataOffDataList(eventName, l);
            }
            else if(args.length === 2 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1],
                    secondMap = null;

                secondMap = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));

                if(!secondMap){
                    result = wdCb.Collection.create<DomEventOffData>();
                }
                else{
                    result =this._getEventDataOffDataList(eventName, secondMap.removeChild(this.buildSecondLevelKey(eventName)).getChild(0));
                }
            }
            else if(args.length === 3 && JudgeUtils.isDom(args[0])){
                let dom = args[0],
                    eventName = args[1],
                    handler = args[2],
                    secondMap = null;

                secondMap = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));

                if(!secondMap){
                    result = wdCb.Collection.create<DomEventOffData>();
                }
                else{
                    let list = secondMap.getChild(this.buildSecondLevelKey(eventName));

                    if(!list){
                        result = wdCb.Collection.create<DomEventOffData>();
                    }
                    else{
                        result = this._getEventDataOffDataList(eventName, list.removeChild((val:DomEventRegisterData) => {
                            return val.originHandler === handler;
                        }));
                    }
                }
            }

            return result;
        }

        protected buildFirstLevelKey(dom:HTMLElement){
            if(dom.id){
                return `${dom.tagName}${dom.id}`;
            }

            if(dom.nodeName){
                return `${dom.nodeName}`;
            }

            return `${dom.tagName}`;
        }

        private _getEventDataOffDataList(eventName:string, result:wdCb.Collection<DomEventRegisterData>):any{
            if(!result){
                return wdCb.Collection.create<DomEventRegisterData>();
            }

            return result.map((data:DomEventRegisterData) => {
                return {
                    dom: data.dom,
                    eventName: eventName,
                    domHandler: data.domHandler
                }
            });
        }
    }

    export type DomEventOffData = {
        dom:HTMLElement,
        eventName:EEventName,
        domHandler:Function
    }
}
