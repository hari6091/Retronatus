import { useEffect, useState } from "react";
import api from "../../services/api";
import { IComentario } from "..";

export type Media = {
  idMedia: number;
  source: string;
  type: string;
  idPublicacao: number;
};

export interface IPublicacao {
  idPublicacao?: number;
  content: string;
  medias: Media[];
  status: "achado" | "perdido" | "devolvido";
  date?: string;
  idUsuario: number;
  idLocal: number;
  idCategoria: number;
  comentarios?: IComentario[];
}

const usePublicacao = (idLocal?: number) => {
  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>();

  async function allPublicacaoByLocal(idLocal: number) {
    try {
      await api.get(`/Publicacao/GetByLocal/${idLocal}`).then((response) => {
        setPublicacoes(response.data);
      });
    } catch (e) {
      throw new Error("Algo deu errado ao listar as Publicações. " + e);
    }
  }

  async function createPublicacao({
    content,
    medias,
    status,
    idUsuario,
    idLocal,
    idCategoria,
  }: IPublicacao) {
    try {
      const request = await api.post("/Publicacao", {
        content,
        medias,
        status,
        idUsuario,
        idLocal,
        idCategoria,
        date: new Date(Date.now()),
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao criar uma Publicação. " + e);
    }
  }

  async function getSinglePublicacao(
    idPublicacao: number
  ): Promise<IPublicacao> {
    try {
      const request = await api.get(`/Publicacao/${idPublicacao}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao buscar uma Publicação. " + e);
    }
  }

  async function editPublicacao({
    idPublicacao,
    content,
    medias,
    status,
    idUsuario,
    idLocal,
    idCategoria,
  }: IPublicacao) {
    try {
      const request = await api.put(`/Publicacao/${idPublicacao}`, {
        idPublicacao,
        content,
        medias,
        status,
        idUsuario,
        idLocal,
        idCategoria,
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao editar uma Publicação. " + e);
    }
  }

  async function deletePublicacao(idPublicacao: number) {
    try {
      const request = await api.delete(`/Publicacao/${idPublicacao}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao deletar um local. " + e);
    }
  }

  async function getUsuarioPublicacoes(
    idUsuario: number
  ): Promise<IPublicacao[]> {
    try {
      const request = await api.get(`/Publicacao/usuario/${idUsuario}`);

      return request.data;
    } catch (e) {
      throw new Error(
        "Algo deu errado ao buscar as publicações de um usuário. " + e
      );
    }
  }

  useEffect(() => {
    if (idLocal) {
      allPublicacaoByLocal(idLocal);
    }
  }, []);

  return {
    publicacoes,
    createPublicacao,
    getSinglePublicacao,
    editPublicacao,
    deletePublicacao,
    getUsuarioPublicacoes,
  };
};

export default usePublicacao;
