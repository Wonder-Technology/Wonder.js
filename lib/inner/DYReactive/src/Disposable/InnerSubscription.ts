/// <reference path="../definitions.d.ts"/>
module dyRt{
	export class InnerSubscription implements IDisposable{
		public static create(subject:Subject, observer:Observer) {
			var obj = new this(subject, observer);

			return obj;
		}

		private _subject:Subject = null;
		private _observer:Observer = null;

		constructor(subject:Subject, observer:Observer){
			this._subject = subject;
			this._observer = observer;
		}

		public dispose(){
			this._subject.remove(this._observer);

			this._observer.dispose();
		}
	}
}
