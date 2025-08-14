import { useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const MenuRecommendations = () => {
  const [selectedFilter, setSelectedFilter] = useState("유통기한순");
  
  const recommendations = [
    {
      name: "된장찌개",
      category: "유통기한 임박순",
      warning: "애호박, 된장 재료가 꼭 필요해요!",
      ingredients: "치킨스톡 재료가 있으면 더 좋아요!",
      bgColor: "bg-danger-light",
      borderColor: "border-l-danger"
    },
    {
      name: "간장계란밥",
      category: "재료 빈도 순",
      ingredients: "참기름 재료가 있으면 더 좋아요!",
      bgColor: "bg-primary/5",
      borderColor: "border-l-primary"
    },
    {
      name: "알리오 파스타",
      category: "알리오 파스타",
      ingredients: "파슬리 재료가 있으면 더 좋아요!",
      bgColor: "bg-primary/5",
      borderColor: "border-l-primary"
    }
  ];

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    toast({
      title: "필터 변경",
      description: `${filter}로 정렬되었습니다.`,
    });
  };

  const handleRecipeClick = (recipeName: string) => {
    toast({
      title: "레시피 선택",
      description: `${recipeName} 레시피를 확인합니다.`,
    });
  };

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">메뉴 추천</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => handleFilterClick("유통기한순")}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${selectedFilter === "유통기한순" ? "bg-danger-light text-danger" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            유통기한순
          </button>
          <button 
            onClick={() => handleFilterClick("빈도순")}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${selectedFilter === "빈도순" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            빈도순
          </button>
          <button 
            onClick={() => handleFilterClick("즐겨찾는순")}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${selectedFilter === "즐겨찾는순" ? "bg-fresh-light text-fresh border-fresh" : "bg-muted text-muted-foreground border-muted hover:bg-muted/80"}`}
          >
            즐겨찾는순
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((item, index) => (
          <Card 
            key={index} 
            onClick={() => handleRecipeClick(item.name)}
            className={`p-4 ${item.bgColor} border-l-4 ${item.borderColor} border-y-0 border-r-0 shadow-soft cursor-pointer hover:shadow-medium transition-all duration-200 hover:scale-[1.02]`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{item.name}</h4>
                {item.warning && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-4 h-4 text-danger" />
                    <span className="text-sm text-danger">{item.warning}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-fresh" />
                  <span className="text-sm text-muted-foreground">{item.ingredients}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuRecommendations;