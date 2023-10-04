import * as React from "react";
import AnimationPage from "components/AnimationPage";
import Button from "components/Button";
import PageLabel from "components/PageLabel";
import Text, { TextColor, TextView, TextWeight } from "components/Text";
import { GITHUB_LINK } from "config/globalConstants";
import Logo from "styles/svg/logo.svg";
import styles from "./About.module.scss";

const About: React.FC = () => {
  return (
    <AnimationPage className={styles["about-page"]}>
      <PageLabel title="About Us" description=" " />
      <div className={styles.about}>
        <Logo className={styles.about__logo} />
        <div className={styles.about__main}>
          <Text
            view={TextView.title}
            weight={TextWeight.medium}
            color={TextColor.accent}
          >
            Lalasia: Your Home, Your Style
          </Text>
          <div className={styles["about__main__sub-title"]}>
            <Text view={TextView.p20}>
              <b className={styles["about_b-tab"]}>Welcome to Lalasia</b>, your
              ultimate destination for all things home and lifestyle. At
              Lalasia, we believe that your home is a reflection of your unique
              style and personality, and we&apos;re here to help you create the
              perfect sanctuary that truly embodies your individuality.
            </Text>

            <Text view={TextView.p20}>
              <b className={styles["about_b-tab"]}>Our vision at Lalasia</b> is
              to inspire and enable every individual to transform their living
              spaces into havens of comfort, functionality, and beauty. We are
              committed to providing the finest selection of home and lifestyle
              products, carefully curated to cater to every taste and
              preference.
            </Text>
            <Text view={TextView.p20}>
              <b className={styles["about_b-tab"]}>Our Passion at Lalasia</b> is
              passionate about helping you create the home of your dreams.
              Whether you&apos;re looking to revamp your living room, upgrade
              your kitchen, or add a touch of greenery to your space, we&apos;ve
              got you covered.
            </Text>
          </div>
        </div>
      </div>

      <div className={styles.links}>
        <Button onClick={() => window.open(GITHUB_LINK)}>Github repo</Button>
      </div>
    </AnimationPage>
  );
};

export default About;
