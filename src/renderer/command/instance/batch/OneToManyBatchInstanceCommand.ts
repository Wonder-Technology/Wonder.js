module wd {
    export class OneToManyBatchInstanceCommand extends BatchInstanceCommand {
        public static create() {
            var obj = new this();

            return obj;
        }

        public geometry:InstanceGeometry = null;

        protected draw(material:Material) {
            var drawer:OneToManyBatchInstanceDrawer = null;

            drawer = OneToManyBatchInstanceDrawer.getInstance();

            drawer.draw(this.geometry, this.program, this.buffers, this.drawMode);
        }

    }
}

