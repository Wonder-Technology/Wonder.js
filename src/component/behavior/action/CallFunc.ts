/// <reference path="../../../definitions.d.ts"/>

module dy {
    export class CallFunc extends ActionInstant{
        public static create(func:Function, context:any, ...data) {
            var dataArr = Array.prototype.slice.call(arguments, 2),
                action = new this(func, context, dataArr);

            return action;
        }

        constructor(func:Function, context:any, dataArr:Array<any>){
            super();

            this._context = context || window;
            this._callFunc = func;
            this._dataArr = dataArr;
        }

        private _context:any = null;
        private _callFunc:Function = null;
        private _dataArr:Array<any> = null;

        public reverse() {
            return this;
        }
        public update(time) {
            if (this._callFunc) {
                this._callFunc.call(this._context, this.gameObject, this._dataArr);
            }

            this.finish();
        }
        public copy() {
            return new CallFunc(this._context, this._callFunc, dyCb.ExtendUtils.extendDeep(this._dataArr));
        }
    }
}

