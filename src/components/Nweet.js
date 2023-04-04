import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { dbService } from './../fbase';
import { useState } from 'react';

function Nweet({ nweetObj, isOwner }) {
    //edit을 진행중인지 나타내는 boolean 상태값
    const [editing, setEditing] = useState(false);
    //수정할 nweet의 input 상태값
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    // 리터럴
    const nweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

    //delete
    const onDeleteClick = async () => {
        const ok = window.confirm("정말 삭제하시겠습니까?");
        console.log(ok);
        if(ok){
            await deleteDoc(nweetTextRef);
        }
    }

    //update
    const toggleEditing = () => {
        setEditing(prev => !prev);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(nweetTextRef, {
            text: newNweet,
        });
        setEditing(prev => !prev);
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    }

    return (
        <div>{
            editing ? (
            <>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text"
                        placeholder="Edit your nweet"
                        value={newNweet} 
                        onChange={onChange}
                        required
                    />
                    <input type="submit" value="Update Nweet"/>
                </form>
                <button onClick={toggleEditing}>취소</button>
            </>
            ) : (
            <>
                <h4>{nweetObj.text}</h4>
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>삭제</button>
                        <button onClick={toggleEditing}>수정</button>
                    </>
                )}
            </>
            )
        }</div>
    )
}

export default Nweet;
