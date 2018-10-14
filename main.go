package main

import (
	"log"
	"net/http"

	db "gopkg.in/rethinkdb/rethinkdb-go.v5"
)

// Channel : representation of the channel
type Channel struct {
	ID   string `json:"id" gorethink:"id,omitempty"`
	Name string `json:"name" gorethink:"name"`
}

// User : representation of the user
type User struct {
	ID   string `gorethink:"id,omitempty"`
	Name string `gorethink:"name"`
}

func main() {
	session, err := db.Connect(db.ConnectOpts{
		Address:  "localhost:28015",
		Database: "slacklike",
	})
	if err != nil {
		log.Panic(err.Error())
	}
	router := NewRouter(session)

	router.Handle("create-channel", createChannel)
	router.Handle("subscribe-channel", subscribeChannel)
	router.Handle("unsubscribe-channel", unsubscribeChannel)
	http.Handle("/", router)
	http.ListenAndServe(":4000", nil)
}
