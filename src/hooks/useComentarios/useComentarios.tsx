import { useEffect, useState } from "react";
import api from "../../services/api";
import { IResposta } from "..";

export interface IComentario {
  idComentario?: number;
  content: string;
  idUsuario: number;
  idPublicacao: number;
  date: Date;
  respostas?: IResposta[];
}

const useComentarios = (idPublicacao?: number) => {
  const [comentarios, setComentarios] = useState<IComentario[]>();

  async function allComentarioByPublicacao(idPublicacao: number) {
    try {
      await api
        .get(`/Comentario/GetByPublicacao/${idPublicacao}`)
        .then((response) => {
          setComentarios(response.data);
        });
    } catch (e) {
      throw new Error("Algo deu errado ao listar os Comentários. " + e);
    }
  }

  async function createComentario({
    content,
    idPublicacao,
    idUsuario,
    date,
  }: IComentario) {
    try {
      const request = await api.post("/Comentario", {
        content,
        idPublicacao,
        idUsuario,
        date,
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao criar um Comentário. " + e);
    }
  }

  async function getSingleComentario(
    idComentario: number
  ): Promise<IComentario> {
    try {
      const request = await api.get(`/Comentario/${idComentario}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao buscar um Comentário. " + e);
    }
  }

  async function editComentario({
    idComentario,
    content,
    idUsuario,
    idPublicacao,
  }: IComentario) {
    try {
      const request = await api.put(`/Comentario/${idComentario}`, {
        idComentario,
        idPublicacao,
        content,
        idUsuario,
        date: new Date(),
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao editar um Comentário. " + e);
    }
  }

  async function deleteComentario(idComentario: number) {
    try {
      const request = await api.delete(`/Comentario/${idComentario}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao deletar um Comentário. " + e);
    }
  }

  useEffect(() => {
    if (idPublicacao) {
      allComentarioByPublicacao(idPublicacao);
    }
  }, []);

  return {
    comentarios,
    createComentario,
    getSingleComentario,
    editComentario,
    deleteComentario,
  };
};

export default useComentarios;
