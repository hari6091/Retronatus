import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { IPublicacao } from "..";
import { AuthContext } from "../../contexts";

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

  return { createFeedback };
};

export default useFeedbacks;
