module dy{
    export class Entity {
        private static _count:number = 1;

        constructor() {
            this.uid = Entity._count;
            Entity._count += 1;
        }

        public uid:number = null;
    }
}
