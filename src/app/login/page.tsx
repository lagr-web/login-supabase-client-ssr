"use client";

import { createClient } from '@/utils/client';
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {

    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const notLoggedIn = useRef<HTMLDivElement | null>(null);

    const supabase = createClient();

    const handleSignIn = async () => {

        const { data, error } = await supabase.auth.signInWithPassword({

            email,
            password

        })

        if (data.user != null) {

            router.push('/admin');

        } else {

            if (notLoggedIn.current) {

                notLoggedIn.current.style.display = "block"
            }

            router.refresh();

        }

        //return data;

    }

    const handleSignUp = async () => {

        await supabase.auth.signUp({
            email,
            password
        })
    }


    return (
        <>
            <div className="container mx-auto p-5 my-10 w-96 shadow-md" >

                <div className="mb-4">
                    <label>Email</label>
                    <input
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="mb-6">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="flex justify-center">
                    <button onClick={handleSignUp}>Sign up</button>
                    <button onClick={handleSignIn}>Sign in</button>
                    {/*  <button onClick={handleSignOut}>Sign out</button> */}
                </div>
                <div ref={notLoggedIn} id="feedback">Fejl i login</div>
            </div >
        </>
    )
}

export default Page;