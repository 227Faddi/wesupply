export default function RecipePage({ params }: { params: { id: string } }) {
  // Récupère le nom de la recette depuis l'URL
  // Format attendu : WEEK 1-MON-B-Oatmeal
  const id = decodeURIComponent(params.id);
  const parts = id.split('-');
  const recipeName = parts.slice(2).join('-');

  // Données mockées, à remplacer par une vraie source plus tard
  const recipe = {
    name: recipeName,
    procedure: 'Text detailing the procedure/portion',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    calories: 350,
  };

  return (
    <div className="min-h-screen w-screen h-screen bg-white text-gray-900 flex flex-col p-8">
      <div className="grid grid-cols-2 gap-8 flex-1 h-full">
        <div className="flex flex-col gap-8 h-full">
          <div className="bg-gray-100 rounded p-6 flex items-center justify-center min-h-[200px] h-1/2">
            {recipe.procedure}
          </div>
          <div className="bg-gray-100 rounded p-6 flex items-center justify-center min-h-[200px] h-1/2">
            <iframe
              width="100%"
              height="180"
              src={recipe.videoUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 h-full">
          <h1 className="text-3xl font-bold mb-8">{recipe.name}</h1>
          <div className="w-48 h-48 border-2 border-gray-400 rounded-full flex items-center justify-center text-2xl">
            {/* Image ou illustration */}
          </div>
          <div className="bg-gray-100 rounded p-6 w-full text-center">
            Expected calories: {recipe.calories}
          </div>
        </div>
      </div>
    </div>
  );
}
