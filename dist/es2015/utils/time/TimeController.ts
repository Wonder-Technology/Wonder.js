import { ensure, it } from "../../definition/typescript/decorator/contract";
import { Log } from "../Log";
import { expect } from "wonder-expect.js";

export abstract class TimeController {
    public elapsed: number = null;
    public pauseElapsed: number = 0;
    public pauseTime: number = null;
    public startTime: number = null;

    public start() {
        this.startTime = this.getNow();
        this.pauseElapsed = null;
    }

    public stop() {
        this.startTime = null;
    }

    public pause() {
        this.pauseTime = this.getNow();
    }

    public resume() {
        this.pauseElapsed += this.getNow() - this.pauseTime;
        this.pauseTime = null;
    }

    @ensure(function() {
        it(`elapsed should >= 0, but actual is ${this.elapsed}`, () => {
            expect(this.elapsed).gte(0);
        });
    })
    public computeElapseTime(time: number) {
        if (this.pauseElapsed) {
            this.elapsed = time - this.pauseElapsed - this.startTime;
        }
        else {
            this.elapsed = time - this.startTime;
        }

        if (this.elapsed < 0) {
            this.elapsed = 0;
        }

        return this.elapsed;
    }

    protected abstract getNow();
}