const dataUrl = "https://fakestoreapi.com/products";
export const getData = () => {
  const data = fetch(dataUrl).then((res) => res.json());
  return data;
};
