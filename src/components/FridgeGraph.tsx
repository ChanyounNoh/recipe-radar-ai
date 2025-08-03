const FridgeGraph = () => {
  const ingredients = [
    { name: "계란", position: { x: 15, y: 25 }, status: "danger" },
    { name: "버터", position: { x: 35, y: 20 }, status: "danger" },
    { name: "냉동삼겹살", position: { x: 75, y: 30 }, status: "fresh" },
    { name: "고추", position: { x: 25, y: 55 }, status: "warning" },
    { name: "김치", position: { x: 65, y: 60 }, status: "fresh" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "danger": return "bg-danger text-white";
      case "warning": return "bg-warning text-white";
      case "fresh": return "bg-fresh text-white";
      default: return "bg-muted text-foreground";
    }
  };

  return (
    <div className="mx-4 mb-6">
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <h2 className="text-xl font-bold mb-4 text-center">공윤공윤곰 님의 냉장고</h2>
        
        {/* 그라데이션 바 */}
        <div className="h-2 bg-gradient-freshness rounded-full mb-6"></div>
        
        {/* 재료 배치 영역 */}
        <div className="relative h-32 bg-gradient-card rounded-xl">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className={`absolute px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ingredient.status)}`}
              style={{
                left: `${ingredient.position.x}%`,
                top: `${ingredient.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {ingredient.name}
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-muted-foreground text-sm px-4 py-2 rounded-lg bg-muted/50">
            드래그해서 메뉴 검색하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FridgeGraph;