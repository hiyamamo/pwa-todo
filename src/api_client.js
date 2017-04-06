import axios from 'axios'
export const getItems = () => {
  return axios({
    method: 'post',
    url: 'http://localhost:4000/graphql',
    data: { query: '{ items { title completed } }' }
  });
}

