import { logger } from "../../../shared/infrastrucutre/dependencies";
import { CuerpoPeticion } from "../../domain/entities/cuerpo";

export const sendHttpRequest = async (cuerpo: CuerpoPeticion, body?: any) => {
  const url = `${cuerpo.tipo.url}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: cuerpo.source,
      destination: cuerpo.destination,
      operation: cuerpo.operation,
      verb: cuerpo.verb,
      path: cuerpo.path,
      body: body || null,
    }),
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
