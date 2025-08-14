import { Home, Refrigerator, BookOpen, CheckSquare } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/", active: location.pathname === "/" },
    { icon: Refrigerator, label: "Fridge", path: "/fridge", active: location.pathname === "/fridge" },
    { icon: BookOpen, label: "Recipes", path: "/recipes", active: location.pathname === "/recipes" },
    { icon: CheckSquare, label: "To do", path: "/todo", active: location.pathname === "/todo" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 p-2 min-w-0 transition-colors ${
              item.active ? "text-primary" : "text-muted-foreground hover:text-primary/70"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;