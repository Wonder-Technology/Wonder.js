module wd{
    export class EmptyDebugStatistics implements IDebugStatistics{
        public static count = {
            get totalGameObjects(){
                return 0;
            },

            renderGameObjects:0,
            drawCalls:0
        }

        public static during = {
            get fps(){
                return 0;
            }
        }

        public static resetData(){
        }

        public static init(){
        }

        public static dispose(){
        }
    }
}
