package controller

import (
	"main/database"
	"main/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddToCart(c *gin.Context){
	db := database.GetInstance()

	var input models.Cart

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var cart models.Cart

	if db.Where("user_id = ?", input.UserID).Where("product_id = ?", input.ProductID).Find(&cart).RowsAffected == 0 {
		db.Create(&input)
	} else{
		cart.Quantity += input.Quantity
		db.Save(&cart)
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}

func GetCart(c *gin.Context){
	db := database.GetInstance()

	userID := c.Param("id");

	type CartProduct struct{
		models.Product
		Quantity int
	}

	type Cart struct{
		TotalPrice int
		Products []CartProduct
	}

	carts := Cart{
		TotalPrice: 0,
	}

	db.Table("products").Select("products.*, quantity").
	Joins("join carts on carts.product_id = products.id").
	Where("carts.user_id = ?", userID).
	Scan(&carts.Products)

	for _, prod := range carts.Products {
		carts.TotalPrice += prod.Price * prod.Quantity
	}

	c.JSON(http.StatusOK, carts)
}