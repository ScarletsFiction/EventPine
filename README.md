<a href='https://patreon.com/stefansarya'><img src='https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2Fstefansarya%2Fpledges&style=for-the-badge' height='20'></a>
[![Software License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)
[![](https://data.jsdelivr.com/v1/package/npm/eventpine/badge)](https://www.jsdelivr.com/package/npm/eventpine)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=EventPine%20is%20a%20simple%20extendable%20event%20emitter%20class&url=https://github.com/ScarletsFiction/EventPine&via=github&hashtags=eventpine,browser,node,deno)

# EventPine
A simple extendable event emitter class for Deno, Node, and Browser.

### Getting Started
Before we start to use EventPine we need to import it first.

#### Deno
Put this on your first line
```js
import 'https://cdn.jsdelivr.net/npm/eventpine@1.0.2';
```

#### Node
Add the module using package manager
```sh
$ npm i eventpine
```

Then import it to your script
```js
let EventPine = require('eventpine');
```

#### Browser
Put this on HTML `<head>`
```xml
<script src="https://cdn.jsdelivr.net/npm/eventpine@1.0.2"></script>
```

### How to use
EventPine have 4 main function and it can be extended with your class.

```js
// Custom class with EventPine
class MyCustom extends EventPine{
  constructor(){
    // Init my custom class (optional)
  }
}

// Create with your class
var obj = new MyCustom();

// Or just create from the root
var obj = new EventPine();

// The next section also use this 'obj'
```

### On
Listen to an event.

```js
obj.on('message' /* EventName */, function(data1, data2){
  // Do something
});
```

### Once
Listen to an event then remove it after being called.

```js
obj.once('message' /* EventName */, function(data1, data2){
  // Do something once
});
```

### Off
Remove event listener registered by on/once.

```js
obj.off('message' /* EventName */, Function /* Optional */);
```

If the second argument was empty, every callback related to this EventName will be removed.

### Emit
Emit to events that was registered.

```js
obj.emit('message' /* EventName */, 'data1', 'data2', ...);
```

## Contribution
If you want to help in EventPine please fork this project and edit on your repository, then make a pull request to here. Otherwise, you can help with donation via [patreon](https://www.patreon.com/stefansarya).

But don't forget to put a link to this repository, or share it maybe.

## License
EventPine is under the MIT license.