import { useState } from "react";
import { Search, Clock, Users, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Recipe {
  id: string;
  name: string;
  cookTime: string;
  servings: string;
  difficulty: "쉬움" | "보통" | "어려움";
  rating: number;
  ingredients: string[];
  availableIngredients: string[];
  missingIngredients: string[];
  category: string;
  image?: string;
}

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const recipes: Recipe[] = [
    {
      id: "1",
      name: "된장찌개",
      cookTime: "30분",
      servings: "4인분",
      difficulty: "쉬움",
      rating: 4.5,
      ingredients: ["된장", "두부", "애호박", "양파", "마늘"],
      availableIngredients: ["양파", "마늘"],
      missingIngredients: ["된장", "두부", "애호박"],
      category: "찌개/국물"
    },
    {
      id: "2",
      name: "간장계란밥",
      cookTime: "10분",
      servings: "1인분",
      difficulty: "쉬움",
      rating: 4.2,
      ingredients: ["계란", "밥", "간장", "참기름", "김"],
      availableIngredients: ["계란"],
      missingIngredients: ["간장", "참기름", "김"],
      category: "밥/면"
    },
    {
      id: "3",
      name: "알리오 파스타",
      cookTime: "15분",
      servings: "2인분",
      difficulty: "보통",
      rating: 4.7,
      ingredients: ["파스타면", "마늘", "올리브오일", "페페론치노", "파슬리"],
      availableIngredients: ["마늘"],
      missingIngredients: ["파스타면", "올리브오일", "페페론치노", "파슬리"],
      category: "밥/면"
    },
    {
      id: "4",
      name: "김치볶음밥",
      cookTime: "20분",
      servings: "2인분",
      difficulty: "쉬움",
      rating: 4.3,
      ingredients: ["김치", "밥", "계란", "참기름", "김"],
      availableIngredients: ["김치", "계란"],
      missingIngredients: ["참기름", "김"],
      category: "밥/면"
    },
    {
      id: "5",
      name: "버터마늘구이",
      cookTime: "15분",
      servings: "2인분",
      difficulty: "쉬움",
      rating: 4.1,
      ingredients: ["버터", "마늘", "소금", "후추"],
      availableIngredients: ["버터", "마늘"],
      missingIngredients: ["소금", "후추"],
      category: "반찬"
    }
  ];

  const categories = ["전체", "찌개/국물", "밥/면", "반찬", "간식"];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "전체" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "쉬움": return "bg-fresh text-white";
      case "보통": return "bg-warning text-white";
      case "어려움": return "bg-danger text-white";
      default: return "bg-muted text-foreground";
    }
  };

  const getMatchPercentage = (recipe: Recipe) => {
    const total = recipe.ingredients.length;
    const available = recipe.availableIngredients.length;
    return Math.round((available / total) * 100);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 py-4 bg-card/80 backdrop-blur-sm border-b border-border">
        <h1 className="text-xl font-bold mb-3">레시피</h1>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="레시피 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl border-0 bg-muted/50"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Recipes List */}
      <div className="px-4 py-4 space-y-4">
        {filteredRecipes.map((recipe) => {
          const matchPercentage = getMatchPercentage(recipe);
          
          return (
            <Card key={recipe.id} className="p-4 shadow-soft">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{recipe.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.cookTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recipe.servings}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      {recipe.rating}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                  <div className="mt-1">
                    <span className={`text-sm font-bold ${matchPercentage >= 70 ? 'text-fresh' : matchPercentage >= 40 ? 'text-warning' : 'text-danger'}`}>
                      {matchPercentage}% 일치
                    </span>
                  </div>
                </div>
              </div>

              {/* Available Ingredients */}
              {recipe.availableIngredients.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm font-medium text-fresh mb-1">보유 재료:</p>
                  <div className="flex flex-wrap gap-1">
                    {recipe.availableIngredients.map((ingredient, index) => (
                      <Badge key={index} className="bg-fresh-light text-fresh border border-fresh text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Ingredients */}
              {recipe.missingIngredients.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-muted-foreground mb-1">필요 재료:</p>
                  <div className="flex flex-wrap gap-1">
                    {recipe.missingIngredients.map((ingredient, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button className="w-full rounded-xl" variant="outline">
                레시피 보기
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Recipes;