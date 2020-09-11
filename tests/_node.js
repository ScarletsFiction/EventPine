var EventPine = require('../eventpine.js');

class CustomClass extends EventPine{}

function testA(a){
	gotOutput.push(a);
}

function testB(a){
	gotOutput.push(a);
}

var expectedOutput = '4422|4422|4422';
var gotOutput = [];

var abc = new CustomClass();

var NewEventName = 0;
abc.on('event.new.name', function(){NewEventName++});

var NewEvent = 0;
abc.on('event.new.callback', function(){NewEvent++});

var EventDeleted = 0;
abc.on('event.deleted', function(){EventDeleted++});

var EventEmitted = 0;
abc.on('*', function(){EventEmitted++});

abc.on('test1 test2', testA);
abc.on('test3 test4', testA);
abc.once('test3 test4', testA);
abc.off('test1 test3', testA);

abc.on('test1 test2', testB);
abc.on('test3 test4', testB);
abc.once('test3 test4', testB);
abc.off('test1 test3', testB);

abc.emit('test4', 4);
abc.emit('test3', 3);
abc.emit('test2', 2);
abc.emit('test1', 1);

gotOutput.push('|');

abc.emit('test4', 4);
abc.emit('test3', 3);
abc.emit('test2', 2);
abc.emit('test1', 1);

gotOutput.push('|');

abc.emit('test4', 4);
abc.emit('test3', 3);
abc.emit('test2', 2);
abc.emit('test1', 1);

abc.off('*');
abc.off();

gotOutput = gotOutput.join('');
console.log("Expected:", expectedOutput);
console.log("Got:", gotOutput);

console.log("Success:", expectedOutput === gotOutput);


console.log("event.new.name ->", NewEventName);
console.log("event.new.callback ->", NewEvent);
console.log("event.deleted ->", EventDeleted);
console.log("* ->", EventEmitted);