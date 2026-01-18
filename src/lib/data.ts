

export async function fetchMediaFromUser(){
  const res = await fetch("/api/instagram/posts");
  if (!res.ok) {
    // you can throw or just return an empty array
    return [];
  }

  const data = await res.json(); // expected shape: { data: IgPost[] }
  const posts = (data?.data ?? []) as IgPost[];
  
  return posts;
    
}