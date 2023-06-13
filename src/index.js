import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import customSelect from 'custom-select';
import * as Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const loadingEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const modalEl = document.querySelector('.cat-info');


function usedBreeds() {
    fetchBreeds()
        .then(breeds => {
            const breedsOptionEl = breeds.map(breed => {
                const optionEl = document.createElement('option');
                optionEl.value = breed.id;
                optionEl.textContent = breed.name;
                return optionEl;
            })
        
            selectEl.append(...breedsOptionEl);
            loadingEl.style.display = 'none';
            errorEl.style.display = 'none';
            selectEl.style.display = 'block';
            customSelect('.custom-select');
            
        })
        .catch(err => {
            console.log('error', err);
            showError(err.message);
        });
}

function catInfo(breedId) {
    loadingEl.style.display = 'block';
    modalEl.style.display = 'none';
    fetchCatByBreed(breedId)
        .then(cat => {
            if (cat.breeds.length === 0) {
                modalEl.innerHTML = `<p>No information available for this breed.</p>`;
                return;
            } else {
                modalEl.innerHTML = `
                    <img src="${cat.url}" alt="Cat Image" width="500px">
                    <div class="description">
                    <h2>Breed: ${cat.breeds[0].name}</h2>
                    <p>Description: ${cat.breeds[0].description}</p>
                    <h3>Temperament: ${cat.breeds[0].temperament}</h3>
                    </div>
                `;
                
                loadingEl.style.display = 'none';
                errorEl.style.display = 'none';
                selectEl.style.display = 'block';
                modalEl.style.display = 'flex';
            }
        })
        .catch(error => {
            console.log('error', error);
            showError(error.message);
        });
}

function onSelect(event) {
    const breedId = event.target.value;
    catInfo(breedId);
}

selectEl.addEventListener('change', onSelect);
usedBreeds();

function showError() {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'none';
    Notiflix.Notify.failure(`${errorEl.textContent}`);
}

