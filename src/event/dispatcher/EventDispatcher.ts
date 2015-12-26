/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class EventDispatcher {
        public abstract trigger(...args):any;
    }
}

