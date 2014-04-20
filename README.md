# event-source-writer
create a server-sent events (EventSource) compatible stream

Unlike some other modules, this doesn't do anything with HTTP or any other
transport. Rather, it lets you serialize events to a Readable stream. For
example, you might choose to pipe it to logs or HTTP or what have you.


## install
```console
$ npm install event-source-writer
```

## usage
```js
var EventSourceWriter = require('event-source-writer')

var source = new EventSourceWriter()

source.pipe(process.stdout)

source.dispatchEvent({type: 'keypress', keyCode: 72})
source.dispatchEvent({type: 'keypress', keyCode: 73})
source.dispatchEvent({type: 'keypress', keyCode: 13})
source.end()
```
outputs the events serialized as specified in the [Server-Sent Events spec][]

```console


event: keypress
data: {"keyCode":72}

event: keypress
data: {"keyCode":73}

event: keypress
data: {"keyCode":13}


:end

```


## notes
`event-source-writer` will emit a keepalive to the stream every 10 seconds.
This helps prevent some systems from closing connections before the stream
has ended.


## Static functions

### `EventSourceWriter.serialize(Object) => String`

If object has a `type` property, it will be serialized as an `event`;
otherwise, it will be serialized as a `message` event

Example:
```js
EventSourceWriter.serialize({type: 'coffeeready', time: 'now'})
// => 
// event: coffeeready
// data: {"time":"now"}
//
```

## `EventSourceWriter.comment(String) => String`

Creates a comment (line starting with `:`) and ensures there are no
extraneous linefeeds.


## License
Copyright © MMXIV Jason Denizac <jason@denizac.org> jden
Licensed under the MIT license (see LICENSE.md)



[Server-Sent Events spec]: http://dev.w3.org/html5/eventsource/