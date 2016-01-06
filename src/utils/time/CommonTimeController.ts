module wd {
    export class CommonTimeController extends TimeController {
        public static create() {
            var obj = new this();

            return obj;
        }

        protected getNow(){
            if(Director.getInstance().isTimeChange){
                return Director.getInstance().elapsed;
            }

            return root.performance.now();
        }
    }
}
