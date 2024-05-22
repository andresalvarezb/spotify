export class Reproductor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = /*html */ `
        <link rel="stylesheet" href="./src/css/normalize.css">
        <link rel="stylesheet" href="./src/css/bases.css">
        <link rel="stylesheet" href="./src/css/Reproductor.css">
        `;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML += /*html */ `
        <header class="header">
            <div>
                <h3>Now Playing</h3>
            </div>
        </header>
        <div class="SongInfo">
            <div class="SongImage">
                <img src="src/storage/img/image 20.png" alt="">
            </div>
            <div class="UserOptions">
                <div> <box-icon name='plus' color='#9bd8b5'></box-icon> </div>
                <div class="songName">
                    <h3> Money Machine </h3>
                    <h6> 1000 Gecks </h6>
                </div>
                <div> <box-icon name='heart' color='#9bd8b5' ></box-icon> </div>
            </div>
        </div>
        <div class="mediaOptions">
            <div class="musicTimeline">
                <div class="musicTime">
                    <p>2:14</p>
                    <p>-1:15</p>
                </div>
                <div class="progressMusic">
                    <progress class="progress" value="214" max="329"></progress>
                </div>
            </div>
            <div class="mediaControl">
                <box-icon name='shuffle' flip='vertical' color='#828282' ></box-icon>
                <box-icon name='rewind' flip='vertical' color='#27ae60' size='lg' ></box-icon>
                <box-icon name='play-circle' color='#27ae60' size='lg'></box-icon>
                <box-icon name='rewind' rotate='180' color='#27ae60' size='lg'></box-icon>
                <box-icon name='repeat' color='#828282'></box-icon>
            </div>
            <div class="volumeControl">
                <box-icon name='volume-low' color='#828282'></box-icon>
                <progress class="progress" value="214" max="329"></progress>
                <box-icon name='volume-full' color='#828282' ></box-icon>
            </div>
            <div class="deviceOutput">
                <div><box-icon name='headphone' color='#828282' ></box-icon>
                    <p>Airpods Pro (Dave)</p>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('mi-reproductor', Reproductor)
