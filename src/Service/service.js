import { analytic } from "./header";

export const getDataBarang = () => {
    return analytic.get(`/barang`);
};

export const simpanDataBarang = (param) => {
    return analytic.post(`/barang`,param);
};

export const getDataBarangbyNama = (nama) => { 
    return analytic.get(`/barang/${nama}`);
};

export const updateDataBarang = (nama,payload) => {
    return analytic.put(`/barang/${nama}`,payload);
};
export const deleteDataBarang = (nama) => {
    return analytic.delete(`/barang/${nama}`);
};
