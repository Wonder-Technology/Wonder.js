export class IdleTaskData{
    public static taskList:Array<Task> = null;
    public static taskHandleForCancel:number = null;
    public static totalTaskCount:number = null;
    public static currentTaskNumber:number = null;
}

export type Task = {
    handler:Function;
    data:any;
}