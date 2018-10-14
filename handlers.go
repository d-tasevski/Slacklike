package main

import (
	"fmt"

	"github.com/mitchellh/mapstructure"
)

func createChannel(client *Client, data interface{}) {
	var channel Channel
	var message Message
	mapstructure.Decode(data, &channel)
	fmt.Printf("%#v\n", channel)
	channel.ID = "2"
	message.Name = "create-channel"
	message.Data = channel

	client.send <- message
}
