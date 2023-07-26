import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { IPublicacao } from "..";
import { AuthContext } from "../../contexts";


export interface IFeedback {
  idFeedback: number;
  name: string;
  address?: string;
  type: "Local" | "Categoria";
}
export interface ILocal {
  idLocal?: number;
  name: string;
  address: string;
  publicacoes?: IPublicacao[];
}


  
const useFeedbacks = () => {
  async function createFeedback({ name, address }: ILocal) {
    try {
      const request = await api.post("/Feedbacks", {
        name,
        address,
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao criar um feedback de local. " + e);
    }
  }



  async function getFeedbacks() {
    try {
      const response = await api.get("/Feedback");
      return response.data;
    } catch (e) {
      throw new Error("Algo deu errado ao listar os feedbacks. " + e);
    }
  }

  async function createFeedbackLocal({ name, address }: IFeedback) {
    try {
      const request = await api.post("/Feedback", {
        name,
        address,
        type: 'Local',
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao criar um feedback de local. " + e);
    }
  }

  async function createFeedbackCategoria({ name }: IFeedback) {
    try {
      const request = await api.post("/Feedback", {
        name,
        type: 'Categoria',
      });

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao criar um feedback de categoria. " + e);
    }
  }

  async function confirmFeedback(idFeedback: number) {
    try {
      const response = await api.post(
        `/Feedback/ConfirmFeedback/${idFeedback}`,
        {},
      );

      return response.data;
    } catch (e) {
      throw new Error("Algo deu errado ao confirmar o feedback. " + e);
    }
  }
  return {createFeedback, createFeedbackLocal, createFeedbackCategoria, confirmFeedback, getFeedbacks };

};

export default useFeedbacks;
