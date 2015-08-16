/// <reference path="../definitions.d.ts"/>
module dy {
    export class TimeUtils{
        public static computeElapseTime(time:number, startTime:number, pauseElapsed?:number){
            if(pauseElapsed){
                return time - pauseElapsed - startTime;
            }

            return time - startTime;
        }
    }
}

