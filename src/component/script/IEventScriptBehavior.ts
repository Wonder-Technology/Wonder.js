module wd{
    export interface IEventScriptBehavior extends IScriptBehavior{
        onPointDown?(e:PointEvent);
        onPointUp?(e:PointEvent);
        onPointMove?(e:PointEvent);
        onPointOver?(e:PointEvent);
        onPointOut?(e:PointEvent);
        onPointScale?(e:PointEvent);
        onPointTap?(e:PointEvent);
        onPointDrag?(e:PointEvent);
    }
}
