module wd{
    export abstract class EventListenerMap{
        public abstract getChild(...args):wdCb.Collection<any>;
        public abstract removeChild(...args):any;
        public abstract hasChild(...args):boolean;
        public abstract appendChild(...args):void;

        public abstract forEachAll(func:(list:wdCb.Collection<any>, eventName:EEventName) => void):void;
        public abstract forEachEventName(func:(list:wdCb.Collection<any>, eventName:EEventName) => void):void;
        public abstract clear():void;

        protected abstract buildFirstLevelKey(target:EntityObject|HTMLElement):string;

        protected buildSecondLevelKey(eventName:EEventName):string{
            return <any>eventName;
        }
    }
}

