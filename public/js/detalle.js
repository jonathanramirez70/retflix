const imagePath = 'https://image.tmdb.org/t/p/w500';
function getMovie(movie) {
	axios.get(`https://api.themoviedb.org/3/movie/${movie}`, {
			params: {
				api_key: "",
				language: "es-MX",
				append_to_response: "videos,images"
			}
		})
		.then(response  => {
			const { data } = response;
			if(data) {
				document.getElementById('txtName').innerText = data.title;
				document.getElementById('imgPoster').src = `${imagePath}${data.poster_path}`;
				//document.getElementById('imgBack').src = `${imagePath}${data.backdrop_path}`;
				document.getElementById('txtOriginalTitle').innerText = data.original_title;
				document.getElementById('txtOriginalLanguage').innerText = data.original_language;
				let countries = data.production_countries.map((d)=> d.name).join(',');
				document.getElementById('txtCountry').innerText = countries;
				document.getElementById('txtReleaseDate').innerText = data.release_date;
				document.getElementById('txtOverview').innerText = data.overview;
				document.getElementById('txtRunTime').innerText = `${data.runtime} Minutos`;
				let genres = data.genres.map((g)=> `<span class="badge bg-success">${g.name}</span>`);
				document.getElementById('txtGenres').innerHTML = genres.join(" ");
				dgSponsors = document.getElementById("dgSponsors");
				data.production_companies.forEach((d) => {
					if(d.logo_path) {
						dgSponsors.innerHTML += `
							<div class="col-3">
								<div class="card h-100 p-2">
									<img class="card-img-top h-100" src="${imagePath}${d.logo_path}" alt="">
								</div>
								
							</div>
						`;
					}
				})
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

function getCast(movie) {
	axios.get(`https://api.themoviedb.org/3/movie/${movie}/credits`, {
			params: {
				api_key: "",
				language: "es-MX",
			}
		})
		.then(response  => {
			const { data } = response;
			if(data) {
				let cast = data.cast.map((g)=> {
					let image = `${imagePath}${g.profile_path}`;
					if (!g.profile_path) {
						image = `public/default.jpg`;
					}
					let url = `persona.html?id=${g.id}`;
					return `
						<div class="col-sm-2">
							<a href="${url}" class="text-decoration-none">
								<div class="card bg-black text-success">
									<img src="${image}" class="card-img-top" alt="...">
									<div class="card-body">
										<p>${g.name} como ${g.character}</p>
									</div>
								</div>
							</a>
						</div>
					`;
				});
				document.getElementById('dgCast').innerHTML = cast.join(" ");
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
	if (params && params.id) {
		getMovie(params.id);
		getCast(params.id);
	}
} );