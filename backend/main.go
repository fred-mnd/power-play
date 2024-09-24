package main

import (
	"main/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	r.POST("/register", controller.Register)
	r.GET("/validate", controller.GetUserFromJWT)
	r.POST("/login", controller.LoginHandler)
	r.GET("/logout", controller.LogoutHandler)

	user := r.Group("/users")
	{
		user.GET("/:id", controller.GetUser)
		user.PUT("/update/:id", controller.UpdateProfileHandler)
		user.POST("/topup/:id", controller.TopUpHandler)
	}

	prod := r.Group("/products")
	{
		prod.GET("/get-all", controller.GetAllProduct)
		prod.GET("/get-product/:id", controller.GetProduct)
		prod.GET("/get-specs/:id", controller.GetSpecs)
	}

	filters := r.Group("/filters")
	{
		filters.GET("/get-all", controller.GetFilters)
	}

	carts := r.Group("/carts")
	{
		carts.POST("/add-to-cart", controller.AddToCart)
		carts.GET("/get-cart/:id", controller.GetCart)
		carts.PUT("/update/:user_id/:product_id", controller.UpdateCartItem)
		carts.DELETE("/delete/:user_id/:product_id", controller.DeleteFromCart)
	}

	orders := r.Group("/orders")
	{
		orders.GET("/add-order/:id", controller.AddOrder)
		orders.GET("/get-order/:id", controller.GetOrder)
		orders.GET("/get-complete-order/:id", controller.GetCompleteOrder)
		orders.GET("/complete/:id", controller.CompleteOrder)
	}
	
	admin := r.Group("/admin")
	{
		admin.GET("/get-orders", controller.GetOrderForAdmin)
		admin.GET("/update/:id", controller.ChangeStatus)
	}

	r.Run(":8000")
}
