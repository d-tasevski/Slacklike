package main

import (
	"github.com/mitchellh/mapstructure"
	db "gopkg.in/rethinkdb/rethinkdb-go.v5"
)

// ChannelStop,UserStop,MessageStop : ids for stopping goroutines
const (
	ChannelStop = iota
	UserStop
	MessageStop
)

func createChannel(client *Client, data interface{}) {
	var channel Channel
	if err := mapstructure.Decode(data, &channel); err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	go func() {
		if err := db.Table("channel").Insert(channel).Exec(client.session); err != nil {
			client.send <- Message{"error", err.Error()}
		}
	}()

}

func subscribeChannel(client *Client, data interface{}) {
	cursor, err := db.Table("channel").Changes(db.ChangesOpts{IncludeInitial: true}).Run(client.session)
	stop := client.NewStopchannel(ChannelStop)
	result := make(chan db.ChangeResponse)

	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}

	go func() {
		var change db.ChangeResponse
		for cursor.Next(&change) {
			result <- change
		}
	}()

	go func() {
		for {
			select {
			case <-stop:
				cursor.Close()
				return
			case change := <-result:
				if change.NewValue != nil && change.OldValue == nil {
					client.send <- Message{"create-channel", change.NewValue}
				}

			}
		}
	}()
}

func unsubscribeChannel(client *Client, data interface{}) {
	client.StopForKey(ChannelStop)
}
