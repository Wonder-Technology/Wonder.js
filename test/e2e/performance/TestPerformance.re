open WonderBenchmark;

open PerformanceTestData;

open Js.Promise;

let generateBenchmark = () => TestPerformance.generateBenchmark(performanceTestData);

let runTest = (browserArr) => TestPerformance.runTest(browserArr, performanceTestData);