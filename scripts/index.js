document.addEventListener('DOMContentLoaded', init, false)

function init() {


    let grid = document.getElementById('grid')
    grid.addEventListener('click', gridEvents, false)
    let head = document.getElementById('header')
    head.addEventListener('click', gridEvents, false)
    let filters = document.getElementById('filters')
    filters.addEventListener('change', filterEvents, false)
    let popup = document.getElementById('popup')
    popup.addEventListener('click', hideAlbum, false)



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

    }

    initView()


    function showLocation() {
        grid.innerHTML = ""
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

    function hideAlbum() {
        popup.innerHTML = ""
        viewRecords(records)
    }
    function showAlbum(e) {
        let { artist, title, cover, year } = e.target.dataset
        grid.innerHTML = ""
        popup.innerHTML += `
        <img src="resources/records/${cover}" />
        <h2>${title}</h2>
        <h3>${artist}</h3>
        <h4>${year}</h4>`
        console.log(artist, title, cover);

    }
    function viewRecords(records) {
        grid.innerHTML = ""
        filters.classList.remove('hide')
        records.map((record) => {
            grid.innerHTML += `
            <img class="albumCover" id="albumCover${record.id}" data-cover="${record.cover}" data-title="${record.title}" data-artist="${record.artist}" data-year="${record.year}"  src="resources/records/${record.cover}"/> 
        `
        })

    }

}