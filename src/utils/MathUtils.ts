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


        /**
         * generate num in (0,1)
         * @returns {number}
         */
        public static generateZeroToOne() {
            return Math.random();
        }

        /**
         * generate integer in [min,max]
         * @param min
         * @param max
         * @returns {number}
         */
        @require(function(min:number, max:number){
            assert(min < max, Log.info.FUNC_SHOULD("min", "< max"));
        })
        public static generateInteger(min:number, max:number) {
            var max = max + 1;

            return Math.floor(Math.random() * (max - min) + min);
        }
    }
}

