import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { vinilo, viniloform, Coleccion } from '../types/discotype';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addvinilo = async (vinilo: viniloform) => {
	try {
		const coleccion = collection(db, Coleccion.vinilos);
		await addDoc(coleccion, vinilo);
		console.log('se añadió con éxito', vinilo);
	} catch (error) {
		console.error(error);
	}
};

export const updatevinilo = async (vinilo: vinilo) => {
	try {
		const coleccion = collection(db, Coleccion.vinilos);
		const documento = doc(coleccion, vinilo.id);
		await updateDoc(documento, vinilo);
		console.log('se actualizó con éxito', vinilo);
	} catch (error) {
		console.error(error);
	}
};

export const deletevinilo = async (id: string) => {
	try {
		const coleccion = collection(db, Coleccion.vinilos);
		const documento = doc(coleccion, id);
		await deleteDoc(documento);
		console.log('se eliminó con éxito', id);
	} catch (error) {
		console.error(error);
	}
};

export const getvinilo = async (): Promise<vinilo[]> => {
	const coleccion = collection(db, Coleccion.vinilos);
	const querySnapshot = await getDocs(coleccion);
	//const querySnapshot = await getDocs(collection(db, Coleccion.PLAYLIST));
	const cancionesArray: Array<vinilo> = [];

	querySnapshot.forEach((doc) => {
		const payload: viniloform = doc.data() as viniloform;
		cancionesArray.push({ id: doc.id, ...payload });
	});

	return cancionesArray;
};
