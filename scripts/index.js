document.addEventListener('DOMContentLoaded', init, false)

function init() {


    let grid = document.getElementById('grid')
    grid.addEventListener('click', gridEvents, false)
    let head = document.getElementById('header')
    head.addEventListener('click', gridEvents, false)
    let filters = document.getElementById('filters')
    filters.addEventListener('change', filterEvents, false)
    let popup = document.getElementById('popup')
    popup.addEventListener('click', handlePopup, false)
    let weather = document.getElementById('weather')





    fetch('data.json')
        .then(r => r.json())
        .then(data => records = data.records)
        .catch(err => console.log('ocorreu um erro'))

    function initView() {
        grid.innerHTML = `
            <article class="gridItem" id="gridItemRec">Discos Favoritos</article>
            <article class="gridItem" id="gridItemLoc">Onde Ouvir?</article>
            `

        filters.classList.add('hide')
        weather.innerHTML = ""
        popup.innerHTML = ""
    }

    initView()


    function showLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(sucesso, erro);
        } else {
            alert('no geolocation available');
        }

        function sucesso(position) {

            const d = new Date()

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=12114b48246bfd9ec259f916b17748fc`).then(r => r.json()).then(data => {
                weather.innerHTML = `
                    <h1>Location: ${data.name} </h1>
                    <br/>
                    <p>Temperature: ${Math.round(data.main.temp - 273.15)}º Celsius </p>
                    <p>Feels Like: ${Math.round(data.main.feels_like - 273.15)}º Celsius</p>
                    <p>Humidity: ${data.main.humidity} %</p>
                    <p>Weather Description: ${data.weather[0].description} </p>
                    <p>Time: ${d.getHours()}h${d.getMinutes()}m </p>
                    <br/>
                    <h4><i>Maybe Try Spotify?</i></h4>
                `
            })



        }
        function erro(err) {
            console.log('ocorreu um erro');
        }

        grid.innerHTML = ""
        popup.innerHTML = ""

    }

    function gridEvents(e) {

        if (e.target.id === 'gridItemRec') {
            viewRecords(records)

        }
        if (e.target.id === 'gridItemLoc') {
            showLocation()
        }
        if (e.target.id === 'header') {
            initView()
        }
        if (e.target.id.includes('albumCover')) {
            showAlbum(e)
        }

    }

    function filterEvents(e) {
        if (e.target.id === "genre") {
            filterGenre(e)
        }
        if (e.target.id === "sort") {
            sortRecords(e)
        }
        popup.innerHTML = ""
    }

    function filterGenre(e) {

        if (e.target.value !== 'All') {
            let newRecords = records.filter(record => record.genre.includes(e.target.value))
            viewRecords(newRecords)

        } else {
            viewRecords(records)
        }

    }

    function sortRecords(e) {
        if (e.target.value === "yearUp") {
            let newRecords = records.sort(function (a, b) {
                if (a.year > b.year) {
                    return 1;
                }
                if (a.year < b.year) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            viewRecords(newRecords)
        }
        if (e.target.value === "yearDown") {
            let newRecords = records.sort(function (a, b) {
                if (a.year > b.year) {
                    return -1;
                }
                if (a.year < b.year) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            });
            viewRecords(newRecords)
        }
        if (e.target.value === "artistUp") {
            let newRecords = records.sort(function (a, b) {
                if (a.artist > b.artist) {
                    return 1;
                }
                if (a.artist < b.artist) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            viewRecords(newRecords)
        }
        if (e.target.value === "artistDown") {
            let newRecords = records.sort(function (a, b) {
                if (a.artist > b.artist) {
                    return -1;
                }
                if (a.artist < b.artist) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            });
            viewRecords(newRecords)
        }

    }



    function handlePopup(e) {
        if (e.target.value === undefined) {
            popup.innerHTML = ""
            viewRecords(records)
        } else if (e.target.innerHTML.includes('Next')) {
            console.log('next')
        } else if (e.target.innerHTML.includes('Previous')) {
            console.log('previous')
        }
        // Deixei aqui os botões de next e previous, mesmo não estando a funcioniar, precisamente porque não consegui pô-los a funcionar. Parece-me que o problema está em como eu perco qualquer referência ao modelo de dados assim que entro no Popup, e por isso não consigo aceder ao próximo nem anterior na array. Provavelmente o problema está em passar tudo como data-set? 
    }

    function showAlbum(e) {
        let { artist, title, cover, year, genre, id } = e.target.dataset
        grid.innerHTML = ""
        popup.innerHTML += `
        <img src="resources/records/${cover}" />
        <h2>${title}</h2>
        <h3>${artist}</h3>
        <h4>${year}</h4>
        <h4>${genre}</h4>
        <div>
        <button>Previous</button>
        <button>Next</button>
        </div>
        `
    }


    function viewRecords(records) {
        grid.innerHTML = ""
        filters.classList.remove('hide')
        records.map((record) => {
            grid.innerHTML += `
            <img class="albumCover" id="albumCover${record.id}" data-cover="${record.cover}" data-title="${record.title}" data-artist="${record.artist}" data-year="${record.year}" data-genre="${record.genre}" src="resources/records/${record.cover}"/> 
        `
        })

    }

}