module wd {
    export abstract class ThreeDFont extends ThreeDUI {
        protected needFormat:boolean = false;

        private _isFirstUpdate:boolean = true;

        public update(elapsed:number){
            if(!this._isFirstUpdate){
                if(this.needFormat){
                    this.reFormat();
                }
            }
            else{
                this._isFirstUpdate = false;
            }

            this.needFormat = false;
        }

        @virtual
        protected reFormat(){
        }
    }
}

