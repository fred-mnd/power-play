package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name        string
	Desc        string
	Price       int
	ProductType []Type `gorm:"many2many:product_type"`
	ImgUrl string
}
