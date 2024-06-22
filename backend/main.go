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
	}

	orders := r.Group("/orders")
	{
		orders.GET("/add-order/:id", controller.AddOrder)
		orders.GET("/get-order/:id", controller.GetOrder)
	}

	r.Run(":8000")
}