export class NewMusic extends HTMLElement {
    dataMusic=[]
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = /*html */ `
        <link rel="stylesheet" href="./src/css/normalize.css">
        <link rel="stylesheet" href="./src/css/bases.css">
        <link rel="stylesheet" href="./src/css/NewMusic.css">
        `;
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
        this.shadowRoot.innerHTML = /*html */ `
            <div class="container">
                    ${this.dataMusic.map(
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
                    )}
            </div>
        `;
    }
}

customElements.define('new-music', NewMusic)