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

	c.JSON(http.StatusOK, gin.H{"message": "Item added to cart successfully"})
}

func GetCart(c *gin.Context){
	db := database.GetInstance()

	userID := c.Param("id");

	type CartProduct struct{
		models.Product
		Quantity int
		TotalPrice int
	}

	type Cart struct{
		TotalPrice int
		ShippingFee int
		FinalPrice int
		Products []CartProduct
	}

	carts := Cart{
		TotalPrice: 0,
		ShippingFee: 11, 
	}

	db.Table("products").Select("products.*, quantity").
	Joins("join carts on carts.product_id = products.id").
	Where("carts.user_id = ?", userID).
	Scan(&carts.Products)

	for i, prod := range carts.Products {
		totalPrice := prod.Price * prod.Quantity
		carts.Products[i].TotalPrice = totalPrice
		carts.TotalPrice += totalPrice
	}

	carts.FinalPrice = carts.TotalPrice + carts.ShippingFee

	c.JSON(http.StatusOK, carts)
}

func DeleteFromCart(c *gin.Context) {
	db := database.GetInstance()

	userID := c.Param("user_id")
	productID := c.Param("product_id")

	var cart models.Cart

	if db.Where("user_id = ?", userID).Where("product_id = ?", productID).First(&cart).RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found in the cart"})
		return
	}

	db.Delete(&cart)

	c.JSON(http.StatusOK, gin.H{"message": "Item deleted from cart successfully"})
}

func UpdateCartItem(c *gin.Context) {
	db := database.GetInstance()

	userID := c.Param("user_id")
	productID := c.Param("product_id")

	var input models.Cart
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var cart models.Cart
	if db.Where("user_id = ?", userID).Where("product_id = ?", productID).First(&cart).RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found in the cart"})
		return
	}

	cart.Quantity = input.Quantity
	db.Save(&cart)

	c.JSON(http.StatusOK, gin.H{"message": "Item updated successfully"})
}
