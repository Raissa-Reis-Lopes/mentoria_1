const numberInput = document.getElementById('numberInput');
const btnInput = document.getElementById('btnInput');
const content = document.getElementById('content');

async function CallApi(url) {
  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`Error HTTP: ${resposta.status}`)
    }

    const dados = await resposta.json();
    return dados;

  } catch (error) {
    console.error(`Error:`, error.message);
  }
};


function createContent(resultApi) {
  content.classList.add("active")

  const paragraf = document.createElement('p');
  const img = document.createElement('img');

  paragraf.innerHTML = `
    <strong>Name:</strong> ${resultApi.name}<br>
    <strong>Status:</strong> ${resultApi.status}<br>
    <strong>gender:</strong> ${resultApi.gender}<br>
    <strong>species:</strong> ${resultApi.species}
  `;
  img.src = resultApi.image;

  content.appendChild(paragraf);
  content.appendChild(img);
}

btnInput.addEventListener('click', async (event) => {
  event.preventDefault();

  const url = `https://rickandmortyapi.com/api/character/${numberInput.value}`;
  const result = await CallApi(url);

  if (!numberInput.value) {
    alert('Por favor, insira um ID válido.');
    return;
  }

  content.innerHTML = "";
  createContent(result);
});


