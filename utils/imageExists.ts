const imageExists = (image_url) => {
  const http = new XMLHttpRequest();

  http.open('HEAD', image_url, false);
  http.send();
  return http.status !== 404;
};

export default imageExists;
