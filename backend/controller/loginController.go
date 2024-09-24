package controller

import (
	"fmt"
	"main/database"
	models "main/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func LoginHandler(c *gin.Context) {
	type UserInput struct {
		Email string
		Pass  string
	}

	var input UserInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please input email!"})
		return
	}

	db := database.GetInstance()

	var user models.User

	if db.Where("email = ?", input.Email).Find(&user).RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You haven't registered yet!"})
		return
	}

	if input.Pass == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please input password!"})
		return
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Pass)) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wrong password!"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 15).Unix(),
		"typ": 0,
	})

	tokenString, err := token.SignedString([]byte("qwertyuiop"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("auth", tokenString, 3600*24*15, "/", "localhost", false, false)

	c.JSON(http.StatusOK, user)

}

func GetUserFromJWT(c *gin.Context) {
	db := database.GetInstance()
	tokenString, err := c.Cookie("auth")

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No token found"})
		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("qwertyuiop"), nil
	})

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to parse token"})
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		exp, ok := claims["exp"].(float64)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			return
		}

		if float64(time.Now().Unix()) > exp {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token has expired"})
			return
		}

		sub, ok := claims["sub"].(float64)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			return
		}

		var user models.User
		if err := db.First(&user, uint(sub)).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			return
		}

		c.JSON(http.StatusOK, user)
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
	}
}

func LogoutHandler(c *gin.Context) {
	c.SetCookie("auth", "", -1, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}
