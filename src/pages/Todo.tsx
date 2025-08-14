import { useState } from "react";
import { Plus, Check, X, Calendar, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface TodoItem {
  id: string;
  title: string;
  type: "shopping" | "cooking" | "reminder";
  completed: boolean;
  dueDate?: string;
  ingredients?: string[];
}

const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: "1",
      title: "된장, 두부, 애호박 사러가기",
      type: "shopping",
      completed: false,
      ingredients: ["된장", "두부", "애호박"]
    },
    {
      id: "2",
      title: "계란 유통기한 확인하기",
      type: "reminder",
      completed: false,
      dueDate: "2024-08-15"
    },
    {
      id: "3",
      title: "김치볶음밥 만들기",
      type: "cooking",
      completed: true
    },
    {
      id: "4",
      title: "참기름, 김 사러가기",
      type: "shopping",
      completed: false,
      ingredients: ["참기름", "김"]
    }
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "shopping": return <ShoppingCart className="w-4 h-4" />;
      case "cooking": return <span className="text-sm">🍳</span>;
      case "reminder": return <Calendar className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "shopping": return "bg-primary text-white";
      case "cooking": return "bg-warning text-white";
      case "reminder": return "bg-danger text-white";
      default: return "bg-muted text-foreground";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "shopping": return "장보기";
      case "cooking": return "요리";
      case "reminder": return "알림";
      default: return "기타";
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));

    const todo = todos.find(t => t.id === id);
    if (todo) {
      toast({
        title: todo.completed ? "할 일 미완료" : "할 일 완료",
        description: `"${todo.title}"이(가) ${todo.completed ? '미완료' : '완료'}되었습니다.`
      });
    }
  };

  const deleteTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    
    toast({
      title: "할 일 삭제됨",
      description: `"${todo?.title}"이(가) 삭제되었습니다.`
    });
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const todo: TodoItem = {
      id: Date.now().toString(),
      title: newTodo,
      type: "reminder",
      completed: false
    };

    setTodos([todo, ...todos]);
    setNewTodo("");
    setIsAdding(false);
    
    toast({
      title: "할 일 추가됨",
      description: `"${todo.title}"이(가) 추가되었습니다.`
    });
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 py-4 bg-card/80 backdrop-blur-sm border-b border-border">
        <h1 className="text-xl font-bold mb-2">할 일</h1>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {completedCount}/{totalCount} 완료
          </div>
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4">
        {!isAdding ? (
          <Button 
            onClick={() => setIsAdding(true)}
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            할 일 추가하기
          </Button>
        ) : (
          <Card className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="할 일을 입력하세요..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                className="flex-1 rounded-xl"
              />
              <Button onClick={addTodo} size="icon" className="rounded-xl">
                <Check className="w-4 h-4" />
              </Button>
              <Button onClick={() => setIsAdding(false)} variant="outline" size="icon" className="rounded-xl">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Suggested Actions */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">추천 할 일</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">장보기 목록</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">부족한 재료들</p>
          </Card>
          <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-danger" />
              <span className="text-sm font-medium">유통기한 확인</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">임박한 재료들</p>
          </Card>
        </div>
      </div>

      {/* Todo List */}
      <div className="px-4 space-y-3">
        {todos.map((todo) => (
          <Card key={todo.id} className={`p-4 ${todo.completed ? 'opacity-60' : ''}`}>
            <div className="flex items-start gap-3">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="mt-1"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={`text-xs ${getTypeColor(todo.type)}`}>
                    {getTypeIcon(todo.type)}
                    <span className="ml-1">{getTypeText(todo.type)}</span>
                  </Badge>
                  {todo.dueDate && (
                    <span className="text-xs text-danger">
                      {todo.dueDate}
                    </span>
                  )}
                </div>
                
                <h3 className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {todo.title}
                </h3>
                
                {todo.ingredients && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {todo.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
                className="p-2 text-danger border-danger hover:bg-danger hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Todo;