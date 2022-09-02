const imagePath = 'https://image.tmdb.org/t/p/w500';
const carrouselSize = 6;

function getMovies(search) {
	axios.get(`https://api.themoviedb.org/3/search/movie`, {
			params: {
				api_key: "",
				language: "es-MX",
				query: search
			}
		})
		.then(response  => {
			const { data } = response;
			if(data) {
				let dgMovies = document.getElementById(`dgMovies`);
				let items = "";
				dgMovies.innerHTML = items;
				let counter = 0;
				results = data.results.slice(0, 18);
				results.forEach(movie => {
					if(!movie.poster_path) return;
					counter++;
					if (counter == 1) {
						items += `<div class="row mb-4">`;
					}
					items += `
						<div class="col-2 justify-content-center">
						<a href="detalle.html?id=${movie.id}"><img src="${imagePath}${movie.poster_path}" width="100%"/></a>
						</div>
					`;
					if (counter == carrouselSize) {
						items += `</div>`;
						counter = 0;
					}
				});
				dgMovies.innerHTML = items;
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

document.addEventListener( 'DOMContentLoaded', function() {
	let queryString = window.location.search;
	queryString = queryString.substring(1);

	let params = null;
	queryString.split("&").forEach(p => {
		const temp = p.split("=");
		if(temp.length == 2) {
			if(!params) {
				params = {};
			}
			params[temp[0]] = temp[1];
		}
	});
	if (params && params.search) {
		getMovies(params.search);
	}
} );