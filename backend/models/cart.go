package models

type Cart struct {
	UserID    uint `gorm:"primaryKey"`
	ProductID uint `gorm:"primaryKey"`
	Quantity  int
}