const prod = true;

const constants = {
  BACKEND_URL:
    prod === true
      ? "https://sipitabackend.sipita.my.id/"
      : "http://localhost:3333/",
};

export default constants;
