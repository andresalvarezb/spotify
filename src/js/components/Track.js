const styles = /*html */ `
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        :root {
            font-family: Arial, Helvetica, sans-serif;
        }
        .card {
    margin: 10px;
    padding: 0;
}

.cards {
    background: white;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    margin-bottom: 10px;
}

.cards h3 {
    margin: 5px;
    font-size: 15px;
}

.cards h5 {
    margin: 0;
    color: rgb(124, 124, 124);
}

.cards button {
    background: none;
    border: none;
}

.card button:hover {
    cursor: pointer;
}

.cards .cards_info {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.cards .cards_info .img {
    height: 50px;
    width: 50px;
}

.cards .cards_info .img img {
    height: 50px;
    width: 50px;
    object-fit: cover;
}

.cards .minutes_and_date {
    padding-right: 10px;
}

    </style>
`;

export class Track extends HTMLElement {
    songs = [];
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = styles
    }

    async loadSong() {
        const url = 'https://spotify23.p.rapidapi.com/artist_singles/?id=2w9zwq3AktTeYYMuhMjju8&offset=0&limit=20';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'a18a772618mshcc0d9686854b3efp19b244jsn3b895f2b3ac7',
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
                ${(this.songs.map((song) => {
                    const {
                        releases: { items },
                    } = song;
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
                })).join('')}
            </div>
        `;
    }
}

customElements.define("track-list", Track);
