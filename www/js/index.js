import {credentials} from '../credentials.js';

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

async function onDeviceReady() {

  const firebaseConfig = {
    apiKey: credentials.apiKey,
    authDomain: credentials.authDomain,
    databaseURL: credentials.databaseURL,
    projectId: credentials.projectId,
    storageBucket: credentials.storageBucket,
    messagingSenderId: credentials.messagingSenderId,
    appId: credentials.appId,
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  const shows = db.collection('shows');
  let data = await shows.get()
  let arrDatos = data.docs.map( doc => doc).sort((a,b) => a.data().nombre - b.data().nombre).map(
      d => (
      `<tr>
        <td>${d.id}</td>
        <td>${d.data().nombre}/${d.data().genres}</td>
        <td>${d.data().target}</td>
        <td>${d.data().network}</td>
        <td>${d.data().isCurrent ? 'Sí' : 'No'}</td>
      </tr>`
      )

  )
  document.getElementById('lst-programas').innerHTML = arrDatos.join('')
  
}