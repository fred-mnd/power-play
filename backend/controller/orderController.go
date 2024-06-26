package controller

import (
	"main/database"
	"main/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func AddOrder(c *gin.Context){
	db := database.GetInstance()

	userID := c.Param("id");

	var user models.User

	db.Find(&user, userID)

	type Cart struct{
		ProductID uint
		Quantity int
	}

	var cart []Cart

	db.Raw("select product_id, quantity from carts where user_id = ?", userID).Scan(&cart)

	uid, _ := strconv.ParseUint(userID, 10, 32)

	tran := models.Transaction{
		TransactionDate: time.Now(),
		UserID: uint(uid),
		Status: "Processed",
	}

	db.Create(&tran)

	for _, c := range cart {
		db.Exec("delete from carts where user_id = ? and product_id = ?", userID, c.ProductID)
		det := models.TransactionDetails{
			TransactionID: tran.ID,
			ProductID: c.ProductID,
			Quantity: c.Quantity,
		}
		db.Create(&det)
	}

	c.JSON(http.StatusOK, nil)
}

func GetOrder(c *gin.Context){
	db := database.GetInstance()

	userID := c.Param("id")

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

	var tran []models.Transaction

	type Order struct{
		models.Product
		Quantity int
		Status string
		TransactionDate time.Time
	}


	var orders []Order

	db.Preload("Products").Where("user_id = ?", userID).Order("transaction_date desc").Find(&tran)

	for _, t := range tran {
		for _, p := range t.Products {
			var Quantity int
			db.Model(&models.TransactionDetails{}).Select("quantity").Where("transaction_id = ?", t.ID).
			Where("product_id = ?", p.ID).Scan(&Quantity)
			orders = append(orders, Order{
				Product: p,
				Quantity: Quantity,
				Status: t.Status,
				TransactionDate: t.TransactionDate,
			})
		}
	}

	var user models.User
	db.First(&user, userID)
	user.Money -= uint(carts.FinalPrice)
	db.Save(&user)

	c.JSON(http.StatusOK, orders)
}