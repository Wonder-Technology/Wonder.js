import "wonder-frp/dist/es2015/stream/FilterStream";
import "wonder-frp/dist/es2015/stream/MapStream";
import "wonder-frp/dist/es2015/extend/root";
import { intervalRequest } from "wonder-frp/dist/es2015/global/Operator";
import flow from "lodash-es/flow";
import { renderWorkerFilePath } from "./workerFilePath";
var renderWorker;
var gameLoop = null;
var position = null;
var _startLoop = function () {
    gameLoop = intervalRequest()
        .subscribe(function (time) {
        _loopBody(time);
    });
};
var _init = function () {
    var canvas = document.getElementById('webgl');
    if (!('transferControlToOffscreen' in canvas)) {
        throw new Error('webgl in worker unsupported\n' +
            'try setting gfx.offscreencanvas.enabled to true in about:config');
    }
    var offscreen = canvas.transferControlToOffscreen();
    renderWorker = new Worker(renderWorkerFilePath);
    renderWorker.postMessage({ canvas: offscreen }, [offscreen]);
};
var _updateAction = function (time) {
    position = _getNewPosition(time);
    return time;
};
var _getNewPosition = function (time) {
    var delta = (time % 1000 - 500) / 1000;
    return delta;
};
var _beginRecord = function (time) {
    recordData.beginTime = time;
};
var _stopRecord = function (time) {
    recordData.endTime = time;
    stop();
};
var RecordData = (function () {
    function RecordData() {
    }
    RecordData.create = function () {
        var obj = new this();
        return obj;
    };
    return RecordData;
}());
var recordData = RecordData.create();
var isBeginRecord = false, isEndRecord = false;
var _record = function (time) {
    if (isBeginRecord) {
        isBeginRecord = false;
        _beginRecord(time);
    }
    if (isEndRecord) {
        isEndRecord = false;
        _stopRecord(time);
    }
    return time;
};
var _update = flow(_record, _updateAction);
var _sendTimeToRenderWorker = function (time) {
    renderWorker.postMessage({
        renderData: {
            position: position
        },
        rAF: time
    });
    return time;
};
var _loopBody = flow(_update, _sendTimeToRenderWorker);
export var start = flow(_init, _startLoop);
export var beginRecord = function (time) {
    isBeginRecord = true;
    isEndRecord = false;
};
export var endRecord = function (time) {
    isBeginRecord = false;
    isEndRecord = true;
};
export var stop = function () {
    gameLoop.dispose();
};
export var rePlay = function () {
    var startTime = null;
    gameLoop = intervalRequest()
        .map(function (time) {
        if (startTime === null) {
            startTime = time;
        }
        return time - (startTime - recordData.beginTime);
    })
        .filter(function (time) {
        return time <= recordData.endTime;
    })
        .subscribe(function (time) {
        _loopBody(time);
    });
};
//# sourceMappingURL=main.js.map