import { vinilo, viniloform } from '../types/discotype';
import { deletevinilo, getvinilo } from '../utils/firebase';
import Crearvinilo, { datacosas } from '../components/mainpage/formulario';
import { dispatch } from '../store/index';
import { updatevinilo, addvinilo } from '../utils/firebase';

const formData: viniloform = {
	image: '',
	album: '',
	artista: '',
	precio: '',
	stock: '',
};

class dashboard extends HTMLElement {
	vinilos: vinilo[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		const vinilos = await getvinilo();
		//dispatch(cargarProductoState(this.productos));
		this.render();
	}

	attributeChangedCallback(attrName: any, oldVal: any, newVal: any) {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';

			const title = this.ownerDocument.createElement('h1');
		title.innerText = 'Añade vinilo';
		this.shadowRoot?.appendChild(title);

		const imagevinilo = this.ownerDocument.createElement('input');
		imagevinilo.placeholder = 'portada de la cancion';
		imagevinilo.addEventListener('change', this.changeimage);
		this.shadowRoot?.appendChild(imagevinilo);

		const albumvinilo = this.ownerDocument.createElement('input');
		albumvinilo.placeholder = 'album de la cancion';
		albumvinilo.addEventListener('change', this.changealbum);
		this.shadowRoot?.appendChild(albumvinilo);

		const artistavinilo = this.ownerDocument.createElement('input');
		artistavinilo.placeholder = 'artista de la cancion';
		artistavinilo.addEventListener('change', this.changeartista);
		this.shadowRoot?.appendChild(artistavinilo);

		const preciovinilo = this.ownerDocument.createElement('input');
		preciovinilo.placeholder = 'precio de la cancion';
		preciovinilo.addEventListener('change', this.changeprecio);
		this.shadowRoot?.appendChild(preciovinilo);

		const stockvinilo = this.ownerDocument.createElement('input');
		stockvinilo.placeholder = 'stock de la cancion';
		stockvinilo.addEventListener('change', this.changestock);
		this.shadowRoot?.appendChild(stockvinilo);

		const save = this.ownerDocument.createElement('button');
		save.innerText = 'Guardar';
		save.addEventListener('click', async () => {
			console.log('Datos Formulario', formData);
			await addvinilo(formData);
			this.vinilos = await getvinilo();
			this.render();
		});
		this.shadowRoot?.appendChild(save);

		const refresh = this.ownerDocument.createElement('button');
		refresh.innerText = 'refreash';
		refresh.addEventListener('click', async () => {
			this.vinilos = await getvinilo();
			this.render();
		});
		this.shadowRoot?.appendChild(refresh);

			this.vinilos.forEach((vinilo: vinilo) => {

				const container = this.ownerDocument.createElement('section');

				const itemvinilo = this.ownerDocument.createElement('crear-vinilo') as Crearvinilo;
				itemvinilo.setAttribute(datacosas.image, vinilo.image);
                itemvinilo.setAttribute(datacosas.album, vinilo.album);
                itemvinilo.setAttribute(datacosas.artista, vinilo.artista);
                itemvinilo.setAttribute(datacosas.precio, vinilo.precio);
                itemvinilo.setAttribute(datacosas.stock, vinilo.stock);


				const eliminar = this.ownerDocument.createElement('button');
				eliminar.innerText = 'Eliminar';
				eliminar.setAttribute('data-id', vinilo.id);

				const modificar = this.ownerDocument.createElement('button');
				modificar.innerText = 'Modificar';
				modificar.setAttribute('data-id', vinilo.id);

				eliminar.addEventListener('click', async (e: any) => {
					const id = e.target.getAttribute('data-id');
					console.log('eliminar', id);

					await deletevinilo(id);
					this.vinilos = await getvinilo();

					this.render();
				});

				modificar.addEventListener('click', async (e: any) => {
					const id = e.target.getAttribute('data-id');
					console.log('modificar', id);

					//Llamar la acion para ir screen de modificar
					dispatch(updatevinilo(id));
				});
				container.appendChild(itemvinilo);
				container.appendChild(modificar);
				container.appendChild(eliminar);
				this.shadowRoot?.appendChild(container);
				
			});
			
		}
	}
	changeimage(e: any) {
		formData.image = e?.target?.value;
	}
	changealbum(e: any) {
		formData.album = e?.target?.value;
	}
	changeartista(e: any) {
		formData.artista = e?.target?.value;
	}
	changeprecio(e: any) {
		formData.precio = e?.target?.value;
	}
	changestock(e: any) {
		formData.stock = e?.target?.value;
	}
}

customElements.define('create-dashboard', dashboard);
export default dashboard;