"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var CommonTimeController_1 = require("../utils/time/CommonTimeController");
var Scheduler = (function () {
    function Scheduler() {
        this._scheduleCount = 0;
        this._schedules = Hash_1.Hash.create();
    }
    Scheduler.create = function () {
        var obj = new this();
        return obj;
    };
    Scheduler.prototype.update = function (elapsed) {
        var _this = this;
        this._schedules.forEach(function (scheduleItem, scheduleId) {
            if (scheduleItem.isStop || scheduleItem.isPause) {
                return;
            }
            scheduleItem.update(elapsed);
            if (scheduleItem.isFinish) {
                _this.remove(scheduleId);
            }
        });
    };
    Scheduler.prototype.scheduleLoop = function (task, args) {
        if (args === void 0) { args = []; }
        return this._schedule(LoopScheduleItem, Array.prototype.slice.call(arguments, 0));
    };
    Scheduler.prototype.scheduleFrame = function (task, frame, args) {
        if (frame === void 0) { frame = 1; }
        return this._schedule(FrameScheduleItem, Array.prototype.slice.call(arguments, 0));
    };
    Scheduler.prototype.scheduleInterval = function (task, time, args) {
        if (time === void 0) { time = 0; }
        return this._schedule(IntervalScheduleItem, Array.prototype.slice.call(arguments, 0));
    };
    Scheduler.prototype.scheduleTime = function (task, time, args) {
        if (time === void 0) { time = 0; }
        return this._schedule(TimeScheduleItem, Array.prototype.slice.call(arguments, 0));
    };
    Scheduler.prototype.pause = function (scheduleId) {
        if (arguments.length === 0) {
            var self_1 = this;
            this._schedules.forEach(function (scheduleItem, scheduleId) {
                self_1.pause(scheduleId);
            });
        }
        else if (arguments.length === 1) {
            var scheduleItem = this._schedules.getChild(arguments[0]);
            scheduleItem.pause();
        }
    };
    Scheduler.prototype.resume = function (scheduleId) {
        if (arguments.length === 0) {
            var self_2 = this;
            this._schedules.forEach(function (scheduleItem, scheduleId) {
                self_2.resume(scheduleId);
            });
        }
        else if (arguments.length === 1) {
            var scheduleItem = this._schedules.getChild(arguments[0]);
            scheduleItem.resume();
        }
    };
    Scheduler.prototype.start = function (scheduleId) {
        if (arguments.length === 0) {
            var self_3 = this;
            this._schedules.forEach(function (scheduleItem, scheduleId) {
                self_3.start(scheduleId);
            });
        }
        else if (arguments.length === 1) {
            var scheduleItem = this._schedules.getChild(arguments[0]);
            scheduleItem.start();
        }
    };
    Scheduler.prototype.stop = function (scheduleId) {
        if (arguments.length === 0) {
            var self_4 = this;
            this._schedules.forEach(function (scheduleItem, scheduleId) {
                self_4.stop(scheduleId);
            });
        }
        else if (arguments.length === 1) {
            var scheduleItem = this._schedules.getChild(arguments[0]);
            scheduleItem.stop();
        }
    };
    Scheduler.prototype.has = function (scheduleId) {
        return !!this._schedules.hasChild(scheduleId);
    };
    Scheduler.prototype.remove = function (scheduleId) {
        this._schedules.removeChild(scheduleId);
    };
    Scheduler.prototype.removeAll = function () {
        this._schedules.removeAllChildren();
    };
    Scheduler.prototype._schedule = function (_class, args) {
        var scheduleId = this._buildId();
        this._schedules.setValue(scheduleId, _class.create.apply(_class, args));
        return scheduleId;
    };
    Scheduler.prototype._buildId = function () {
        return 'Schedule_' + (this._scheduleCount++);
    };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
var ScheduleItem = (function () {
    function ScheduleItem(task, args) {
        this.isPause = false;
        this.isStop = false;
        this.pauseTime = null;
        this.pauseElapsed = null;
        this.startTime = null;
        this.isFinish = false;
        this.task = null;
        this.args = null;
        this.timeController = CommonTimeController_1.CommonTimeController.create();
        this.task = task;
        this.args = args;
    }
    ScheduleItem.prototype.pause = function () {
        this.isPause = true;
        this.timeController.pause();
    };
    ScheduleItem.prototype.resume = function () {
        this.isPause = false;
        this.timeController.resume();
    };
    ScheduleItem.prototype.start = function () {
        this.isStop = false;
        this.timeController.start();
    };
    ScheduleItem.prototype.stop = function () {
        this.isStop = true;
        this.timeController.stop();
    };
    ScheduleItem.prototype.finish = function () {
        this.isFinish = true;
    };
    return ScheduleItem;
}());
var TimeScheduleItem = (function (_super) {
    __extends(TimeScheduleItem, _super);
    function TimeScheduleItem(task, time, args) {
        if (time === void 0) { time = 0; }
        if (args === void 0) { args = []; }
        var _this = _super.call(this, task, args) || this;
        _this._time = null;
        _this._time = time;
        return _this;
    }
    TimeScheduleItem.create = function (task, time, args) {
        if (time === void 0) { time = 0; }
        if (args === void 0) { args = []; }
        var obj = new this(task, time, args);
        return obj;
    };
    TimeScheduleItem.prototype.update = function (elapsed) {
        var elapsed = this.timeController.computeElapseTime(elapsed);
        if (elapsed >= this._time) {
            this.task.apply(this, this.args);
            this.finish();
        }
    };
    return TimeScheduleItem;
}(ScheduleItem));
var IntervalScheduleItem = (function (_super) {
    __extends(IntervalScheduleItem, _super);
    function IntervalScheduleItem(task, time, args) {
        if (time === void 0) { time = 0; }
        if (args === void 0) { args = []; }
        var _this = _super.call(this, task, args) || this;
        _this._intervalTime = null;
        _this._elapsed = 0;
        _this._intervalTime = time;
        return _this;
    }
    IntervalScheduleItem.create = function (task, time, args) {
        if (time === void 0) { time = 0; }
        if (args === void 0) { args = []; }
        var obj = new this(task, time, args);
        return obj;
    };
    IntervalScheduleItem.prototype.update = function (elapsed) {
        var elapsed = this.timeController.computeElapseTime(elapsed);
        if (elapsed - this._elapsed >= this._intervalTime) {
            this.task.apply(this, this.args);
            this._elapsed = elapsed;
        }
    };
    IntervalScheduleItem.prototype.start = function () {
        _super.prototype.start.call(this);
        this._elapsed = 0;
    };
    return IntervalScheduleItem;
}(ScheduleItem));
var LoopScheduleItem = (function (_super) {
    __extends(LoopScheduleItem, _super);
    function LoopScheduleItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoopScheduleItem.create = function (task, args) {
        if (args === void 0) { args = []; }
        var obj = new this(task, args);
        return obj;
    };
    LoopScheduleItem.prototype.update = function (elapsed) {
        this.task.apply(this, this.args);
    };
    return LoopScheduleItem;
}(ScheduleItem));
var FrameScheduleItem = (function (_super) {
    __extends(FrameScheduleItem, _super);
    function FrameScheduleItem(task, frame, args) {
        if (frame === void 0) { frame = 1; }
        if (args === void 0) { args = []; }
        var _this = _super.call(this, task, args) || this;
        _this._frame = null;
        _this._frame = frame;
        return _this;
    }
    FrameScheduleItem.create = function (task, frame, args) {
        if (frame === void 0) { frame = 1; }
        if (args === void 0) { args = []; }
        var obj = new this(task, frame, args);
        return obj;
    };
    FrameScheduleItem.prototype.update = function (elapsed) {
        this._frame--;
        if (this._frame <= 0) {
            this.task.apply(this, this.args);
            this.finish();
        }
    };
    return FrameScheduleItem;
}(ScheduleItem));
//# sourceMappingURL=Scheduler.js.map