import http from "./httpServices";

const apiEndPoint = "/calls";

export async function getCalls(offset, limit) {
  const { data } = await http.get(
    `${apiEndPoint}?offset=${offset}&limit=${limit}`
  );
  return data;
}

export async function updateCalls(id) {
  const { data } = await http.put(`${apiEndPoint}/${id}/archive`);
  return data;
}

const callServcice = { getCalls, updateCalls };

export default callServcice;
