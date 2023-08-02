import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { AuthContext } from "../../contexts";

export interface IFeedback {
  idFeedback?: number;
  name: string;
  address?: string;
  type: "Local" | "Category";
}

const useFeedbacks = () => {
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
        type: "Local",
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
        type: "Category",
      });

      return request.data;
    } catch (e) {
      throw new Error(
        "Algo deu errado ao criar um feedback de categoria. " + e
      );
    }
  }

  async function confirmFeedback(idFeedback: number) {
    try {
      const response = await api.post(
        `/Feedback/ConfirmFeedback/${idFeedback}`,
        {}
      );

      return response.data;
    } catch (e) {
      throw new Error("Algo deu errado ao confirmar o feedback. " + e);
    }
  }

  async function deleteFeedback(iidFeedback: number) {
    try {
      const request = await api.delete(`/Feedback/${iidFeedback}`);

      return request.data;
    } catch (e) {
      throw new Error("Algo deu errado ao deletar um feedback. " + e);
    }
  }

  return {
    createFeedbackLocal,
    createFeedbackCategoria,
    confirmFeedback,
    getFeedbacks,
    deleteFeedback,
  };
};

export default useFeedbacks;