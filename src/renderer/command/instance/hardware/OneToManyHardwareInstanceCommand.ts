module wd{
    export class OneToManyHardwareInstanceCommand extends HardwareInstanceCommand {
        public static create(){
            var obj = new this();

            return obj;
        }

        public geometry:InstanceGeometry = null;

        @require(function(material:Material){
            it("glslData should be ONE_MANY", () => {
                expect(this.glslData).equals(EInstanceGLSLData.ONE_MANY);
            }, this);
        })
        protected draw(material:Material) {
            var drawer:OneToManyHardwareInstanceDrawer = null;

            this.webglState.setState(material);

            drawer = OneToManyHardwareInstanceDrawer.getInstance();

            drawer.draw(this.geometry, this.instanceBuffer, this.program, this.buffers, this.drawMode);
        }

    }
}

