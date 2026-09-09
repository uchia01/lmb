import Image from 'next/image';
import AboutBurnIntro from '@/components/lmb/AboutBurnIntro';

export default function About() {
  return (
    <section className="lmb-about" id="about" aria-labelledby="about-title">
      <AboutBurnIntro />

      <figure className="lmb-about-image-wrap" style={{ position: 'relative' }}>
        <Image
          className="lmb-about-photo"
          src="/images/about-bar-guests.png"
          alt="Friends enjoying handcrafted cocktails together at a live LMB-style bar station"
          fill
          sizes="(max-width: 760px) 100vw, 92vw"
        />
        <div className="lmb-about-image-shade" />
        <figcaption>
          <span>Designed around people</span>
          <strong>The bar becomes the heart of the room.</strong>
        </figcaption>
      </figure>

      <div className="lmb-about-story">
        <article className="lmb-about-panel lmb-about-who lmb-about-scroll">
          <p className="lmb-eyebrow">Who we are</p>
          <h3>Luxury hospitality, shaped behind the bar.</h3>
          <p>LMB Molecular is a luxury mobile bar and mixology studio from Delhi and Agra. We bring together accomplished bartenders, flavour-led menus, and molecular techniques to create bars with a distinct sense of occasion.</p>
          <p>For us, luxury is never about excess. It is thoughtful hospitality: the right glass, the right temperature, graceful service, and a drink remembered long after the celebration ends.</p>
        </article>

        <article className="lmb-about-panel lmb-about-what lmb-about-scroll">
          <p className="lmb-eyebrow">What we do</p>
          <h3>Every detail is designed around the celebration.</h3>
          <p>We shape the complete bar experience—from menu development and presentation to setup, service, and live theatre—around your venue, your guests, and the feeling you want to create.</p>
          <ul aria-label="LMB services">
            <li><span>01</span><strong>Bespoke cocktail menus</strong></li>
            <li><span>02</span><strong>Molecular bar experiences</strong></li>
            <li><span>03</span><strong>Luxury event service</strong></li>
            <li><span>04</span><strong>Interactive drink theatre</strong></li>
          </ul>
        </article>
      </div>
    </section>
  );
}
