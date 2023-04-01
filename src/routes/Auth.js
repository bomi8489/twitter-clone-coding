import React, { useState } from "react";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
 } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            let data;
            const auth = getAuth();
            if(newAccount){
                data = await createUserWithEmailAndPassword(auth, email, password)
            } else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={onChange}
                    required
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={onChange}
                    required
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;