import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { IPublicacao } from "..";
import { AuthContext } from "../../contexts";

interface ILocal {
  idLocal?: number;
  name: string;
  address: string;
  publicacoes?: IPublicacao[];
}

const useLocais = () => {
  const [locais, setLocais] = useState<ILocal[]>();

  async function allLocais() {
    try {
      await api.get("/Local").then((response) => {
        setLocais(response.data);
      });
    } catch (e) {
      throw new Error("Algo deu errado ao listar os locais. " + e);
    }
  }

  async function createLocal({ name, address }: ILocal) {
    try {
      const request = await api.post("/Local", {
        name,
        address,
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao criar um local. " + e);
    }
  }

  async function getSingleLocal(id: number): Promise<ILocal> {
    try {
      const request = await api.get(`/Local/${id}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao criar um local. " + e);
    }
  }

  async function editLocal({ idLocal, name, address }: ILocal) {
    try {
      const request = await api.put(`/Local/${idLocal}`, {
        idLocal,
        name,
        address,
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao editar um local. " + e);
    }
  }

  async function deleteLocal(idLocal: number) {
    try {
      const request = await api.delete(`/Local/${idLocal}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao deletar um local. " + e);
    }
  }

  useEffect(() => {
    allLocais();
  }, []);

  return { locais, createLocal, getSingleLocal, editLocal, deleteLocal };
};

export default useLocais;
