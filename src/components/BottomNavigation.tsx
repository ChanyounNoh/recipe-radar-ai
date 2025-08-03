import { Home, Refrigerator, BookOpen, CheckSquare } from "lucide-react";

const BottomNavigation = () => {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Refrigerator, label: "Fridge", active: false },
    { icon: BookOpen, label: "Recipes", active: false },
    { icon: CheckSquare, label: "To do", active: false }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center gap-1 p-2 min-w-0 ${
              item.active ? "text-primary" : "text-muted-foreground"
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