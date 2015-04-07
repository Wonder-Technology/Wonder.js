var Engine3D;
(function (Engine3D) {
    var Material = (function () {
        function Material(diffuse, specular, shininess) {
            this._diffuse = null;
            this._specular = null;
            //todo change to enum type
            this._shininess = null;
            this._diffuse = diffuse;
            this._specular = specular;
            this._shininess = shininess;
        }
        Object.defineProperty(Material.prototype, "diffuse", {
            get: function () {
                return this._diffuse;
            },
            set: function (diffuse) {
                this._diffuse = diffuse;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Material.prototype, "specular", {
            get: function () {
                return this._specular;
            },
            set: function (specular) {
                this._specular = specular;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Material.prototype, "shininess", {
            get: function () {
                return this._shininess;
            },
            set: function (shininess) {
                this._shininess = shininess;
            },
            enumerable: true,
            configurable: true
        });
        Material.prototype.initWhenCreate = function () {
        };
        Material.create = function (diffuse, specular, shininess) {
            var obj = new this(diffuse, specular, shininess);
            obj.initWhenCreate();
            return obj;
        };
        return Material;
    })();
    Engine3D.Material = Material;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Material.js.map