package models

type MouseFilter struct {
	ProductID   uint `gorm:"primaryKey"`
	Product     Product
	SilentClick bool
	Size        string
}

type KeyboardFilter struct {
	ProductID uint `gorm:"primaryKey"`
	Product   Product
	TenKey    bool
	Backlit   bool
}
