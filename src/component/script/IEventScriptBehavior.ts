module wd{
    export interface IEventScriptBehavior extends IScriptBehavior{
        onMouseDown?(e:MouseEvent);
        onMouseUp?(e:MouseEvent);
        onMouseMove?(e:MouseEvent);
        onMouseOver?(e:MouseEvent);
        onMouseOut?(e:MouseEvent);
        onMouseWheel?(e:MouseEvent);
        onMouseClick?(e:MouseEvent);
        onMouseDrag?(e:MouseEvent);
    }
}
