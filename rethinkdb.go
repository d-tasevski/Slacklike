package main

import (
	"fmt"
	"log"

	r "gopkg.in/rethinkdb/rethinkdb-go.v5"
)

// User1 : user type
type User1 struct {
	ID   string `gorethink:"id,omitempty"`
	Name string `gorethink:"name"`
}

// Example : just an example
func Example() {
	session, err := r.Connect(r.ConnectOpts{
		Address:  "localhost:28015", // endpoint without http
		Database: "slacklike",
	})
	if err != nil {
		log.Fatalln(err)
		return
	}
	user := User{
		Name: "anonymous",
	}

	response, err := r.Table("user").Insert(user).RunWrite(session)
	if err != nil {
		log.Fatalln(err)
		return
	}
	fmt.Printf("%#v\n", response)

	res, err := r.Expr("Hello World").Run(session)
	if err != nil {
		log.Fatalln(err)
		return
	}

	var hwResponse string
	err = res.One(&hwResponse)
	if err != nil {
		log.Fatalln(err)
		return
	}

	fmt.Println(response)

	// Output:
	// Hello World
}
