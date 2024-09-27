import React, {ReactElement} from "react";
import styles from "./Home.module.scss";


const Home = (): ReactElement => {
    return (
        <main className={styles.main}>
        <section className={"hero"}>
            <h2>this is the home page</h2>
        </section>
        </main>

    );
}

export default Home;