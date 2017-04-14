import "wonder-frp/dist/es2015/stream/FilterStream";
import "wonder-frp/dist/es2015/stream/MapStream";
import "wonder-frp/dist/es2015/extend/root";
import {intervalRequest} from "wonder-frp/dist/es2015/global/Operator";
import flow from "lodash-es/flow";
import {actionWorkerFilePath, collisionWorkerFilePath, renderWorkerFilePath} from "./workerFilePath";


var renderWorker;
var collisionWorker;
var actionWorker;


var gameLoop = null;

var position:number = null;

var positionUpdatedByAction = null;

var collisionData = {
    isCollide: null,
    position: null
}


/*! side effect */
var _startLoop = () => {
    gameLoop = intervalRequest()
        .subscribe((time) => {
            _loopBody(time);
        });
}




/*! side effect */
var _init = () => {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    if (!('transferControlToOffscreen' in canvas)) {
        throw new Error('webgl in worker unsupported\n' +
            'try setting gfx.offscreencanvas.enabled to true in about:config');
    }
    var offscreen = (<any>canvas).transferControlToOffscreen();
    renderWorker = new Worker(renderWorkerFilePath);
    renderWorker.postMessage({ canvas: offscreen }, [offscreen]);



    collisionWorker = new Worker(collisionWorkerFilePath);

    collisionWorker.onmessage = (msg) => {
        collisionData = msg.data;
        // console.log("receive collision message: ", collisionData)
    };




    actionWorker = new Worker(actionWorkerFilePath);

    actionWorker.onmessage = (msg) => {
        positionUpdatedByAction = msg.data.position;
    };
}


/*! side effect */
var _beginRecord = (time) => {
    recordData.beginTime = time;
}

/*! side effect */
var _stopRecord = (time) => {
    recordData.endTime = time;

    stop();
}




class RecordData{
    public static create() {
        var obj = new this();

        return obj;
    }

    public beginTime;
    public endTime;
}

var recordData = RecordData.create();
var isBeginRecord = false,
    isEndRecord = false;

var _record = (time:number) => {
    if(isBeginRecord){
        isBeginRecord = false;
        _beginRecord(time);
    }

    if(isEndRecord){
        isEndRecord = false;
        _stopRecord(time);
    }

    return time;
}







var _sendDataToActionWorker = (time) => {
    actionWorker.postMessage({
        time: time
    });

    return time;
}


var _sendDataToCollisionWorker = (time) => {
    // console.log("send collision pos:", position)
    collisionWorker.postMessage({
        position:positionUpdatedByAction
    });

    return time;
}


var _sendDataToLogicWorker = flow(_sendDataToActionWorker, _sendDataToCollisionWorker);



/*! side effect */
var _sync = (time) => {
    if(collisionData.isCollide){
        position = collisionData.position;
    }
    else{
        position = positionUpdatedByAction;
    }

    return time;
}






/*! side effect */
var _update = flow(_record, _sendDataToLogicWorker, _sync);






var _sendTimeToRenderWorker = (time) => {
    if(position > 0.2){
        // if( !collisionData.isCollide && collisionData.position)
        console.log("err", collisionData, position)
    }

    renderWorker.postMessage({
        renderData: {
            position:position
        },
        rAF: time
    });

    return time;
}



var _loopBody = flow( _update, _sendTimeToRenderWorker);


export var start = flow(_init, _startLoop);



/*! side effect */
export var beginRecord = (time) => {
    isBeginRecord = true;
    isEndRecord = false;
}

/*! side effect */
export var endRecord = (time) => {
    isBeginRecord = false;
    isEndRecord = true;
}

export var stop = () => {
    gameLoop.dispose();
}

/*! side effect */
export var rePlay = () => {
    var startTime = null;

    gameLoop = intervalRequest()
        .map((time) => {
            if(startTime === null){
                startTime = time;
            }

            return time - (startTime - recordData.beginTime);
        })
        .filter((time) => {
            return time <= recordData.endTime
        })
        .subscribe((time) => {
            _loopBody(time);
        });
}
