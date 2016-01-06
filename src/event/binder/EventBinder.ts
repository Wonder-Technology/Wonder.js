module wd {
    export abstract class EventBinder {
        public abstract on(...args):void;
        public abstract off(...args):void;
    }
}
