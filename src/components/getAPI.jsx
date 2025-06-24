function getAPI(url) {
  return fetch(`${url}`).then((response) => {
    if (!response.ok) {
      return Promise.reject({
        status: response.status,
        msg: response.msg,
      });
    }
    return response.json();
  });
}

export default getAPI;
