package main

import (
	"main/models"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	models.Migrate()

	r.Run(":8080")
}