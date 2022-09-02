const imagePath = 'https://image.tmdb.org/t/p/w500';
const carrouselSize = 6;
function getRecents()
{
	axios.get('https://api.themoviedb.org/3/trending/all/day', {
			params: {
				api_key: "",
				language: "es-MX",
				page: 1
			}
		})
		.then(response  => {
			const { data } = response;
			if(data) {
				let dgRecientes = document.getElementById("dgRecientes");
				let items = "";
				dgRecientes.innerHTML = items;
				let counter = 0;
				results = data.results.slice(0, 18);
				results.forEach(movie => {
					counter++;
					if (counter == 1) {
						items += `
							<li class="splide__slide">
								<div class="splide-item">
									<div class="row justify-content-center">`;
					}
					items += `
						<div class="col-2 justify-content-center">
							<a href="detalle.html?id=${movie.id}"><img src="${imagePath}${movie.poster_path}" width="100%"/></a>
						</div>
					`;
					if (counter == carrouselSize) {
						items += `</div>
							</div>
						</li>`;
						counter = 0;
					}
				});
				dgRecientes.innerHTML = items;
				var splide = new Splide( '#splideRecents' );
				splide.mount();
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

function getGenres() {
	axios.get('https://api.themoviedb.org/3/genre/movie/list', {
			params: {
				api_key: "",
				language: "es-MX"
			}
		})
		.then(response  => {
			const { data } = response;
			if(data) {
				let dgGeneros = document.getElementById("dgGeneros");
				dgGeneros.innerHTML
				data.genres.forEach(genre => {
					dgGeneros.innerHTML += `
					<div class="row">
						<div class="col">
							<h5 class="text-white">${genre.name}</h5>
						</div>
					</div>
					<div class="row mb-4">
						<div class="col">
							<section id="genre${genre.id}" class="splide" aria-label="Splide Basic HTML Example">
								<div class="splide__track">
									<ul class="splide__list" id="dgGenre${genre.id}">
										<li class="splide__slide">
											<div class="splide-item"></div>
										</li>
									</ul>
								</div>
							</section>
						</div>
					</div>
					`;
					getByGenre(genre.id);
				});
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

function getByGenre(genre) {
	axios.get('https://api.themoviedb.org/3/discover/movie', {
			params: {
				api_key: "",
				language: "es-MX",
				with_genres: genre
			}
		})
		.then(response  => {
			const { data } = response;
			if(data) {
				let dgGenre = document.getElementById(`dgGenre${genre}`);
				let items = "";
				dgGenre.innerHTML = items;
				let counter = 0;
				results = data.results.slice(0, 18);
				results.forEach(movie => {
					counter++;
					if (counter == 1) {
						items += `
							<li class="splide__slide">
								<div class="splide-item">
									<div class="row justify-content-center">`;
					}
					items += `
						<div class="col-2 justify-content-center">
						<a href="detalle.html?id=${movie.id}"><img src="${imagePath}${movie.poster_path}" width="100%"/></a>
						</div>
					`;
					if (counter == carrouselSize) {
						items += `</div>
							</div>
						</li>`;
						counter = 0;
					}
				});
				dgGenre.innerHTML = items;
				var splide = new Splide( `#genre${genre}` );
				splide.mount();
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}


document.addEventListener( 'DOMContentLoaded', function() {
	getRecents();
	getGenres();
} );
