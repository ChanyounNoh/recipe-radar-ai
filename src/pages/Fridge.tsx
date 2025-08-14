import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Ingredient {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  status: "fresh" | "warning" | "danger";
  quantity: string;
}

const Fridge = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "1", name: "계란", category: "유제품", expiryDate: "2024-08-15", status: "danger", quantity: "10개" },
    { id: "2", name: "버터", category: "유제품", expiryDate: "2024-08-16", status: "warning", quantity: "200g" },
    { id: "3", name: "마늘", category: "채소", expiryDate: "2024-08-25", status: "fresh", quantity: "5쪽" },
    { id: "4", name: "김치", category: "발효식품", expiryDate: "2024-08-20", status: "warning", quantity: "500g" },
    { id: "5", name: "양파", category: "채소", expiryDate: "2024-08-30", status: "fresh", quantity: "3개" }
  ]);

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    category: "",
    expiryDate: "",
    quantity: ""
  });

  const [isAdding, setIsAdding] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "danger": return "bg-danger text-white";
      case "warning": return "bg-warning text-white";
      case "fresh": return "bg-fresh text-white";
      default: return "bg-muted text-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "danger": return "유통기한 임박";
      case "warning": return "주의 필요";
      case "fresh": return "신선함";
      default: return "알 수 없음";
    }
  };

  const addIngredient = () => {
    if (!newIngredient.name || !newIngredient.expiryDate) {
      toast({
        title: "입력 오류",
        description: "재료명과 유통기한은 필수입니다.",
        variant: "destructive"
      });
      return;
    }

    const today = new Date();
    const expiry = new Date(newIngredient.expiryDate);
    const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    let status: "fresh" | "warning" | "danger" = "fresh";
    if (diffDays <= 1) status = "danger";
    else if (diffDays <= 5) status = "warning";

    const ingredient: Ingredient = {
      id: Date.now().toString(),
      name: newIngredient.name,
      category: newIngredient.category || "기타",
      expiryDate: newIngredient.expiryDate,
      quantity: newIngredient.quantity || "1개",
      status
    };

    setIngredients([...ingredients, ingredient]);
    setNewIngredient({ name: "", category: "", expiryDate: "", quantity: "" });
    setIsAdding(false);
    
    toast({
      title: "재료 추가됨",
      description: `${ingredient.name}이(가) 냉장고에 추가되었습니다.`
    });
  };

  const deleteIngredient = (id: string) => {
    const ingredient = ingredients.find(item => item.id === id);
    setIngredients(ingredients.filter(item => item.id !== id));
    
    toast({
      title: "재료 삭제됨",
      description: `${ingredient?.name}이(가) 삭제되었습니다.`
    });
  };

  const statusCounts = {
    danger: ingredients.filter(item => item.status === "danger").length,
    warning: ingredients.filter(item => item.status === "warning").length,
    fresh: ingredients.filter(item => item.status === "fresh").length
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Status Summary */}
      <div className="px-4 py-4 bg-card/80 backdrop-blur-sm border-b border-border">
        <h1 className="text-xl font-bold mb-3">내 냉장고</h1>
        <div className="flex justify-between">
          <div className="text-center">
            <div className="w-8 h-8 rounded-full bg-danger mx-auto mb-1 flex items-center justify-center">
              <span className="text-white text-sm font-bold">{statusCounts.danger}</span>
            </div>
            <span className="text-xs text-danger">임박</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 rounded-full bg-warning mx-auto mb-1 flex items-center justify-center">
              <span className="text-white text-sm font-bold">{statusCounts.warning}</span>
            </div>
            <span className="text-xs text-warning">주의</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 rounded-full bg-fresh mx-auto mb-1 flex items-center justify-center">
              <span className="text-white text-sm font-bold">{statusCounts.fresh}</span>
            </div>
            <span className="text-xs text-fresh">신선</span>
          </div>
        </div>
      </div>

      {/* Add Ingredient */}
      <div className="px-4 py-4">
        {!isAdding ? (
          <Button 
            onClick={() => setIsAdding(true)}
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            재료 추가하기
          </Button>
        ) : (
          <Card className="p-4 space-y-3">
            <Input
              placeholder="재료명"
              value={newIngredient.name}
              onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
              className="rounded-xl"
            />
            <Input
              placeholder="카테고리"
              value={newIngredient.category}
              onChange={(e) => setNewIngredient({...newIngredient, category: e.target.value})}
              className="rounded-xl"
            />
            <Input
              type="date"
              placeholder="유통기한"
              value={newIngredient.expiryDate}
              onChange={(e) => setNewIngredient({...newIngredient, expiryDate: e.target.value})}
              className="rounded-xl"
            />
            <Input
              placeholder="수량"
              value={newIngredient.quantity}
              onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
              className="rounded-xl"
            />
            <div className="flex gap-2">
              <Button onClick={addIngredient} className="flex-1">추가</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>취소</Button>
            </div>
          </Card>
        )}
      </div>

      {/* Ingredients List */}
      <div className="px-4 space-y-3">
        {ingredients.map((ingredient) => (
          <Card key={ingredient.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{ingredient.name}</h3>
                  <Badge className={`text-xs ${getStatusColor(ingredient.status)}`}>
                    {getStatusText(ingredient.status)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{ingredient.category} • {ingredient.quantity}</p>
                <p className="text-xs text-muted-foreground">유통기한: {ingredient.expiryDate}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="p-2">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="p-2 text-danger border-danger hover:bg-danger hover:text-white"
                  onClick={() => deleteIngredient(ingredient.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Fridge;