class EventPine{
	events = {};

	on(eventName, func, options){
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

		if(eventName === '*') eventName = '_any';

		var evs = this.events[eventName];
		if(evs === void 0){
			evs = this.events[eventName] = [];

			if(this.events['event.new.name'] !== void 0) // Internal Event
				this.emit('event.new.name', EventPine.ignoreInternal, eventName);
		}

		if(!evs.includes(func)){
			evs.push(func);

			if(this.events['event.new.callback'] !== void 0) // Internal Event
				this.emit('event.new.callback', EventPine.ignoreInternal, eventName);
		}

		return this;
	}

	once(eventName, func){
		this.on(eventName, func, {once:true});
		return this;
	}

	off(eventName, func){
		if(eventName === void 0){
			if(this.events['event.deleted'] !== void 0) // Internal Event
				this.emit('event.deleted', EventPine.ignoreInternal);

			this.events = {};
			return this;
		}

		if(eventName.includes(' ')){
			eventName = eventName.split(' ');

			func.evSplit = true; // For performance
			for (var i = 0; i < eventName.length; i++)
				this.off(eventName[i], func);

			func.evSplit = false; // For performance
			return this;
		}

		if(eventName === '*') eventName = '_any';
		if(this.events[eventName] === void 0)
			return this;

		var evs;
		if(func === void 0){
			delete this.events[eventName];

			if(this.events['event.deleted'] !== void 0) // Internal Event
				this.emit('event.deleted', EventPine.ignoreInternal, eventName);

			return this;
		}
		else{
			evs = this.events[eventName];
			while(true){
				var i = evs.indexOf(func);
				if(i === -1)
					return this;

				evs.splice(i, 1);
			}
		}

		if(evs.length === 0){
			delete this.events[eventName];

			if(this.events['event.deleted'] !== void 0) // Internal Event
				this.emit('event.deleted', EventPine.ignoreInternal, eventName);
		}

		return this;
	}

	emit(eventName, a,b,c,d,e){ // Max args = 5
		if(this.events._any !== void 0
		   && a !== EventPine.ignoreInternal
		   && eventName !== '_any')
			this.emit.call(this, '_any', a,b,c,d,e);

		var evs = this.events[eventName];
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

EventPine.ignoreInternal = {};

if(typeof exports === 'object' && typeof module !== 'undefined')
	module.exports = EventPine;
else if(typeof window !== 'undefined')
	window.EventPine = EventPine;
else this.EventPine = EventPine;