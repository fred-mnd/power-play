package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name        string
	Email       string
	PhoneNumber string
	Password    string
	Address     string
	CartProducts []Product `gorm:"many2many:carts"`
	Transactions []Transaction
	Money       int
}

type Seller struct {
	Username string
	Password string
}
