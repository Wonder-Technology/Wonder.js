import { registerClass } from "../definition/typescript/decorator/registerClass";
import { require, it, ensure } from "../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";

@registerClass("MathUtils")
export class MathUtils {
    public static clamp(num: number, below: number, up: number): number {
        if (num < below) {
            return below;
        }
        else if (num > up) {
            return up;
        }

        return num;
    }

    public static bigThan(num: number, below: number) {
        return num < below ? below : num;
    }

    public static generateZeroToOne() {
        return Math.random();
    }

    @require(function(min: number, max: number) {
        it("min should <= max", () => {
            expect(min).lte(max);
        });
    })
    public static generateMinToMax(min: number, max: number) {
        return Math.random() * (max + 1 - min) + min;
    }

    public static generateInteger(min: number, max: number) {
        return Math.floor(this.generateMinToMax(min, max));
    }

    @ensure(function(val) {
        it("result should >= 0", () => {
            expect(val).gte(0);
        });
    })
    public static mod(a: number, b: number) {
        var n = Math.floor(a / b);

        a -= n * b;

        if (a < 0) {
            a += b;
        }

        return a;
    }

    @require(function(a: number, b: number) {
        it("a,b should >= 0", () => {
            expect(a).gte(0);
            expect(b).gte(0);
        });
    })
    @ensure(function(val) {
        it("result should >= 0", () => {
            expect(val).gte(0);
        });
    })
    public static maxFloorIntegralMultiple(a: number, b: number) {
        if (b == 0) {
            return a;
        }

        if (a < b) {
            return 0;
        }

        return Math.floor(a / b) * b;
    }
}