declare namespace jest {
    interface Matchers<R> {
        toCalled(): CustomMatcherResult;
        toCalledOnce(): CustomMatcherResult;
        toCalledTwice(): CustomMatcherResult;
        toCalledWith(expected: any): CustomMatcherResult;
    }
}