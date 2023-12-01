import { signOut, useSession } from "next-auth/react";
import styles from "@/styles/Demo.module.css";
import style from "@/styles/Home.module.css";
import Image from "next/image";
import { Data } from "@/lib/zkapp_client";
import { useMinaContext } from "@/context/MinaContext";

const { addUser } = await import("@/lib/mina");

export default function UserDashboard() {
    let { data: session } = useSession();
    const { state } = useMinaContext();

    if (!session) {
        session = {
            user: {
                image: "/assets/profile.png",
                name: "Dummy Profile",
                email: "Dummyprofile@gmail.com"
            },
            expires: "1000"
        }
    }

    const trigger = async () => {
        try {
            if (state.walletConnected) {
                await addUser(state.publicKey58, session?.user as Data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.flex}>
            {session?.user && (
                <>
                    {session.user.image && (
                        <Image
                            src={session.user.image}
                            width={50}
                            height={60}
                            alt="image"
                        />
                    )}
                    <button onClick={() => signOut({ callbackUrl: "/demo/authenticate" })} className={styles.logout}>
                        <Image
                            src="/assets/log-out.svg"
                            width={25}
                            height={25}
                            alt="log-out"
                        />
                    </button>
                    <div>
                        <small>Signed in as</small>
                        <br />
                        <strong>{session.user.name}</strong>
                        <br />
                        <strong>{session.user.email}</strong>
                    </div>
                    <button className={style.button} onClick={() => trigger()}>
                        Generate Proof
                    </button>
                </>
            )}
        </div>
    )
}