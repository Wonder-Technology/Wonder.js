/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class RendererComponent extends Component {
        public abstract render(renderer:Renderer, geometry:Geometry, camera:GameObject);
    }
}

