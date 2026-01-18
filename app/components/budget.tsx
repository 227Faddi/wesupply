'use client';

export default function Budget() {
  const articles = [
    { name: 'Pommes', price: 2.50 },
    { name: 'Pain', price: 1.80 },
    { name: 'Lait', price: 1.20 },
    { name: 'Fromage', price: 3.50 },
    { name: 'Œufs', price: 2.00 },
    { name: 'Tomates', price: 1.75 },
    { name: 'Poulet', price: 5.99 },
    { name: 'Riz', price: 2.30 },
  ];

  const total = articles.reduce((sum, article) => sum + article.price, 0).toFixed(2);

  return (
    <aside className="w-1/5 h-screen bg-white border-l border-gray-200 flex flex-col items-center py-8 px-4">
      {/* WeSupply Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-500 font-[family:var(--font-montserrat)]">
          WeSupply
        </h2>
      </div>

      {/* Ticket de caisse - Centered Vertically */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xs bg-white bg-opacity-95 border-2 border-dashed border-purple-300 rounded-lg p-4 font-[family:var(--font-poppins)] shadow-2xl backdrop-blur-md">
        <div className="text-center mb-3 pb-3 border-b border-purple-500">
          <p className="text-purple-500 text-sm font-semibold">Final Budget</p>
          <p className="text-xs text-purple-600">WeSupply</p>
        </div>

        {/* Items */}
        <div className="space-y-1 mb-3 pb-3 text-purple-500 border-b border-purple-500 text-xs">
          {articles.map((article, index) => (
            <div key={index} className="flex justify-between">
              <span>{article.name}</span>
              <span>€{article.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mb-3 pb-3 border-b border-purple-500">
          <div className="flex justify-between text-purple-500 font-semibold text-sm">
            <span>TOTAL</span>
            <span>€{total}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-purple-500">
          <p>Eat better without thinking harder</p>
          <p className="mt-1">Date: {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        </div>
      </div>
    </aside>
  );
}
