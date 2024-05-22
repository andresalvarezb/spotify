const styles  = /*html */`
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        :root {
            font-family: Arial, Helvetica, sans-serif;
        }
        .container {
            overflow-x: scroll;
            height: 345px;
            width: 315px;
            display:grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 1rem;
        }
        .container::-webkit-scrollbar {
            display: none;
        }
        .boxMusic {
            display: flex;
            flex-direction: column;
            background: #fff;
            cursor: pointer;
        }
        .boxMusic__img {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 98%;
            height: 65%;
            border-radius: 10px;
        }
        .boxMusic__text {
            width: 95%;
            height: 25%;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            padding: 0 5px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-y: hidden;
        }
        .boxMusic__text::-webkit-scrollbar {
            display: none;
        }
        .boxMusic__text p {
            font-size: 0.8em;
            text-transform: capitalize;
            font-weight: 600;
        }
        .boxMusic__text p small {
            text-transform: capitalize;
            font-weight: 480;
            color: #4f4f4f;
        }
    </style>
`

export class NewMusic extends HTMLElement {
    dataMusic=[]
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = styles
    }

    async getData() {
        const url = 'https://spotify23.p.rapidapi.com/recommendations/?limit=5&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b0bd9d759bmshea9903d42541697p1f653ajsnde763a9f28ca',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            var { tracks } = await response.json();
        } catch (error) {
            console.error(error);
        }
        this.dataMusic = tracks.sort((a, b) => b.popularity - a.popularity);
    }

    releaseYear(data) {
        const releaseDateFull = data.album.release_date;
        const year = new Date(releaseDateFull).getFullYear();
        return year;
    }

    async connectedCallback() {
        await this.getData()
        this.shadowRoot.innerHTML += /*html */ `
            <div class="container">
                    ${(this.dataMusic.map(
                        (musicItem) => /*html */ `
                            <div class="boxMusic">
                                <img src=${musicItem.album.images[1].url} class="boxMusic__img" />
                                <div class="boxMusic__text">
                                    <p class="ArtistSong"> 
                                        ${musicItem.name} <br />
                                        <small class="ArtistCompositor">${musicItem.artists[0].name} ${this.releaseYear(musicItem)}</small>
                                    </p>
                                </div>
                            </div>
                        `
                    )).join('')}
            </div>
        `;
    }
}

customElements.define('new-music', NewMusic)