"use client";

import { createClient } from '@/utils/client';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {

    const [myuser, setMyUser] = useState<any | null>(null);

    const router = useRouter();

    const supabase = createClient();


    const handleSignOut = async () => {

        const data = await supabase.auth.signOut();

        router.refresh();

        router.push('/login');
    }



    useEffect(() => {

        (async () => {

            const { data: { user } } = await supabase.auth.getUser();

            console.log(user);

            if (user) {

                setMyUser(user);

            } else {

                router.push('/login');

            }

        })()


    }, [])


    return (

        <>
            <nav>

                {myuser && (

                    <div className="flex justify-end">
                        <div>
                            <span className="text-gray-400 inline-block align-bottom">Allo, {myuser.email}</span>
                            {/*  <LogoutButton /> */}
                            <button onClick={((handleSignOut))}>Sign out</button>
                        </div>
                    </div>
                )
                }


            </nav>

            <section>

                {myuser && (

                    <div>allo, heres some secret stuff...</div>
                )
                }

            </section>

        </>
    )
}

export default Page;