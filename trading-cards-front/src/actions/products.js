import { API_URL } from "../config";

export const fetchAllProducts = async () => {
    try {
        const res = await fetch(API_URL + "/products");
        const data = await res.json();
        return data;
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const fetchSingleProduct = async (id) => {
    try {
        const res = await fetch(API_URL + "/products/" + id);
        const data = await res.json();
        return data;
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const deleteSingleProduct = async (id) => {
    try {
        const res = await fetch(API_URL + "/products/" + id, {
            method: "DELETE",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const editSingleProduct = async (product) => {
    try {
        const res = await fetch(API_URL + "/products/" + product.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const addProduct = async (product) => {
    try {
        const res = await fetch(API_URL + "/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return { success: false, error: error.message };
    }
};