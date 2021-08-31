import { collection, doc, query, where } from '@firebase/firestore';
import { getDocs, QuerySnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { db } from './firebase';

const GetAllUserData = (user_uid) =>{
    var profile = {
        lastName: "",
        firstName: "",
        u_id: ""
    }
    const q = query(collection(db,'Users'),where("u_id","==",`${user_uid}`));
    getDocs(q).then(querySnapshot => {
        querySnapshot.forEach(doc => {
                                profile = doc.data();
                            })
                            // console.log(profile);
                            return profile;
                        }
                );
}

export { GetAllUserData };