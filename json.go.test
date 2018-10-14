package main

import (
	"encoding/json"
	"fmt"

	"github.com/mitchellh/mapstructure"
)

type Message struct {
	Name string      `json:"name"`
	Data interface{} `json:"data"`
}

type Channel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func main() {
	recRawMsg := []byte(`{"name": "create-channel", "data": {"name": "React"}}`)
	var recMessage Message
	err := json.Unmarshal(recRawMsg, &recMessage)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("%#v\n", recMessage)

	if recMessage.Name == "create-channel" {
		channel, err := createChannel(recMessage.Data)
		var sendMessage Message
		sendMessage.Name = "create-channel"
		sendMessage.Data = channel
		sendRawMsg, err := json.Marshal(sendMessage)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Printf(string(sendRawMsg))
	}
}

func createChannel(data interface{}) (Channel, error) {
	var channel Channel
	err := mapstructure.Decode(data, &channel)
	if err != nil {
		return channel, err
	}

	channel.Id = "1"
	fmt.Printf("%#v\n", channel)
	return channel, nil
}
