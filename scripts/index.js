document.addEventListener('DOMContentLoaded', init, false)

function init() {


    let grid = document.getElementById('grid')
    grid.addEventListener('click', gridEvents, false)
    let head = document.getElementById('header')
    head.addEventListener('click', gridEvents, false)
    let filters = document.getElementById('filters')
    filters.addEventListener('change', filterEvents, false)

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
        console.log(e.target.id);
        if (e.target.id === 'gridItemRec') {
            viewRecords(records)

        }
        if (e.target.id === 'gridItemLoc') {
            showLocation()
        }
        if (e.target.id === 'header') {
            initView()
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

    function viewRecords(records) {
        grid.innerHTML = ""
        filters.classList.remove('hide')
        records.map((record) => {
            grid.innerHTML += `
            <img class="albumCover" id="albumCover${record.id}" src="resources/records/${record.cover}"/> 
        `
        })

    }

}