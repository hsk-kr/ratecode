package utils

import (
	"fmt"
	"math/rand/v2"
	"slices"
)

func GenerateCodeUuid(language string) string {
	uuid := language + "-"
	eachPartLength := 6
	alphaRange := int('z' - 'a')

	for range eachPartLength {
		uuid = fmt.Sprintf("%s%c", uuid, (rand.IntN(alphaRange+1) + 'a'))
	}

	for range eachPartLength {
		uuid = fmt.Sprintf("%s%d", uuid, rand.IntN(10))
	}

	return uuid
}

func IsSupportedLanguage(language string) bool {
	languages := []string{
		"text",
		"typescript",
		"javascript",
		"golang",
		"rust",
		"python",
		"java",
		"kotlin",
		"csharp",
		"html",
		"c_cpp",
		"ruby",
		"php",
		"lua",
	}

	return slices.Contains(languages, language)
}
