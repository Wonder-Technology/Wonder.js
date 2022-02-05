import { loadFeature, defineFeature } from 'jest-cucumber';
import { curry2 } from '../../src/Curry';

const feature = loadFeature('./test/features/curry.feature');

defineFeature(feature, test => {
    test('Curry2', ({
        when,
        then
    }) => {
        let curriedFunc: any = null

        when(/^I curry(.*) function$/, (_arg0) => {
            function func(value1: number, value2: number) { return value1 + value2 }

            curriedFunc = curry2(func)
        });

        then('the function can pass params to it twice', () => {
            expect(curriedFunc(1)(2)).toEqual(3)
        });
    });
});