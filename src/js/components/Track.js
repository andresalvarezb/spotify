export class Track extends HTMLElement {
    songs = [];
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = /*html */ `
            <link rel="stylesheet" href="./src/css/normalize.css">
            <link rel="stylesheet" href="./src/css/bases.css">
            <link rel="stylesheet" href="./src/css/Track.css">
        `;
    }

    async loadSong() {
        const url = 'https://spotify23.p.rapidapi.com/artist_singles/?id=2w9zwq3AktTeYYMuhMjju8&offset=0&limit=5';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b0bd9d759bmshea9903d42541697p1f653ajsnde763a9f28ca',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }
        };

        const response = await fetch(url, options);
        const {
            data: {
                artist: {
                    discography: {
                        singles: { items },
                    },
                },
            },
        } = await response.json();
        this.songs = items;
    }

    async connectedCallback() {
        await this.loadSong();
        this.shadowRoot.innerHTML += /*html */ `
            <div>
                ${this.songs.map((song) => {
                    const { releases: { items }} = song;
                    return /*html */ `
                            <div class="card">
                                <div class="cards">
                                    <div class="cards_info">
                                        <div class="aling">
                                            <button  type="button"> <box-icon name='menu'></box-icon></button>
                                        </div>
                                        <div class="img">
                                            <img src="${items[0].coverArt.sources[0].url}">
                                        </div>
                                        <div class="Titule_and_artis">
                                            <h3>${items[0].name}</h3>
                                        </div>
                                    </div>
                                    <div class="minutes_and_date">
                                        <h5>${items[0].date.year}</h5>
                                    </div>
                                </div>
                            </div>  
                        `;
                })}
            </div>
        `;
    }
}

customElements.define("track-list", Track);
