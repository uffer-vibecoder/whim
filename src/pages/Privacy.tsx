import { Link } from "react-router-dom";

const UPDATED = "June 17, 2026";

export default function Privacy() {
  return (
    <>
      <Link to="/" className="back">
        ← Back to the store
      </Link>

      <h1 className="section-title" style={{ fontSize: 30 }}>
        🔐 Privacy Policy
      </h1>
      <p style={{ color: "var(--ink-soft)", fontWeight: 700, marginTop: 0 }}>
        Last updated: {UPDATED}
      </p>

      <div className="strike-note" style={{ marginBottom: 18 }}>
        💚 The short version: whim is a free parody site. We don't sell anything, never take
        payment, and don't want your financial info. An account is optional. We show one ad
        (Google AdSense), which uses cookies — you can opt out anytime (see below).
      </div>

      <h2 className="section-title">Who we are</h2>
      <div className="panel" style={{ marginBottom: 18 }}>
        <p style={{ fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
          whim ("whim," "we," "us") is a parody and entertainment website at{" "}
          <b>trywhim.fun</b>. It simulates online shopping for fun — there are no real products,
          no real prices, no inventory, no checkout charges, and nothing is shipped. This policy
          explains what limited information we handle and how.
        </p>
      </div>

      <h2 className="section-title">Information we collect</h2>
      <div className="panel" style={{ marginBottom: 18 }}>
        <div className="perk">
          <span className="dot">•</span>
          <span>
            <b>No account needed.</b> You can browse and "shop" without giving us anything.
          </span>
        </div>
        <div className="perk">
          <span className="dot">•</span>
          <span>
            <b>If you create an account</b> we store a display name and your "daydream history"
            (the pretend orders you place and the money you "saved"). If you choose to sync
            across devices, we also store the email address you provide for sign-in.
          </span>
        </div>
        <div className="perk">
          <span className="dot">•</span>
          <span>
            <b>On your device.</b> We use your browser's local storage to remember your cart,
            your savings tally, and your sound preference. This never leaves your device.
          </span>
        </div>
        <div className="perk" style={{ borderBottom: "none" }}>
          <span className="dot">•</span>
          <span>
            <b>No payment data, ever.</b> Nothing is for sale, so we never collect or process
            card numbers or billing details. The checkout "card" field is a prop.
          </span>
        </div>
      </div>

      <h2 className="section-title">How accounts are stored</h2>
      <div className="panel" style={{ marginBottom: 18 }}>
        <p style={{ fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
          Account data is stored with our hosting/database provider,{" "}
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--purple)", fontWeight: 800 }}
          >
            Supabase
          </a>
          , and is protected so that you can only access your own records. You can delete your
          account and its data at any time by emailing us (below).
        </p>
      </div>

      <h2 className="section-title">Cookies & advertising</h2>
      <div className="panel" style={{ marginBottom: 18 }}>
        <p style={{ fontWeight: 700, lineHeight: 1.6, marginTop: 0 }}>
          whim is free and supported by a single, clearly-labeled ad served by{" "}
          <b>Google AdSense</b>. To do this:
        </p>
        <div className="perk">
          <span className="dot">•</span>
          <span>
            Third-party vendors, including Google, use cookies to serve ads based on your prior
            visits to whim and other websites.
          </span>
        </div>
        <div className="perk">
          <span className="dot">•</span>
          <span>
            Google's use of advertising cookies enables it and its partners to serve ads to you
            based on your visit to whim and/or other sites on the internet.
          </span>
        </div>
        <div className="perk" style={{ borderBottom: "none" }}>
          <span className="dot">•</span>
          <span>
            You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--purple)", fontWeight: 800 }}
            >
              Google Ads Settings
            </a>
            . You can also opt out of some third-party vendors' use of cookies at{" "}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--purple)", fontWeight: 800 }}
            >
              aboutads.info
            </a>
            .
          </span>
        </div>
        <p style={{ fontWeight: 700, lineHeight: 1.6, marginBottom: 0 }}>
          For more on how Google uses information from sites that use its services, see{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--purple)", fontWeight: 800 }}
          >
            Google's partner-sites policy
          </a>
          .
        </p>
      </div>

      <h2 className="section-title">Your choices</h2>
      <div className="panel" style={{ marginBottom: 18 }}>
        <div className="perk">
          <span className="dot">•</span> Use whim without an account, or delete your account
          anytime.
        </div>
        <div className="perk">
          <span className="dot">•</span> Clear your browser's local storage to reset your cart,
          tally, and preferences.
        </div>
        <div className="perk" style={{ borderBottom: "none" }}>
          <span className="dot">•</span> Opt out of personalized ads using the links above.
        </div>
      </div>

      <h2 className="section-title">Children</h2>
      <div className="panel" style={{ marginBottom: 18 }}>
        <p style={{ fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
          whim is not directed to children under 13, and we do not knowingly collect personal
          information from them.
        </p>
      </div>

      <h2 className="section-title">Changes & contact</h2>
      <div className="panel">
        <p style={{ fontWeight: 700, lineHeight: 1.6, marginTop: 0 }}>
          We may update this policy from time to time; we'll revise the "last updated" date
          above when we do. Questions or requests? Email{" "}
          <a href="mailto:hello@trywhim.fun" style={{ color: "var(--purple)", fontWeight: 800 }}>
            hello@trywhim.fun
          </a>
          .
        </p>
        <Link to="/about" className="btn ghost" style={{ marginTop: 8 }}>
          Read the About page →
        </Link>
      </div>
    </>
  );
}
