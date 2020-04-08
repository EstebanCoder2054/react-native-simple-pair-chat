import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    // this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyC4NQIdDUB34KgbBhUR0OwtOXNOBfNs_S4',
        authDomain: 'chat-appp-react-native.firebaseapp.com',
        databaseURL: 'https://chat-appp-react-native.firebaseio.com',
        projectId: 'chat-appp-react-native',
        storageBucket: 'chat-appp-react-native.appspot.com',
        messagingSenderId: '1054333072848',
        appId: '1:1054333072848:web:ce6c4ab263d37ca3bef5d5',
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };

      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on('child_added', (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref('messages');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
