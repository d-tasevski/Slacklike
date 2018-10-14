package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
	db "gopkg.in/rethinkdb/rethinkdb-go.v5"
)

// Handler : representation of the handler func
type Handler func(*Client, interface{})

// Router : representation of the Router
type Router struct {
	rules   map[string]Handler
	session *db.Session
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// NewRouter : Creates new Router instance
func NewRouter(session *db.Session) *Router {
	return &Router{
		rules:   make(map[string]Handler),
		session: session,
	}
}

func (e *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	socket, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, err.Error())
		return
	}

	client := NewClient(socket, e.FindHandler, e.session)
	go client.Write()
	client.Read()
	client.Close()
}

// Handle : routes handler
func (e *Router) Handle(msgName string, handler Handler) {
	e.rules[msgName] = handler
}
