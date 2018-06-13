import React      from "react";
import styles     from '../styles/home.css';
import text       from "../styles/text.css";

export default class Home extends React.Component {

    render() {

        const homeStyle = {
            marginTop: "216.5px",
            color: "white",
            letterSpacing: "1px",
            marginBottom: "76.5px"
        };

        const welcomeTitle = {
            marginTop: "57px",
            marginBottom: "11.5px",
            color: "#2a475d"
        };

        return (
            <div className="page">
                <section className={styles.hero}>
                    <div className="row">
                        <div className="col col-xs-12">
                            <h1 style={homeStyle} className={text.title}>find elite real<br/> estate agents
                            </h1>
                        </div>
                    </div>
                    <FindAgents/>
                </section>
                <section className={styles.welcome}>
                    <div className="row">
                        <div className="col col-xs-12">
                            <h1 style={welcomeTitle} className={text.title}>Welcome</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className={styles.icons}>
                                <div className={styles.iconHolder}>
                                    <div className={styles.icon}>
                                        <img className={styles.welcomeImg} src="/img/time.png"/>
                                        <h2 className={text.caption}>RELEVANT DATA</h2>
                                    </div>
                                    <div className={styles.icon}>
                                        <img className={styles.welcomeImg} src="/img/results.png"/>
                                        <h2 className={text.caption}>SPEEDY RESULTS</h2>
                                    </div>
                                    <div className={styles.icon}>
                                        <img className={styles.welcomeImg} src="/img/updated.png"/>
                                        <h2 className={text.caption}>CONSTANTLY UPDATED</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xs-12">
                            <p className={styles.welcomeText}>When it’s time to buy or sell your house, how do you find the right real estate agent? Usually it’s word of mouth. Sometimes it’s a name you jot down from a sign or an agent you randomly meet at an open house. But how do you know if they’re really good? How do you know if they have a true pulse on the market and the best bet to help you with one of the biggest decisions in your life?<br/><br/>
                                Leaderboard was created to help identify the top-selling real estate professionals in your town based solely on the numbers. Using unbiased third-party reporting data, we show who the rock stars are. Who is selling the most. Who’s doing the most deals. Who is walking the walk.<br/><br/>
                                We get results. So you get results.</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

