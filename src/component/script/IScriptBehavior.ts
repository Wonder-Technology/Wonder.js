module wd{
    export interface IScriptBehavior{
        init?();
        update?(time:number);
        onEnter?();
        onExit?();
        onStartLoop?();
        onEndLoop?();
        onDispose?();

        onContact?(collisionObjects:wdCb.Collection<GameObject>);
        onCollisionStart();
        onCollisionEnd();
    }
}
