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
    <aside className="fixed right-0 top-0 w-1/5 h-screen bg-white flex flex-col items-center py-8 px-4 z-[60] shadow-2xl"  style={{ boxShadow: '0 0 32px 8px rgba(151,125,255,0.10)' }}>
      {/* WeSupply Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0033FF] font-[family:var(--font-montserrat)]">
          WeSupply
        </h2>
      </div>

      {/* Ticket de caisse - Centered Vertically */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xs bg-white border-2 border-dashed border-[#0033FF] rounded-lg p-4 font-[family:var(--font-poppins)] shadow-2xl backdrop-blur-md">
          <div className="text-center mb-3 pb-3 border-b border-[[#0033FF]">
            <p className="text-[#0033FF] text-sm font-semibold">Final Budget</p>
            <p className="text-xs text-[#0033FF]">WeSupply</p>
          </div>

          {/* Items */}
          <div className="space-y-1 mb-3 pb-3 text-[#0033FF] border-b border-[#977DFF] text-xs">
            {articles.map((article, index) => (
              <div key={index} className="flex justify-between">
                <span>{article.name}</span>
                <span>€{article.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mb-3 pb-3 border-b border-[#0033FF]">
            <div className="flex justify-between text-[#0033FF] font-semibold text-sm">
              <span>TOTAL</span>
              <span>€{total}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-[#0033FF]">
            <p>Eat better without thinking harder</p>
            <p className="mt-1">Date: {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
