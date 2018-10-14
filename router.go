package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

// Handler : representation of the handler func
type Handler func(*Client, interface{})

// Router : representation of the Router
type Router struct {
	rules map[string]Handler
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// NewRouter : Creates new Router instance
func NewRouter() *Router {
	return &Router{
		rules: make(map[string]Handler),
	}
}

func (e *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	socket, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, err.Error())
		return
	}

	client := NewClient(socket, e.FindHandler)
	go client.Write()
	client.Read()

}

// Handle : routes handler
func (e *Router) Handle(msgName string, handler Handler) {
	e.rules[msgName] = handler
}
