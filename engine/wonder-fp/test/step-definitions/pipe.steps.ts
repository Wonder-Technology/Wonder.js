import { loadFeature, defineFeature } from 'jest-cucumber';
import { pipe } from '../../src/Pipe';

const feature = loadFeature('./test/features/pipe.feature');

defineFeature(feature, test => {
  test('Pipe functions', ({
    when,
    then
  }) => {
    let result: any = null

    when('I pipe functions', () => {
      let res = pipe(
        (value: number) => value * 3,
        (value: number) => (value + 2).toString()
      )(1)

      result = res
    });

    then('I should exec functions one by one', () => {
      expect(result).toEqual("5")
    });
  });
});
