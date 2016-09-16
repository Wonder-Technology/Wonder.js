module wd {
    export class SkyboxRenderer extends MeshRenderer {
        public static create() {
            var obj = new this();

            return obj;
        }

        @require(function(renderer:Renderer, target:GameObject, camera:GameObject){
            it("target should has geometry", () => {
                expect(target.hasComponent(Geometry)).true;
            });
        })
        public render(renderer:Renderer, target:GameObject, camera:GameObject):void {
            renderer.skyboxCommand = this.createDrawCommand(target, target.getComponent<Geometry>(Geometry), camera);
        }
    }
}

