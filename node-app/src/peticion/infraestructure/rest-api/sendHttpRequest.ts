import path from "path";
import { logger } from "../../../shared/infrastrucutre/dependencies";
import { HttpRequest } from '../../../vessels/aplication/interfaces/http-request';

export const sendHttpRequest = async (HttpRequest: HttpRequest) => {
  const url = `${HttpRequest.url}`;
  const bodyRequest:any = {
    source: HttpRequest.source,
    destination: HttpRequest.destination,
    operation: HttpRequest.operation,
    verb: HttpRequest.verb,
    path: HttpRequest.path,
    body: HttpRequest || null,
  }
  if (HttpRequest.feedback) {
    bodyRequest.feedback = HttpRequest.feedback;
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyRequest),
  });

  if (response.status !== 200) {
    const error = new Error(`Error en la petición`);
    logger.error(error.message);
    throw error;
  }

  const text = await response.text();
  if (!text) {
    const error = new Error(`Error en la petición`);
    logger.error(error.message);
    throw error;
  } else {
    const data = JSON.parse(text);
    return data;
  }
};
