export function execOnlyOnce(flagName: string) {
    return function(target, name, descriptor) {
        var value = descriptor.value;

        descriptor.value = function(...args) {
            var result = null;

            if (this[flagName]) {
                return;
            }

            this[flagName] = true;

            return value.apply(this, args);
        };

        return descriptor;
    }
}