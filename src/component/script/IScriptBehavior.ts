module dy{
    export interface IScriptBehavior{
        init();
        update(time:number);
        onEnter();
        onExit();
        onStartLoop();
        onEndLoop();
    }
}
