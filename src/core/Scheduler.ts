/// <reference path="../definitions.d.ts"/>
module dy{
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

                scheduleItem.update(time);

                if(scheduleItem.isFinish){
                    this.remove(scheduleId);
                }
            });
        }

        /**
         * schedule the task to each frame
         * @param task
         * @param args
         * @returns {string} schedule id
         */
        public scheduleLoop(task:Function, args:Array<any>=[]) {
            return this._schedule(LoopScheduleItem, Array.prototype.slice.call(arguments, 0));
        }

        /**
         * schedule the task to the next speficied frame
         * @param task
         * @param {number} frame
         * @param args
         * @returns {string} schedule id
         */
        public scheduleFrame(task, frame=1, args?) {
            return this._schedule(FrameScheduleItem, Array.prototype.slice.call(arguments, 0));
        }

        /**
         * schedule the task to internal, like setInterval
         * @param task
         * @param time
         * @param args
         * @returns {string} schedule id
         */
        public scheduleInterval(task, time=0, args?) {
            return this._schedule(IntervalScheduleItem, Array.prototype.slice.call(arguments, 0));
        }

        /**
         * schedule the task to time, like setTimeout
         * @param task
         * @param time
         * @param args
         * @returns {string} schedule id
         */
        public scheduleTime(task, time=0, args?) {
            return this._schedule(TimeScheduleItem, Array.prototype.slice.call(arguments, 0));
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

                scheduleItem.pause();
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

                scheduleItem.resume();
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

                scheduleItem.start();
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

                scheduleItem.stop();
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

        private _schedule(_class:any, args:Array<any>){
            var scheduleId = this._buildId();

            this._schedules.setValue(scheduleId, _class.create.apply(_class, args));

            //this.start(scheduleId);

            return scheduleId;
        }

        private _buildId(){
            return 'Schedule_' + (this._scheduleCount++);
        }
    }

    class ScheduleItem{
        constructor(task:Function, args:Array<any>){
            this.task = task;
            this.args = args;
        }

        public isPause:boolean = false;
        public isStop:boolean = false;
        public pauseTime:number = null;
        public pauseElapsed:number = null;
        public startTime:number = null;
        public isFinish:boolean = false;

        protected task:Function = null;
        protected args:Array<any> = null;
        protected timeController:CommonTimeController = CommonTimeController.create();

        /**
         * pause the specified schedule
         * @param scheduleId
         */
        public pause() {
            this.isPause = true;
            this.timeController.pause();
            //this.pauseTime = window.performance.now();
        }

        /**
         * resume the specified schedule
         * @param scheduleId
         */
        public resume(){
            this.isPause = false;
            //this.pauseElapsed = window.performance.now() - this.pauseTime;
            //this.pauseTime = null;
            this.timeController.resume();
        }

        public start(){
            this.isStop = false;
            this.timeController.start();
        }

        public stop(){
            this.isStop = true;
            this.timeController.stop();
        }

        public finish(){
            this.isFinish = true;
        }
    }

    class TimeScheduleItem extends ScheduleItem{
        public static create(task:Function, time:number = 0, args:Array<any> = []) {
            var obj = new this(task, time, args);

            return obj;
        }

        constructor(task:Function, time:number = 0, args:Array<any> = []){
            super(task, args);

            this._time = time;
        }

        private _time:number = null;

        public update(time:number){
            //var elapsed = TimeUtils.computeElapseTime(time, this.startTime, this.pauseElapsed);
            var elapsed = this.timeController.computeElapseTime(time);

            if (elapsed >= this._time) {
                this.task.apply(this, this.args);
                this.finish();
            }
        }
    }

    class IntervalScheduleItem extends ScheduleItem{
        public static create(task:Function, time:number = 0, args:Array<any> = []) {
            var obj = new this(task, time, args);

            return obj;
        }

        constructor(task:Function, time:number = 0, args:Array<any> = []) {
            super(task, args);

            this._intervalTime = time;
        }

        private _intervalTime:number = null;
        private _elapsed:number = 0;

        public update(time:number){
            var elapsed = this.timeController.computeElapseTime(time);

            if (elapsed - this._elapsed >= this._intervalTime) {
                this.task.apply(this, this.args);
                this._elapsed =  elapsed;
            }
        }

        public start(){
            super.start();

            this._elapsed = 0;
        }
    }

    class LoopScheduleItem extends ScheduleItem{
        public static create(task:Function, args:Array<any> = []) {
            var obj = new this(task, args);

            return obj;
        }

        public update(time:number){
            this.task.apply(this, this.args);
        }
    }

    class FrameScheduleItem extends ScheduleItem {
        public static create(task:Function, frame:number = 1, args:Array<any> = []) {
            var obj = new this(task, frame, args);

            return obj;
        }

        constructor(task:Function, frame:number = 1, args:Array<any> = []) {
            super(task, args);

            this._frame = frame;
        }

        private _frame:number = null;

        public update(time:number){
            this._frame--;

            if (this._frame <= 0) {
                this.task.apply(this, this.args);
                this.finish();
            }
        }
    }
}
