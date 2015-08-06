/// <reference path="../../definitions.d.ts"/>
module dy {
    export class Renderer extends Component {
        //todo transformDirty?(wozlla)
        //public render(renderer:render.Renderer, transformDirty:boolean):void {
        public render(renderer:render.Renderer, geometry:Geometry, camera:GameObject):void {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
    }
}

