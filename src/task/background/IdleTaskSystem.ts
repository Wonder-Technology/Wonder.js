import { IdleTaskData } from "./IdleTaskData";
import { root } from "../../definition/Variable";
import { fromPromise } from "wonder-frp/dist/es2015/global/Operator";
// import { root } from "./extend/root";

//todo move to new project
export const enqueueTaskReturnPromise = (timeout:number = 1000) => {
    return fromPromise(new Promise((resolve:Function, reject:Function) => {
        enqueueTask(_isIdle, resolve, timeout)
    }))
        .ignoreElements();
}

const _isIdle = (resolve) => {
    resolve(true);
}

export const enqueueTask = (taskHandler:Function, taskData:any, timeout:number = 1000) => {
    var {
        taskList
    } = IdleTaskData;
    const _runTaskQueue = (deadline:{timeRemaining:Function, didTimeout:boolean}) => {
        while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && taskList.length > 0) {
            let task = taskList.shift();

            IdleTaskData.currentTaskNumber += 1;

            task.handler(task.data);
        }

        if (taskList.length > 0) {
            IdleTaskData.taskHandleForCancel = root.requestIdleCallback(_runTaskQueue, { timeout: timeout} );
        }
        else {
            IdleTaskData.taskHandleForCancel = 0;
        }
    }

    taskList.push({
        handler: taskHandler,
        data: taskData
    });

    IdleTaskData.totalTaskCount += 1;

    IdleTaskData.taskHandleForCancel = root.requestIdleCallback(_runTaskQueue, { timeout: timeout });
}

const _initData = (IdleTaskData:any) => {
    IdleTaskData.taskList = [];
    IdleTaskData.taskHandleForCancel = 0;
    IdleTaskData.totalTaskCount = 0;
    IdleTaskData.currentTaskNumber = 0;
}

_initData(IdleTaskData);
