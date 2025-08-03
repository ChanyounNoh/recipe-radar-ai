import StatusBar from "@/components/StatusBar";
import SearchBar from "@/components/SearchBar";
import IngredientInput from "@/components/IngredientInput";
import FridgeGraph from "@/components/FridgeGraph";
import MenuRecommendations from "@/components/MenuRecommendations";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <StatusBar />
      <SearchBar />
      <IngredientInput />
      <FridgeGraph />
      <MenuRecommendations />
      <BottomNavigation />
    </div>
  );
};

export default Index;