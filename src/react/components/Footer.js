import React      from "react";
import text       from "../styles/text.css";
import { Link } from 'react-router-dom';
import styles from "../styles/footer.css";

export default class Footer extends React.Component {

    render() {

        const backgroundImage = {
            backgroundImage: `url(${this.props.backgroundImage})`
        };

        return (
            <section className={styles.footer + " footer"}>
                <div className="row">
                    <div className={styles.link + " col col-xs-12"}>
                        <Link to="/login"><p className={text.footerText}>Login</p></Link>
                        <Link to="/signup"><p className={text.footerText}>Sign Up</p></Link>
                    </div>
                </div>
            </section>
        );
    }
}

