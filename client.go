package main

import (
	"github.com/gorilla/websocket"
	db "gopkg.in/rethinkdb/rethinkdb-go.v5"
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
	send         chan Message
	socket       *websocket.Conn
	findHandler  FindHandler
	session      *db.Session
	stopChannels map[int]chan bool
}

// NewStopchannel : Subscription handler
func (client *Client) NewStopchannel(stopKey int) chan bool {
	client.StopForKey(stopKey)
	stop := make(chan bool)
	client.stopChannels[stopKey] = stop
	return stop
}

// StopForKey : check if channel is unsubscribed
func (client *Client) StopForKey(key int) {
	if ch, found := client.stopChannels[key]; found {
		ch <- true
		delete(client.stopChannels, key)
	}
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

// Close : clear all processes after closing browser
func (client *Client) Close() {
	for _, ch := range client.stopChannels {
		ch <- true
	}
	close(client.send)
}

// NewClient : creates new instance of the client
func NewClient(socket *websocket.Conn, findHandler FindHandler, session *db.Session, stopChannels map[int]chan bool) *Client {
	return &Client{
		send:         make(chan Message),
		socket:       socket,
		findHandler:  findHandler,
		session:      session,
		stopChannels: make(map[int]chan bool),
	}
}
