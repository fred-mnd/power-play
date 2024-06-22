package controller

import (
	"net/http"

	"main/database"
	"main/models"

	"github.com/gin-gonic/gin"
)

type FilterResponse struct {
	Category string
	Filters  []FilterDetails
}

type FilterDetails struct {
	ID         uint
	Name       string
	FilterType string
	Options    []models.FilterOption
}

func GetFilters(c *gin.Context) {
	db := database.GetInstance()

	var filters []models.FilterName
	db.Preload("ProductType").Find(&filters)

	filterMap := make(map[string][]FilterDetails)
	generalFilters := make(map[uint]bool)

	for _, filter := range filters {
		if len(filter.ProductType) > 1 {
			generalFilters[filter.ID] = true
			addFilterToCategory("General", filter, &filterMap)
			continue
		}

		for _, productType := range filter.ProductType {
			addFilterToCategory(productType.Name, filter, &filterMap)
		}
	}

	var response []FilterResponse
	categoryOrder := []string{"General", "Mouse", "Keyboard"}

	for _, category := range categoryOrder {
		if filters, exists := filterMap[category]; exists {
			response = append(response, FilterResponse{
				Category: category,
				Filters:  filters,
			})
		}
	}

	c.JSON(http.StatusOK, response)
}

func addFilterToCategory(category string, filter models.FilterName, filterMap *map[string][]FilterDetails) {
	db := database.GetInstance()
	filterDetails := FilterDetails{
		ID:         filter.ID,
		Name:       filter.Name,
		FilterType: filter.FilterType,
	}

	if filter.FilterType == "options" {
		var options []models.FilterOption
		db.Where("filter_id = ?", filter.ID).Find(&options)
		filterDetails.Options = options
	}

	(*filterMap)[category] = append((*filterMap)[category], filterDetails)
}
