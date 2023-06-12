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
            for (const breed of breeds) {
                const optionEl = document.createElement('option');
                optionEl.value = breed.id;
                optionEl.textContent = breed.name;
                selectEl.append(optionEl);
            }
            loadingEl.style.display = 'none';
            errorEl.style.display = 'none';
            selectEl.style.display = 'block';
            setTimeout(() => {
                customSelect('.custom-select');
            }, 0);
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
            if (cat.breeds.length > 0) {
                modalEl.innerHTML = `
                    <img src="${cat.url}" alt="Cat Image" width="500px">
                    <div class="description">
                    <h2>Breed: ${cat.breeds[0].name}</h2>
                    <p>Description: ${cat.breeds[0].description}</p>
                    <h3>Temperament: ${cat.breeds[0].temperament}</h3>
                    </div>
                `;
            } else {
                modalEl.innerHTML = `<p>No information available for this breed.</p>`;
            }
            loadingEl.style.display = 'none';
            errorEl.style.display = 'none';
            selectEl.style.display = 'block';
            modalEl.style.display = 'block';
        })
        .catch(error => {
            console.log('error', error);
            showError(err.message);
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