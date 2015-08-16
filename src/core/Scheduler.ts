/// <reference path="../definitions.d.ts"/>
module dy{
    //todo extract ScheduleItem

    export class Scheduler{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _scheduleCount = 0;
        private _schedules:dyCb.Hash<any> = dyCb.Hash.create<any>();

        public update(time:number) {
            this._schedules.forEach((scheduleItem:any, scheduleId:string) => {
                    if(scheduleItem.isStop || scheduleItem.isPause){
                        return;
                    }

                    if (scheduleItem.isFrame) {
                        scheduleItem.frame--;
                        if (scheduleItem.frame <= 0) {
                            this.remove(scheduleId);
                            scheduleItem.task.apply(scheduleItem, scheduleItem.args);
                        }
                    }
                    else if (scheduleItem.isTime) {
                        var elapsed = TimeUtils.computeElapseTime(time, scheduleItem.startTime, scheduleItem.pauseElapsed);
                        if (elapsed >= scheduleItem.time) {
                            this.remove(scheduleId);
                            scheduleItem.task.apply(scheduleItem, scheduleItem.args);
                        }
                    }
                    else if (scheduleItem.isInterval) {
                        var elapsed = TimeUtils.computeElapseTime(time, scheduleItem.startTime, scheduleItem.pauseElapsed)
                        if (elapsed - scheduleItem.elapsed >= scheduleItem.intervalTime) {
                            scheduleItem.task.apply(scheduleItem, scheduleItem.args);
                            scheduleItem.elapsed =  elapsed;
                        }
                    }
                    else if (scheduleItem.isLoop) {
                        scheduleItem.task.apply(scheduleItem, scheduleItem.args);
                    }
            });
        }

        /**
         * schedule the task to each frame
         * @param task
         * @param args
         * @returns {string} schedule id
         */
        public scheduleLoop(task, args?) {
            var scheduleId = 'Schedule_' + (this._scheduleCount++);
            this._schedules.setValue(scheduleId, {
                task : task,
                args : args,
                isLoop : true
            });
            this.start(scheduleId);

            return scheduleId;
        }

        /**
         * schedule the task to the next speficied frame
         * @param task
         * @param {number} frame
         * @param args
         * @returns {string} schedule id
         */
        public scheduleFrame(task, frame=1, args?) {
            var scheduleId = 'Schedule_' + (this._scheduleCount++);
            this._schedules.setValue(scheduleId, {
                task : task,
                frame : frame,
                args : args,
                isFrame : true
            });
            this.start(scheduleId);

            return scheduleId
        }

        /**
         * schedule the task to internal, like setInterval
         * @param task
         * @param time
         * @param args
         * @returns {string} schedule id
         */
        public scheduleInterval(task, time=0, args?) {
            var scheduleId = 'Schedule_' + (this._scheduleCount++);
            this._schedules.setValue(scheduleId, {
                task : task,
                intervalTime : time,
                elapsed : 0,
                args : args,
                isInterval : true
            });
            this.start(scheduleId);

            return scheduleId;
        }

        /**
         * schedule the task to time, like setTimeout
         * @param task
         * @param time
         * @param args
         * @returns {string} schedule id
         */
        public scheduleTime(task, time=0, args?) {
            var scheduleId = 'Schedule_' + (this._scheduleCount++);
            time = time || 0;
            this._schedules.setValue(scheduleId, {
                task : task,
                time : time,
                args : args,
                isTime : true
            });
            this.start(scheduleId);

            return scheduleId;
        }

        /**
         * pause the specified schedule
         * @param scheduleId
         */
        public pause(scheduleId?:string) {
            if(arguments.length === 0){
                let self = this;

                this._schedules.forEach((scheduleItem:any, scheduleId:string) => {
                    self.pause(scheduleId);
                });
            }
            else if(arguments.length === 1) {
                let scheduleItem = this._schedules.getChild(arguments[0]);

                scheduleItem.isPause = true;
                scheduleItem.pauseTime = window.performance.now();
            }
        }

        /**
         * resume the specified schedule
         * @param scheduleId
         */
        public resume(scheduleId?:string) {
            if(arguments.length === 0){
                let self = this;

                this._schedules.forEach((scheduleItem:any, scheduleId:string) => {
                    self.resume(scheduleId);
                });
            }
            else if(arguments.length === 1) {
                let scheduleItem = this._schedules.getChild(arguments[0]);

                scheduleItem.isPause = false;
                scheduleItem.pauseElapsed = window.performance.now() - scheduleItem.pauseTime;
                scheduleItem.pauseTime = null;
            }
        }

        public start(scheduleId?:string){
            if(arguments.length === 0){
                let self = this;

                this._schedules.forEach((scheduleItem:any, scheduleId:string) => {
                    self.start(scheduleId);
                });
            }
            else if(arguments.length === 1){
                let scheduleItem = this._schedules.getChild(arguments[0]);

                scheduleItem.isStop = false;
                scheduleItem.startTime = window.performance.now();
                scheduleItem.pauseElapsed = null;
                scheduleItem.elapsed = 0;
            }
        }

        public stop(scheduleId?:string){
            if(arguments.length === 0){
                let self = this;

                this._schedules.forEach((scheduleItem:any, scheduleId:string) => {
                    self.stop(scheduleId);
                });
            }
            else if(arguments.length === 1){
                let scheduleItem = this._schedules.getChild(arguments[0]);

                scheduleItem.isStop = true;
            }
        }

        public has(scheduleId:string) {
            return !!this._schedules.hasChild(scheduleId)
        }

        /**
         * remove the specify schedule by id
         * @param id
         */
        public remove(scheduleId:string) {
             this._schedules.removeChild(scheduleId);
        }

        public removeAll(){
            this._schedules.removeAllChildren();
        }
    }
}
