import { useEffect, useState } from "react";
import api from "../../services/api";
import { IPublicacao } from "..";

export interface ICategoria {
  idCategoria?: number;
  name: string;
  publicacoes?: IPublicacao[];
}

const useCategorias = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>();

  async function allCategorias() {
    try {
      await api.get("/Categoria").then((response) => {
        setCategorias(response.data);
      });
    } catch (e) {
      throw new Error("Algo deu errado ao listar as categorias. " + e);
    }
  }

  async function createCategoria({ name }: ICategoria) {
    try {
      const request = await api.post("/Categoria", {
        name,
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao criar uma categoria. " + e);
    }
  }

  async function getSingleCategoria(id: number): Promise<ICategoria> {
    try {
      const request = await api.get(`/Categoria/${id}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao criar uma categoria. " + e);
    }
  }

  async function editCategoria({ idCategoria, name }: ICategoria) {
    try {
      const request = await api.put(`/Categoria/${idCategoria}`, {
        idCategoria,
        name,
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao editar uma categoria. " + e);
    }
  }

  async function deleteCategoria(idCategoria: number) {
    try {
      const request = await api.delete(`/Categoria/${idCategoria}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao deletar uma Categoria. " + e);
    }
  }

  useEffect(() => {
    allCategorias();
  }, []);

  return {
    categorias,
    createCategoria,
    getSingleCategoria,
    editCategoria,
    deleteCategoria,
  };
};

export default useCategorias;
