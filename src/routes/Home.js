import { 
    addDoc, 
    collection,
    getDocs,
    query,
} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import { dbService } from './../fbase';

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweetArray, setNweetArray] = useState([]);

    const getNweets = async () => {
        const nweetQuery = query(collection(dbService, "nweets"));
        const dbNweets = await getDocs(nweetQuery);
        dbNweets.forEach((document) => {
            const nweetObj = {
                ...document.data(),
                id: document.id,
            };
            setNweetArray(prev => [nweetObj, ...prev]);
        });
    }

    useEffect(() => {
        getNweets();
    }, [])

    // nweet form 제출시 firestore db에 추가
    const onSubmit = async (event) => {
        event.preventDefault();

        // firestore 에 collection > document 추가
        await addDoc(collection(dbService, "nweets"), {
            nweet,
            createAt: Date.now(),
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
                {nweetArray.map(nweet => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;