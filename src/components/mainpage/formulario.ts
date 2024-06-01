import styles from './formulario.css';
export enum datacosas {
	'image' = 'image',
    'album' = 'album',
    'artista' = 'artista',
	'precio' = 'precio',
	'stock' = 'stock',
}

class Crearvinilo extends HTMLElement {
	image?: string;
    album?: string;
    artista?: string;
    precio?: string;
    stock?: string;


	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const fijateEn: Record<datacosas, null> = {
			image: null,
			album: null,
			artista: null,
			precio: null,
			stock: null,
		};
		return Object.keys(fijateEn);
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(attrName: datacosas, oldVal: any, newVal: any) {
		switch (attrName) {
			default:
				this[attrName] = newVal;
				break;
		}
	}

	render() {
		if (this.shadowRoot) {
			const wrapper = this.ownerDocument.createElement('div');
			wrapper.className = 'wrapper';

			const imagenvinilo = this.ownerDocument.createElement('img');
			imagenvinilo.setAttribute('src', `${this.image}`);
			wrapper.appendChild(imagenvinilo);

			const albumvinilo = this.ownerDocument.createElement('h3');
			albumvinilo.innerText = this.album!;
			wrapper.appendChild(albumvinilo);

            const artistavinilo = this.ownerDocument.createElement('h3');
			artistavinilo.innerText = this.artista!;
			wrapper.appendChild(artistavinilo);

            const preciovinilo = this.ownerDocument.createElement('h3');
			preciovinilo.innerText = this.precio!;
			wrapper.appendChild(preciovinilo);

            const stockvinilo = this.ownerDocument.createElement('h3');
			stockvinilo.innerText = this.stock!;
			wrapper.appendChild(stockvinilo);

			

			this.shadowRoot.appendChild(wrapper);
		}
		const cssprofile = this.ownerDocument.createElement('style');
		cssprofile.innerHTML = styles;
		this.shadowRoot?.appendChild(cssprofile);
	}
}

window.customElements.define('crear-vinilo', Crearvinilo);

export default Crearvinilo;