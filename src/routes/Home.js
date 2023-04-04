import Nweet from "components/Nweet";
import { 
    addDoc, 
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import { dbService } from './../fbase';

// userObj prop은 App 컴포넌트에서 user가 로그인하면 받는 user정보
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    /*
    onSnapShot는 Firebase의 Cloud Firestore에서 제공하는 메소드로 실시간 업데이트를 처리하기 위해 사용.
    onSnapshot 메서드는 callback 함수를 등록하고 해당 callback 함수는 
    document나 collection의 변경사항이 발생할 때마다 호출.
    따라서, useEffect의 두번째 인자로 빈 배열을 전달하면 effect함수는 컴포넌트 마운트시
    한번만 실행되고, onSnapShot 메서드가 document나 collection의 변경 사항이 발생될 때마다
    등록된 callback 함수가 호출되는 Firebase SDK가 내부적으로 구현한 메커니즘.
    */
    useEffect(() => {
        const nweetQuery = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        // onSnapShot: realtime (실시간), crud중 어떤 작업을 해도 snapshot으로 볼 수 있음
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
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet} 
                        // nweet의 id와 로그인한유저 id가 같으면 true
                        isOwner={nweet.creatorId === userObj.uid} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;