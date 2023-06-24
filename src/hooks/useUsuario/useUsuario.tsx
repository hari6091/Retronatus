import { useEffect, useState } from "react";
import api from "../../services/api";
import { IPublicacao } from "..";

export interface IUsuario {
  idUsuario: number;
  name: string;
  email: string;
  password: string;
  is_Super_Admin: boolean;
  publicacoes: IPublicacao[];
}

const useUsuario = () => {
  const [usuarios, setUsuarios] = useState<IUsuario[]>();

  async function allUsuarios() {
    try {
      await api.get(`/Usuario`).then((response) => {
        setUsuarios(response.data);
      });
    } catch (e) {
      throw new Error("Algo deu errado ao listar os Usuários. " + e);
    }
  }

  async function getSingleUsuario(idUsuario: number): Promise<IUsuario> {
    try {
      const request = await api.get(`/Usuario/${idUsuario}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao buscar um Usuário " + e);
    }
  }

  async function editUsuario({
    idUsuario,
    name,
    email,
    password,
    is_Super_Admin,
  }: IUsuario) {
    try {
      const request = await api.put(`/Usuario/${idUsuario}`, {
        idUsuario,
        name,
        email,
        password,
        is_Super_Admin,
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao editar o Usuário. " + e);
    }
  }

  async function deleteUsuario(idUsuario: number) {
    try {
      const request = await api.delete(`/Usuario/${idUsuario}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao deletar um Usuario. " + e);
    }
  }

  useEffect(() => {
    allUsuarios();
  }, []);

  return {
    usuarios,
    getSingleUsuario,
    editUsuario,
    deleteUsuario,
  };
};

export default useUsuario;
