package models

import (
	"regexp"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name        string
	Email       string
	PhoneNumber string
	Password    string
	Address     string
	CartProducts []Product `gorm:"many2many:carts"`
	Transactions []Transaction
	Money       uint
}

type Seller struct {
	Username string
	Password string
}

func IsValidEmail(email string) bool {
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$`)
	return emailRegex.MatchString(email)
}
