function getAPI(url) {
  return fetch(`${url}`).then((response) => {
    if (!response.ok) {
      console.log("response not ok");
      return Promise.reject(response);
    }
    console.log("response ok");
    return response.json();
  });
}

export default getAPI;
