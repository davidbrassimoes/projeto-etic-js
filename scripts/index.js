document.addEventListener('DOMContentLoaded', init, false)

function init() {


    let grid = document.getElementById('grid')
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

        let rec = document.getElementById('gridItemRec')
        rec.addEventListener('click', gridEvents, false)
        let loc = document.getElementById('gridItemLoc')
        loc.addEventListener('click', gridEvents, false)
    }

    initView()

    let rec = document.getElementById('gridItemRec')
    rec.addEventListener('click', gridEvents, false)
    let loc = document.getElementById('gridItemLoc')
    loc.addEventListener('click', gridEvents, false)

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
    }

    function filterEvents(e) {
        if (e.target.id === "genre") {
            filterGenre(e)
        }
        if (e.target.id === "sort") {

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