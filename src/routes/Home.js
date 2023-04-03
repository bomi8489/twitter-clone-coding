import { 
    addDoc, 
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import { dbService } from './../fbase';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        const nweetQuery = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );

        // onSnapShot: realtime (실시간)
        onSnapshot(nweetQuery, (snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => (
            {
                id: doc.id,
                ...doc.data(),
            }
            ));
            setNweets(nweetArray);
        });
    }, [])

    // form 제출시 firestore db에 추가
    const onSubmit = async (event) => {
        event.preventDefault();

        // firestore에 collection > document 추가
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        })
        setNweet("");
    }

    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setNweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                    onChange={onChange}
                    value={nweet}
                />
                <input 
                    type="submit"
                    value="Nweet"
                />
            </form>
            <div>
                {nweets.map(nweet => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;