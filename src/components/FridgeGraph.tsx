import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const FridgeGraph = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  
  const ingredients = [
    { name: "계란", position: { x: 15, y: 25 }, status: "danger" },
    { name: "버터", position: { x: 35, y: 20 }, status: "warning" },
    { name: "마늘", position: { x: 75, y: 30 }, status: "fresh" },
    { name: "김치", position: { x: 25, y: 55 }, status: "warning" },
    { name: "양파", position: { x: 65, y: 60 }, status: "fresh" }
  ];

  const getStatusColor = (status: string, isSelected: boolean = false) => {
    const selectedClass = isSelected ? "ring-2 ring-primary ring-offset-2 scale-110" : "";
    switch (status) {
      case "danger": return `bg-danger text-white ${selectedClass}`;
      case "warning": return `bg-warning text-white ${selectedClass}`;
      case "fresh": return `bg-fresh text-white ${selectedClass}`;
      default: return `bg-muted text-foreground ${selectedClass}`;
    }
  };

  const handleIngredientClick = (ingredientName: string) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(selectedIngredients.filter(name => name !== ingredientName));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };

  const handleDragSearch = () => {
    if (selectedIngredients.length > 0) {
      toast({
        title: "메뉴 검색",
        description: `${selectedIngredients.join(", ")}로 만들 수 있는 메뉴를 찾고 있습니다.`,
      });
    } else {
      toast({
        title: "재료 선택",
        description: "먼저 재료를 선택해주세요.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="mx-4 mb-6">
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <h2 className="text-xl font-bold mb-4 text-center">공육공육공 님의 냉장고</h2>
        
        {/* 그라데이션 바 */}
        <div className="h-2 bg-gradient-freshness rounded-full mb-6"></div>
        
        {/* 재료 배치 영역 */}
        <div className="relative h-32 bg-gradient-card rounded-xl">
          {ingredients.map((ingredient, index) => (
            <button
              key={index}
              onClick={() => handleIngredientClick(ingredient.name)}
              className={`absolute px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer hover:scale-105 ${getStatusColor(ingredient.status, selectedIngredients.includes(ingredient.name))}`}
              style={{
                left: `${ingredient.position.x}%`,
                top: `${ingredient.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {ingredient.name}
            </button>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <button 
            onClick={handleDragSearch}
            className="text-muted-foreground text-sm px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            {selectedIngredients.length > 0 ? `${selectedIngredients.join(", ")}로 메뉴 검색` : "재료를 선택해서 메뉴 검색하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FridgeGraph;