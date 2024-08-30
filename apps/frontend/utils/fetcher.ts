import axios from 'axios';

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const fetchWithBody = (url: string, body: any) =>
  axios.get(url, { params: body }).then((res) => res.data);
