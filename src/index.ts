import "./components/export"
import styles from "./abuelo.css"
import { addObserver, appState } from "./store";
import { PANTALLAS } from "./types/enumeraciones";
import dashboard from "./screens/dashboard";
console.log(dashboard);

class appContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			const csscardfollow = this.ownerDocument.createElement('style');
			csscardfollow.innerHTML = styles;
			this.shadowRoot?.appendChild(csscardfollow);

			switch (appState.screen) {
				case PANTALLAS.DASHBOARD:
					const pantallaprincipal = this.ownerDocument.createElement('create-dashboard') as dashboard;

					this.shadowRoot.appendChild(pantallaprincipal);
					break;
			
				default:
					break;
			}
		}
	}
}

window.customElements.define('app-container', appContainer);