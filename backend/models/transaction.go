package models

import (
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model
	TransactionDate time.Time
	UserID          uint
	Products        []Product `gorm:"many2many:transaction_details"`
	Status        string
}

type TransactionDetails struct {
	TransactionID uint `gorm:"primaryKey"`
	ProductID     uint `gorm:"primaryKey"`
	Quantity      int
}
