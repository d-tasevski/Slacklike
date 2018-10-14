package main

import (
	"net/http"
)

// Channel : representation of the channel
type Channel struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func main() {
	router := NewRouter()

	router.Handle("create-channel", createChannel)

	http.Handle("/", router)
	http.ListenAndServe(":4000", nil)
}
