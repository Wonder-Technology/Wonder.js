@wd.script("test")
export class Test{
    constructor(gameObject) {
        this.a = 0;
        this.b = 0;
        this.time = null;
        this.isInit = false;
        gameObject.a = 100;
        this.gameObject = gameObject;
    }

    public a = null;
    public b = null;
    public time = null;
    public isInit = null;
    public gameObject = null;

    public init(){
        this.isInit = true;
    }

    public update(time) {
        this.time = time;
        this.gameObject.a++;
    }

    public onEnter() {
        this.a++;
    }

    public onStartLoop() {
        this.b++;
    }

    public onEndLoop() {
        this.b -= 2;
    }

    public onExit() {
        this.a--;
    }

    public onDispose() {
    }
}
