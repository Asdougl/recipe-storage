import firebase from 'firebase/app'

export interface User {
    username: string;
    name: string;
    uuid: string;
    joinedOn: firebase.firestore.Timestamp;
}

export type ProtoUser = Pick<User, 'name' | 'uuid' | 'joinedOn'>