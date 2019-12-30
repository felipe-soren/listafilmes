import api from "./api";

class App {
  constructor() {
    this.movies = [];
    this.selectedMovies = [];
    this.listEl = document.getElementById("movie-list");
    this.formEl = document.getElementById("movie-form");
    this.inputEl = document.querySelector("input");
    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = event => this.addMovie(event);
  }

  async addMovie(event) {
    event.preventDefault();
    this.movies = [];

    const movieInput = this.inputEl.value;

    const response = await api.get(`?apikey=c80f6ae9&s=${movieInput}`);

    response.data.Search.forEach(movie => {
      const { Title, Year, Poster } = movie;
      this.movies.push({ Title, Year, Poster });
    });
    this.listEl.innerHTML = "";
    this.render();
    console.log(this.movies);
  }

  render() {
    this.movies.forEach(movie => {
      let imgEl = document.createElement("img");
      imgEl.setAttribute("src", movie.Poster);

      let titleEl = document.createElement("strong");
      titleEl.appendChild(document.createTextNode(movie.Title));

      let yearEl = document.createElement("p");
      yearEl.appendChild(document.createTextNode(movie.Year));

      let linkEl = document.createElement("a");
      linkEl.appendChild(document.createTextNode("Adicionar a lista"));

      linkEl.setAttribute("id", movie.Title);
      linkEl.addEventListener("click", this.addToWhishList);

      let listItemEl = document.createElement("li");
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(yearEl);
      listItemEl.appendChild(linkEl);
      this.listEl.appendChild(listItemEl);
    });
  }

  addToWhishList(event) {
    console.log(this.movies);
    event.preventDefault();
    let wishListEl = document.getElementById("wish-list");
    console.log(event.currentTarget.id);
    console.log(wishListEl);
    let wishEl = document.createElement("li");
    wishEl.appendChild(document.createTextNode(event.currentTarget.id));
    wishListEl.appendChild(wishEl);
  }
}

new App();
