import { signOut, useSession } from "next-auth/react";
import styles from "../styles/Demo.module.css";
import style from "../styles/Home.module.css"
import Image from "next/image";

export default function UserDashboard() {
    let { data: session } = useSession();
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
                    <div>
                        <small>Signed in as</small>
                        <br />
                        <strong>{session.user.name}</strong>
                        <br />
                        <strong>{session.user.email}</strong>
                    </div>
                    <button className={style.button}>
                        Generate Proof
                    </button>
                    {/* <a
                        href={`/api/auth/signout`}
                        className={styles.button}
                        onClick={(e) => {
                            e.preventDefault()
                            signOut()
                        }}
                    >
                        Sign out
                    </a> */}
                </>
            )}
        </div>
    )
}