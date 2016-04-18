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

        @cloneAttributeAsBasicType()
        private _context:any = null;
        @cloneAttributeAsBasicType()
        private _callFunc:Function = null;
        @cloneAttributeAsCustomType((source:any, target:any, memberName:string, cloneData:any) => {
            target[memberName] = source[memberName].clone(true);
        })
        private _dataArr:wdCb.Collection<any> = null;

        public reverse() {
            return this;
        }
        public update(elapsedTime) {
            if (this._callFunc) {
                this._callFunc.call(this._context, this.p_target, this._dataArr);
            }

            this.finish();
        }
    }
}

