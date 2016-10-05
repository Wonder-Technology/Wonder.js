module wd {
    export class MathUtils{
        public static clamp(num:number, below:number, up:number):number{
            if(num < below){
                return below;
            }
            else if(num > up){
                return up;
            }

            return num;
        }

        public static bigThan(num:number, below:number){
            return num < below ? below : num;
        }

        public static generateZeroToOne() {
            return Math.random();
        }

        @require(function(min:number, max:number){
            assert(min < max, Log.info.FUNC_SHOULD("min", "< max"));
        })
        public static generateMinToMax(min:number, max:number){
            var max = max + 1;

            return Math.random() * (max - min) + min;
        }

        @require(function(min:number, max:number){
            assert(min < max, Log.info.FUNC_SHOULD("min", "< max"));
        })
        public static generateInteger(min:number, max:number) {
            return Math.floor(this.generateMinToMax(min, max));
        }

        @ensure(function(val){
            assert(val >= 0);
        })
        public static mod(a:number, b:number) {
            var n = Math.floor(a / b);

            a -= n * b;

            if (a < 0) {
                a += b;
            }

            return a;
        }

        @require(function(a:number, b:number){
            assert(a >= 0 && b >= 0, Log.info.FUNC_SHOULD("param", ">= 0"));
        })
        @ensure(function(val){
            assert(val >= 0);
        })
        public static maxFloorIntegralMultiple(a:number, b:number) {
            if(b == 0){
                return a;
            }

            if(a < b){
                return 0;
            }

            return Math.floor(a / b) * b;
        }
    }
}

