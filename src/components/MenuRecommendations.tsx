import { AlertTriangle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const MenuRecommendations = () => {
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

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">메뉴 추천</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs bg-danger-light text-danger rounded-full">유통기한순</button>
          <button className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full">빈도순</button>
          <button className="px-3 py-1 text-xs bg-fresh-light text-fresh rounded-full border border-fresh">즐겨찾는순</button>
        </div>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((item, index) => (
          <Card key={index} className={`p-4 ${item.bgColor} border-l-4 ${item.borderColor} border-y-0 border-r-0 shadow-soft`}>
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