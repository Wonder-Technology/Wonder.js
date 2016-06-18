module wd {
    export class CallFunc extends ActionInstant{
        public static create(func:Function, context:any, ...data) {
            var dataArr = Array.prototype.slice.call(arguments, 2),
                action = new this(func, context, dataArr);

            return action;
        }

        constructor(func:Function, context:any, dataArr:Array<any>){
            super();

            this._context = context || root;
            this._callFunc = func;
            this._dataArr = wdCb.Collection.create<any>(dataArr);
        }

        private _context:any = null;
        private _callFunc:Function = null;
        private _dataArr:wdCb.Collection<any> = null;

        public clone():Action{
            return CloneUtils.clone(this, null, [this._callFunc, this._context, this._dataArr.clone(true).toArray()]);
        }

        public reverse() {
            return this;
        }
        public update(elapsed) {
            if (this._callFunc) {
                this._callFunc.call(this._context, this.p_target, this._dataArr);
            }

            this.finish();
        }
    }
}

