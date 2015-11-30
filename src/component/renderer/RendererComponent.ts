/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class RendererComponent extends Component {
        //todo transformDirty?(wozlla)
        //public render(renderer:Renderer, transformDirty:boolean):void {
        public abstract render(renderer:Renderer, geometry:Geometry, camera:GameObject);
    }
}

