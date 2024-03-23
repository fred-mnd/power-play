package models

import "main/database"

func Migrate() {
	db := database.GetInstance()

	// db.Migrator().DropTable(&User{})
	// db.Migrator().DropTable(&Cart{})
	// db.Migrator().DropTable()
	db.SetupJoinTable(&User{}, "CartProducts", &Cart{})
	db.SetupJoinTable(&Transaction{}, "Products", &TransactionDetails{})
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Type{})
	db.AutoMigrate(&Product{})
	db.AutoMigrate(&MouseFilter{})
	db.AutoMigrate(&KeyboardFilter{})
	db.AutoMigrate(&Seller{})
	db.AutoMigrate(&Transaction{})
}
