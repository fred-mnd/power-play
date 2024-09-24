package controller

import (
	"main/database"
	"main/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllProduct(c *gin.Context){
	db := database.GetInstance()

	var products []models.Product
	filterParams := c.Request.URL.Query()
	if len(filterParams) == 0 {
		db.Find(&products)
	} else {
		query := db.Model(&models.Product{}).Distinct()

		for key, values := range filterParams {
			for _, value := range values {
				subquery := db.Model(&models.ProductFilterValue{}).
					Select("product_id").
					Where("filter_id = ? AND value = ?", key, value)
				query = query.Where("products.id IN (?)", subquery)
			}
		}
		query.Find(&products)
	}
	c.JSON(http.StatusOK, products)
}

func GetProduct(c *gin.Context){
	db := database.GetInstance()

	productID := c.Param("id")

	var product models.Product

	db.Preload("ProductType").Find(&product, productID)

	c.JSON(http.StatusOK, product)
}

func GetSpecs(c *gin.Context){
	db := database.GetInstance()

	productID := c.Param("id")

	type ProductSpec struct{
		FilterName string
		FilterType string
		FilterValue string
	}

	var spec []ProductSpec

	query := "select name as filter_name, filter_type, value as filter_value " +
			"from product_filter_values pfv " +
			"join filter_names fn on fn.id = pfv.filter_id " + 
			"where product_id = ?"
	db.Raw(query, productID).Scan(&spec)

	c.JSON(http.StatusOK, spec)

}