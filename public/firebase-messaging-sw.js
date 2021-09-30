importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

// Initialize Firebase Service Worker
let firebaseConfig = {
    apiKey: "AIzaSyDcO66arFwaWHVYAWpGciqGGQV9cOGJM2Q",
    authDomain: "alarm-1830c.firebaseapp.com",
    projectId: "alarm-1830c",
    storageBucket: "alarm-1830c.appspot.com",
    messagingSenderId: "831418413127",
    appId: "1:831418413127:web:d4fc457e510db7556cc162",
    measurementId: "G-6YP6W2WJ89"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

//크롬에서만 동작함..
const channel = new BroadcastChannel('fcm-background');

messaging.onBackgroundMessage((payload) => {
    /*console.log('백그라운드 메시지 처리', payload);
    self.registration.showNotification('notiTitle',
      {body : "테스트"});*/

    //서비스워커에서 채널을 통해 클라이언트로 데이터를 전달함..
    channel.postMessage(payload);
  });