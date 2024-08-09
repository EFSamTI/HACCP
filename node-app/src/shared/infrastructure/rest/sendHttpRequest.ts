import { logger } from "../dependencies";
import { HttpRequest } from '../../domain/interfaces/http-request';

export const sendHttpRequest = async ({ url, source, destination, operation, verb, path, body, feedback }: HttpRequest) => {
  const bodyRequest: any = {
    source,
    destination,
    operation,
    verb,
    path,
    body: body || null,
    ...(feedback && { feedback })
  };
  logger.info(bodyRequest);
  console.log(bodyRequest);
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
  }

  return JSON.parse(text);
};