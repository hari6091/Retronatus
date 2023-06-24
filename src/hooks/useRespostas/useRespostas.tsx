import { useEffect, useState } from "react";
import api from "../../services/api";

export interface IResposta {
  idResposta: number;
  idUsuario: number;
  idComentario: number;
  content: string;
  date: string;
}

const useRespostas = (idComentario: number) => {
  const [respostas, setRespostas] = useState<IResposta[]>();

  async function allRespostasByComentario(idComentario: number) {
    try {
      await api
        .get(`/Resposta/GetByComentario/${idComentario}`)
        .then((response) => {
          setRespostas(response.data);
        });
    } catch (e) {
      throw new Error("Algo deu errado ao listar as Respostas. " + e);
    }
  }

  async function createResposta({
    idUsuario,
    idComentario,
    content,
  }: IResposta) {
    try {
      const request = await api.post("/Resposta", {
        content,
        idComentario,
        idUsuario,
        date: new Date(),
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao criar uma Resposta. " + e);
    }
  }

  async function getSingleResposta(idResposta: number): Promise<IResposta> {
    try {
      const request = await api.get(`/Resposta/${idResposta}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao buscar uma Resposta. " + e);
    }
  }

  async function editResposta({
    idResposta,
    idUsuario,
    idComentario,
    content,
  }: IResposta) {
    try {
      const request = await api.put(`/Resposta/${idResposta}`, {
        idResposta,
        idComentario,
        content,
        idUsuario,
        date: new Date(),
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao editar uma Resposta. " + e);
    }
  }

  async function deleteResposta(idResposta: number) {
    try {
      const request = await api.delete(`/Comentario/${idResposta}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao deletar uma Resposta. " + e);
    }
  }

  useEffect(() => {
    allRespostasByComentario(idComentario);
  }, []);

  return {
    respostas,
    createResposta,
    getSingleResposta,
    editResposta,
    deleteResposta,
  };
};

export default useRespostas;
