module dy{
    export interface IScriptBehavior{
        update(time:number);
        onEnter();
        onExit();
        onStartLoop();
        onEndLoop();
    }
}
