/// <reference path="../filePath.d.ts"/>
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
    }
}

