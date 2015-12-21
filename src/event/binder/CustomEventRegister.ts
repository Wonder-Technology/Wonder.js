/// <reference path="../../filePath.d.ts"/>
module wd {
    export class CustomEventRegister extends EventRegister{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }


        protected listenerMap:CustomEventListenerMap = CustomEventListenerMap.create();


        public register(target:GameObject, eventName:EventName, handler:Function, originHandler:Function, domHandler:Function, priority:number) {
            this.listenerMap.appendChild(target, eventName, <CustomEventRegisterData>{
                target: target,
                eventName: eventName,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        }

        public remove(eventName:EventName);
        public remove(target:GameObject);

        public remove(eventName:EventName, handler:Function);
        public remove(uid:number, eventName:EventName);
        public remove(target:GameObject, eventName:EventName);

        public remove(target:GameObject, eventName:EventName, handler:Function);


        public remove(...args) {
            var target = args[0],
                result = null;

            if (args.length === 1 && JudgeUtils.isString(args[0])) {
                let eventName = args[0];

                result = this.listenerMap.removeChild(eventName);
            }
            else if (args.length === 1 && args[0] instanceof GameObject) {
                result = this.listenerMap.removeChild(target);

                this._handleAfterAllEventHandlerRemoved(target);
            }
            else if (args.length === 2 && JudgeUtils.isFunction(args[1])) {
                let eventName = args[0],
                    handler = args[1];

                result = this.listenerMap.removeChild(eventName, handler);
            }
            else if (args.length === 2 && JudgeUtils.isNumber(args[0])) {
                let uid = args[0],
                    eventName = args[1];

                result = this.listenerMap.removeChild(uid, eventName);
            }
            else if ((args.length === 2 && args[0] instanceof GameObject) || args.length === 3) {
                result = this.listenerMap.removeChild.apply(this.listenerMap, args);

                if (this._isAllEventHandlerRemoved(target)) {
                    this._handleAfterAllEventHandlerRemoved(target);
                }
            }

            return result;
        }

        public setBubbleParent(target:GameObject, parent:GameObject) {
            target.bubbleParent = parent;
        }

        public getUidFromKey(key:string) {
            return this.listenerMap.getUidFromKey(key);
        }

        public isTarget(key:string, target:GameObject, list:wdCb.Collection<CustomEventRegisterData>) {
            return this.listenerMap.isTarget(key, target, list);
        }

        private _isAllEventHandlerRemoved(target:GameObject) {
            return !this.listenerMap.hasChild((list:wdCb.Collection<CustomEventRegisterData>, key:string) => {
                return key.indexOf(String(target.uid)) > -1 && (list && list.getCount() > 0);
            });
        }

        private _handleAfterAllEventHandlerRemoved(target:GameObject) {
            this.setBubbleParent(target, null);
        }
    }

    export type CustomEventRegisterData = {
        target:GameObject,
        //user's event handler
        originHandler: Function,
        //wraped user's event handler
        handler:Function,
        //dom event handler
        domHandler:Function,
        priority:number
    };
}
