/// <reference path="../../definitions.d.ts"/>

module dy {
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
            this._dataArr = dyCb.Collection.create<any>(dataArr);
        }

        private _context:any = null;
        private _callFunc:Function = null;
        private _dataArr:dyCb.Collection<any> = null;

        public reverse() {
            return this;
        }
        public update(time) {
            if (this._callFunc) {
                this._callFunc.call(this._context, this.p_target, this._dataArr);
            }

            this.finish();
        }
        public copy() {
            return new CallFunc(this._context, this._callFunc, this._dataArr.copy(true).getChildren());
        }
    }
}

