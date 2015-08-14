/// <reference path="../../../definitions.d.ts"/>
module dy{
    export class ActionManager{
        public static create():ActionManager {
            var obj = new this();

            return obj;
        }

        constructor(){
        }

        private _children:dyCb.Collection<Action> = dyCb.Collection.create<Action>();
        //private _isStreamFinish:boolean = false;

        public addChild(action:Action){
            if(this.hasChild(action)){
                return;
            }

            this._children.addChild(action);
        }

        public removeChild(action:Action){
            this._children.removeChild(action);
        }

        public hasChild(action:Action){
            return this._children.hasChild(action);
        }

        //public addSubject(subject:dyRt.Subject){
        //    var self = this;
        //
        //    //observer.next = (data) => {
        //    //    try{
        //    //        self._action.update(data);
        //    //        next.call(observer, data);
        //    //
        //    //        if(self._action.isFinish){
        //    //            observer.completed();
        //    //        }
        //    //    }
        //    //    catch(e){
        //    //        observer.error(e);
        //    //    }
        //    //};
        //    subject.subscribe((time) => {
        //        //this.update(time);
        //        ////self._action.update(data);
        //        ////next.call(observer, data);
        //        //
        //        //if(this.isFinish){
        //        //    //observer.completed();
        //        //    return true;
        //        //}
        //    }, (e) =>{
        //        throw e;
        //    }, () => {
        //        //self._isStreamFinish = true;
        //    });
        //}

        public update(time:number){
            //this._updateAction(time);
            //this._updateStream(time);
            var self = this,
                removeQueue = [];
            //time = null;

            this._children.forEach(function(child){
                //修复“如果遍历的动作删除了动作序列中某个动作，则在后面的遍历中会报错”的bug
                if (!child) {
                    return;
                }

                if (child.isFinish) {
                    removeQueue.push(child);
                    return;
                }

                if (child.isStop()) {
                    return;
                }

                child.update(time);
            });

            removeQueue.forEach(function (child) {
                self._children.removeChild(child);
            });
        }

        private _updateAction(time:number){
            var self = this,
                removeQueue = [];
            //time = null;

            this._children.forEach(function(child){
                //修复“如果遍历的动作删除了动作序列中某个动作，则在后面的遍历中会报错”的bug
                if (!child) {
                    return;
                }

                if (child.isFinish) {
                    removeQueue.push(child);
                    return;
                }
                //if (child.isStop()) {
                //    return;
                //}

                child.update(time);
            });

            removeQueue.forEach(function (child) {
                self._children.removeChild(child);
            });
        }

        //private _updateStream(time:number){
        //    //var self = this,
        //    //    removeQueue = [];
        //    ////time = null;
        //    //
        //    //this._streams.forEach(function(stream){
        //    //    ////修复“如果遍历的动作删除了动作序列中某个动作，则在后面的遍历中会报错”的bug
        //    //    //if (!stream) {
        //    //    //    return;
        //    //    //}
        //    //
        //    //    if (stream.isFinish) {
        //    //        removeQueue.push(stream);
        //    //        return;
        //    //    }
        //    //    //if (stream.isStop()) {
        //    //    //    return;
        //    //    //}
        //    //
        //    //    stream.update(time);
        //    //});
        //    //
        //
        //    //if(this._isStreamFinish){
        //    //    this._stream.completed();
        //    //    return;
        //    //}
        //    if(this._stream.isStart){
        //        this._stream.next(time);
        //    }
        //    //
        //    //removeQueue.forEach(function (stream) {
        //    //    self._streamren.removeChild(stream);
        //    //});
        //}
    }
}