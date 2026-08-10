import { useQuery } from "@tanstack/react-query";
import axiosInstance from "axios"; // تأكد من المسار الصحيح للـ Instance الخاصة بك

const baseUrl = import.meta.env.VITE_BASE_URL;

const fetchProducts = async () => {
  // أضفنا الـ / هنا لضمان سلامة مسار الـ API
  const { data } = await axiosInstance.get(`${baseUrl}products`);
  return data;
};

export const useDresses = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    select: (products) =>
      products.filter((product) => product.category === "Dresses"),
  });
};