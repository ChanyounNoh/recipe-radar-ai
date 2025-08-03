import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const IngredientInput = () => {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between bg-card rounded-2xl p-4 shadow-soft">
        <button className="text-muted-foreground text-sm font-medium">
          영수증 찍어서 넣기
        </button>
        
        <Button size="icon" className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-medium">
          <Plus className="w-6 h-6" />
        </Button>
        
        <button className="text-muted-foreground text-sm font-medium">
          직접 입력해서 넣기
        </button>
      </div>
    </div>
  );
};

export default IngredientInput;