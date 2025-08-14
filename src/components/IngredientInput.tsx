import { Plus, Camera, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const IngredientInput = () => {
  const handleReceiptPhoto = () => {
    toast({
      title: "영수증 촬영",
      description: "카메라로 영수증을 촬영해주세요.",
    });
  };

  const handleManualInput = () => {
    toast({
      title: "직접 입력",
      description: "재료를 직접 입력해주세요.",
    });
  };

  const handleQuickAdd = () => {
    toast({
      title: "빠른 추가",
      description: "자주 사용하는 재료를 빠르게 추가할 수 있습니다.",
    });
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between bg-card rounded-2xl p-4 shadow-soft">
        <button 
          onClick={handleReceiptPhoto}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <Camera className="w-5 h-5" />
          <span className="text-sm font-medium">영수증 찍어서 넣기</span>
        </button>
        
        <Button 
          size="icon" 
          onClick={handleQuickAdd}
          className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-medium"
        >
          <Plus className="w-6 h-6" />
        </Button>
        
        <button 
          onClick={handleManualInput}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <Edit className="w-5 h-5" />
          <span className="text-sm font-medium">직접 입력해서 넣기</span>
        </button>
      </div>
    </div>
  );
};

export default IngredientInput;