/// <reference path="../definitions.d.ts"/>
module dyCb {
    export class DomQuery {
        public static create(domStr:string) {
            var obj = new this(domStr);

            return obj;
        }

        private _doms:any = null;

        constructor(domStr) {
            if (JudgeUtils.isDom(arguments[0])) {
                this._doms = [arguments[0]];
            }
            else {
                this._doms = document.querySelectorAll(domStr);
            }

            return this;
        }

        public get(index) {
            return this._doms[index];
        }
    }
}

