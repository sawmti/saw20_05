const getImages = async (id) => {
  const response = await fetch(`/api/entities/images/${id}`);
  const data = await response.json();
  console.log(id);
  return data
} 