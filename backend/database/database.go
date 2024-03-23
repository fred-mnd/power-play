package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func GetInstance() *gorm.DB {
	if(db == nil) {
		db = connect()
	}
	
	return db
}

func connect() *gorm.DB {
	dsn := "root:@tcp(127.0.0.1:3306)/power_play?charset=utf8mb4&parseTime=True&loc=Local"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	return db
}
