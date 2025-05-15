"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const AboutSolarHashToken = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="about-solar-hash" className="pt-32 pb-20 px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mb-12"
      >
        <h2 className="text-4xl text-amber-300 font-bold mb-4">
          About Solar Hash Token
        </h2>
        <p className="text-lg text-teal-300 talic">
          A Vision for a Sustainable Future!
        </p>
      </motion.div>

      <div
        className="max-w-4xl  space-y-6 text-base leading-relaxed"
        data-aos="fade-up"
      >
        <p>
          The story of the Solar Hash Token began with a simple idea: a small
          Bitcoin mining farm that we built with passion and dedication.
          However, like many in the crypto space, we faced significant
          challenges when a major market crash rendered our operations
          unprofitable in 2021–2022.
        </p>

        <p>
          Instead of giving up, we made a bold decision in early 2023: we
          transitioned our entire mining operation to solar energy, slashing
          electricity costs to nearly zero and embracing a sustainable approach
          that made mining viable again.
        </p>

        <p>
          This success inspired us to dream bigger. We envisioned a 500 kW solar
          project to benefit the nearby village, aiming to provide clean energy
          and support the local economy. Despite our determination and a solid
          portfolio, the project failed to materialize due to a lack of
          investors. Additionally, we were repeatedly targeted by spammers and
          fraud attempts, which further hindered our progress.
        </p>

        <p>
          These setbacks shaped us and ignited a new vision! Through our growing
          community, we discovered other innovative project ideas that could
          make a real difference, but were unable to move forward due to a lack
          of funding.
        </p>

        <p>
          The <strong>Solar Hash Token</strong> was born. Its mission is to
          support and even fully fund solar energy projects around the globe,
          enabling the shift to clean energy and building a greener future. At
          the same time, we aim to provide real value to our investors and
          supporters: holders of the Solar Hash Token will gain access to
          low-cost hosting opportunities for mining operations powered by
          renewable energy.
        </p>

        <p>
          Our approach combines economic innovation with environmental
          responsibility. Through the Solar Hash Token, we want to go beyond
          financing clean energy projects—we aspire to create a strong, engaged
          community that actively contributes to combating climate change.
        </p>

        <p>
          <strong>
            Together, we can break down barriers and bring to life projects that
            would otherwise remain unrealized.
          </strong>
        </p>
      </div>
    </section>
  );
};

export default AboutSolarHashToken;
