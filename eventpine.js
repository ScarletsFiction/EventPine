class EventPine{
	on(eventName, func, options){
		if(this._event === void 0)
			Object.defineProperty(this, '_event', {value:{}});

		if(options === void 0)
			options = {};

		if(!func.evSplit && eventName.includes(' ')){
			eventName = eventName.split(' ');

			func.evSplit = true; // For performance
			for (var i = 0; i < eventName.length; i++)
				this.on(eventName[i], func, options);

			func.evSplit = false; // For performance
			return this;
		}

		if(options.once === true){
			if(func.once === void 0)
				func.once = 1;
			else func.once++;
		}
		else func.on = true;

		var evs = this._event[eventName];
		if(evs === void 0)
			evs = this._event[eventName] = [];

		if(!evs.includes(func))
			evs.push(func);

		return this;
	}

	once(eventName, func){
		this.on(eventName, func, {once:true});
		return this;
	}

	off(eventName, func){
		if(eventName.includes(' ')){
			eventName = eventName.split(' ');

			func.evSplit = true; // For performance
			for (var i = 0; i < eventName.length; i++)
				this.off(eventName[i], func);

			func.evSplit = false; // For performance
			return this;
		}

		if(this._event === void 0 || this._event[eventName] === void 0)
			return this;

		var evs;
		if(func === void 0){
			delete this._event[eventName];
			return this;
		}
		else{
			evs = this._event[eventName];
			while(true){
				var i = evs.indexOf(func);
				if(i === -1)
					return this;

				evs.splice(i, 1);
			}
		}

		if(evs.length === 0)
			delete this._event[eventName];
		return this;
	}

	emit(eventName, a,b,c,d,e){ // Max args = 5
		if(this._event === void 0)
			return false;

		var evs = this._event[eventName];
		if(evs === void 0 || evs.length === 0)
			return false;

		for (var i = 0; i < evs.length; i++){
			var ev = evs[i];
			ev.call(this, a,b,c,d,e);

			if(ev.once === void 0)
				continue;

			ev.once--;
			if(ev.once === 0){
				delete ev.once;

				if(ev.on === void 0)
					evs.splice(i--, 1);
			}
		}

		return true;
	}
}

if(typeof exports === 'object' && typeof module !== 'undefined')
	module.exports = EventPine;
else if(typeof window !== 'undefined')
	window.EventPine = EventPine;
else if(typeof this !== 'undefined')
	this.EventPine = EventPine;
else console.error("It seems EventPine doesn't know on how to expose the class");