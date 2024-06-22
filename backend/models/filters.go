package models

import "gorm.io/gorm"

type FilterName struct {
	gorm.Model
	Name string
	FilterType string `gorm:"type:enum('boolean', 'options')"`
	ProductType[] Type `gorm:"many2many:filter_product_type"`
}

type FilterOption struct {
	gorm.Model
    FilterID int
    OptionValue string
}

type ProductFilterValue struct {
	gorm.Model
    ProductID int
    FilterID  int
    Value     string
    Product   Product `gorm:"foreignKey:ProductID"`
    Filter    FilterName  `gorm:"foreignKey:FilterID"`
}