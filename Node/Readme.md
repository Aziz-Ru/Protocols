# Websocket

WebSocket is a computer communications protocol, providing a simultaneous two-way communication channel over a single Transmission Control Protocol connection.

The WebSocket API provides two alternative mechanisms for creating and using web socket connections: the WebSocket interface and the WebSocketStream interface.

The WebSocket interface is stable and has good browser and server support. However it doesn't support backpressure. As a result, when messages arrive faster than the application can process them it will either fill up the device's memory by buffering those messages, become unresponsive due to 100% CPU usage, or both.

The WebSocketStream is a Promise-based alternative to WebSocket

## interfaces

### WebSocket

    The primary interface for connecting to a WebSocket server and then sending and receiving data on the connection.

### CloseEvent

    The event sent by the WebSocket object when the connection closes.

### MessageEvent

    The event sent by the WebSocket object when a message is received from the server.

## api

### constructor

- websocket()

Returns a newly created WebSocket object.

# Instance properties

- WebSocket.binaryType

  The binary data type used by the connection.

- WebSocket.bufferedAmount (Read only)

  The number of bytes of queued data.

- WebSocket.extensions (Read only)

  The extensions selected by the server.

- WebSocket.protocol (Read only)

  The sub-protocol selected by the server.

- WebSocket.readyState (Read only)

  The current state of the connection.

- WebSocket.url Read only

  The absolute URL of the WebSocket.

### Instance methods

- WebSocket.close()

  Closes the connection.

- WebSocket.send()

  Enqueues data to be transmitted.

### Events

- close

  Fired when a connection with a WebSocket is closed. Also available via the onclose property

- error

Fired when a connection with a WebSocket has been closed because of an error, such as when some data couldn't be sent. Also available via the onerror property.

- message event

Fired when data is received through a WebSocket. Also available via the onmessage property.

- open event

Fired when a connection with a WebSocket is opened. Also available via the onopen property.

```
// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});

```
