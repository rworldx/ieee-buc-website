import { useId } from "react";

/** Both theme variants use the original transparent artwork without redrawing it. */
export default function BrandLogo() {
  const clipId = useId();
  return (
    <span
      role="img"
      aria-label="IEEE BUC"
      className="brand-logo relative block aspect-[1828/956] w-[104px] shrink-0 sm:w-[116px]"
    >
      {/*
        Apply the dark-theme filter to a complete SVG layer rather than to an
        SVG <image>. Mobile Safari/WebKit can ignore CSS filters on embedded
        SVG images, which left the blue mark almost invisible on the dark
        header. The separate crest layer below remains in full colour.
      */}
      <svg
        viewBox="75 481 1828 956"
        aria-hidden="true"
        className="brand-logo-themed absolute inset-0 size-full"
      >
        <defs>
          <clipPath id={clipId}>
            <path
              clipRule="evenodd"
              d="M0 0H2000V2000H0Z M1580 790H1910V1175H1580Z"
            />
          </clipPath>
        </defs>
        <image
          clipPath={`url(#${clipId})`}
          href="/images/logo.png"
          width="2000"
          height="2000"
        />
      </svg>
      {/* Preserve the university emblem in full color in every theme. */}
      <svg
        viewBox="75 481 1828 956"
        aria-hidden="true"
        className="absolute inset-0 size-full"
      >
        <svg
          x="1580"
          y="790"
          width="330"
          height="385"
          viewBox="1580 790 330 385"
          overflow="hidden"
        >
          {/* The crest's transparent interior must stay white, as on light pages. */}
          <path d="M1630 1100V930a110 110 0 0 1 220 0v170Z" fill="white" />
          <image href="/images/logo.png" width="2000" height="2000" />
        </svg>
      </svg>
    </span>
  );
}
