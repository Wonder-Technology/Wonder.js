/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class AutoDetachObserver extends Observer{
        public static create(onNext:Function, onError:Function, onCompleted:Function) {
            return new this(onNext, onError, onCompleted);
        }

        public dispose(){
            if(this.isDisposed){
                dyCb.Log.log("only can dispose once");
                return;
            }

            super.dispose();
        }

        protected onNext(value) {
            try {
                this.onUserNext(value);
            }
            catch (e) {
                this.error(e);
            }
        }

        protected onError(err) {
            try {
                this.onUserError(err);
            }
            catch (e) {
                throw e;
            }
            finally{
                this.dispose();
            }
        }

        protected onCompleted() {
            try {
                this.onUserCompleted();
                this.dispose();
            }
            catch (e) {
                //this.error(e);
                throw e;
            }
        }
    }
}
