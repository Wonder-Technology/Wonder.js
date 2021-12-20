import { expectType } from 'tsd';
import { pipe } from './Pipe';
// import { Add, Subtract, Mult, Div, DivMod, IsPositive, IsNatural, IsNegative, Inc, Decr, Min, Max, Equal, NotEqual, GreaterThanOrEqual, GreaterThan, LessThan, LessThanOrEqual, InRange } from './';

// type pipe = typeof pipe

declare function func(value: number): string

let c =pipe(func)(1)
type aa = typeof c
// let z:aa= null

// type ddd = typeof ""

// expectType<typeof pipe(func)(1)>("1")
expectType<aa>(typeof true)
