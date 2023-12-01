import type { InferGetServerSidePropsType } from 'next'
import styles from "../../styles/Demo.module.css";
import style from "../../styles/Home.module.css";
import { getProviders, signIn } from "next-auth/react";
import UserDashboard from '../../components/UserDashboard';
import { useSession } from "next-auth/react"

export default function Authenticate({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { data: session, status } = useSession();
    const loading = status === "unauthenticated";
    return (
        <main className={styles.main}>
            <h2 className={styles.title}>AUTHENTICATE</h2>
            <div className={styles.card}>
                {!session && loading ?
                    (
                        providers &&
                        Object.values(providers).map((provider: any) => (
                            <div key={provider.name} style={{ marginBottom: "5px", padding: "5px" }}>
                                <button className={style.button} onClick={() => signIn(provider.id, { callbackUrl: "/demo/authenticate" })}>
                                    Continue with {provider.name}
                                </button>
                            </div>
                        )))
                    :
                    <UserDashboard />
                }
            </div>
        </main>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
}
