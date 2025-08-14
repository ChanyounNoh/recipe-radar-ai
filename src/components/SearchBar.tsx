import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      toast({
        title: "검색 실행",
        description: `"${searchQuery}" 검색 결과를 찾고 있습니다.`,
      });
    }
  };

  return (
    <div className="relative mx-4 my-3">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input 
        placeholder="메뉴나 재료를 검색하세요..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleSearch}
        className="pl-10 py-3 rounded-xl border-0 bg-card shadow-soft focus-visible:ring-2 focus-visible:ring-primary/20"
      />
    </div>
  );
};

export default SearchBar;