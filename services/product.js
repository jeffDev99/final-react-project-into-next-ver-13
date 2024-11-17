import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/configs/api";
import { deleteCookie } from "@/utils/config";
const useGetProducts = (limit, page , setActivePage) => {
  if (!limit && !page) return;
  const queryFn = async () => {
    try {
      const response = await api.get(`/products?limit=${limit}&page=${page}`);
      return response.data; 
    } catch (err) {
      if (err?.response?.status === 400) {
        setActivePage(prev => prev - 1);
        const response = await api.get(`/products?limit=${limit}&page=${page - 1}`);
        return response.data; 
      }
      throw err; 
    }
  };
  const queryKey = ["products"];
  return useQuery({ queryKey, queryFn, suspense: true });
};

// const queryFn = () => api.get(`/products?limit=${limit}&page=${page}`).catch((err) => {
//   if (err?.response?.status === 400) {
//     setActivePage(prev=>prev-1)
//     return api.get(`/products?limit=${limit}&page=${page-1}`)
//   }
// });
const useGetMainProduct = (name) => {
  const queryFn = () =>
    api.get(`/products${name ? `?name=${name}` : ""}`).catch((err) => {
      if (err.response.status === 400) {
        return { data: { data: [] } };
      }
      throw err;
    });
  const queryKey = ["product"];
  return useQuery({ queryKey, queryFn, suspense: true });
};

const useCreateProduct = () => {
  const querClient = useQueryClient();
  const mutationFn = (data) =>
    api.post("/products", data).catch((err) => {
      if (err.response.status === 403) {
        deleteCookie("Token");
        window.location.replace("/");
      }
    });
  const onSuccess = async () => {
    await querClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
const useUpdateProduct = (id) => {
  const querClient = useQueryClient();
  const mutationFn = (data) => api.put(`/products/${id}`, data);
  const onSuccess = async () => {
    await querClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};

const useDeleteProduct = (id) => {
  const querClient = useQueryClient();
  const mutationFn = (data) =>
    api.delete(`/products/${id}`, data).catch((err) => {
      if (err.response.status === 403) {
        deleteCookie("Token");
        window.location.replace("/");
      }
    });
  const onSuccess = async () => {
    await querClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
export { useGetProducts, useCreateProduct, useUpdateProduct, useGetMainProduct, useDeleteProduct };
