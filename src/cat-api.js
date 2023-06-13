function fetchBreeds() {
    return fetch(`https://api.thecatapi.com/v1/breeds`, {
        headers: {
            'x-api-key': 'live_j6jMwTcYfJkPhmWPyD6IGdQjsGR5GFQKhvUqtEn4w2rjPdFtdo2RWfW0jH1A2bKK'
        }
    })
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
}

function fetchCatByBreed(breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
        headers: {
            'x-api-key': 'live_j6jMwTcYfJkPhmWPyD6IGdQjsGR5GFQKhvUqtEn4w2rjPdFtdo2RWfW0jH1A2bKK'
        }
    })
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data => {
            return data[0];
        })
}

export { fetchBreeds, fetchCatByBreed }


