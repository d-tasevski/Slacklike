package main

import (
	"github.com/gorilla/websocket"
)

// FindHandler : handler representation
type FindHandler func(string) (Handler, bool)

// Message : representation of the channel message
type Message struct {
	Name string      `json:"name"`
	Data interface{} `json:"data"`
}

// Client : representation of the client routine
type Client struct {
	send        chan Message
	socket      *websocket.Conn
	findHandler FindHandler
}

// Write : client write handler
func (client *Client) Write() {
	for msg := range client.send {
		if err := client.socket.WriteJSON(msg); err != nil {
			break
		}
	}
	client.socket.Close()
}

// Read : client read handler
func (client *Client) Read() {
	var message Message
	for {
		if err := client.socket.ReadJSON(&message); err != nil {
			break
		}
		if handler, found := client.findHandler(message.Name); found {
			handler(client, message.Data)
		}
	}
	client.socket.Close()
}

// FindHandler : finds correct handler for the route
func (r *Router) FindHandler(msgName string) (Handler, bool) {
	handler, found := r.rules[msgName]
	return handler, found
}

// NewClient : creates new instance of the client
func NewClient(socket *websocket.Conn, findHandler FindHandler) *Client {
	return &Client{
		send:        make(chan Message),
		socket:      socket,
		findHandler: findHandler,
	}
}
