function VisaMark() {
  return (
    <svg viewBox="0 0 48 16" className="h-4 w-auto" aria-label="Visa">
      <text
        x="0"
        y="13"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="16"
        fill="#1a1f71"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardMark() {
  return (
    <svg viewBox="0 0 36 22" className="h-5 w-auto" aria-label="Mastercard">
      <circle cx="14" cy="11" r="10" fill="#eb001b" />
      <circle cx="24" cy="11" r="10" fill="#f79e1b" />
      <path
        d="M19 3.5a10 10 0 0 1 0 15 10 10 0 0 1 0-15Z"
        fill="#ff5f00"
      />
    </svg>
  );
}

function StripeMark() {
  return (
    <svg viewBox="0 0 56 16" className="h-4 w-auto" aria-label="Stripe">
      <text
        x="0"
        y="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fontSize="15"
        fill="#635bff"
      >
        stripe
      </text>
    </svg>
  );
}

function CmiMark() {
  return (
    <svg viewBox="0 0 40 16" className="h-4 w-auto" aria-label="CMI">
      <text
        x="0"
        y="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="15"
        fill="#00478f"
      >
        CMI
      </text>
      <rect x="0" y="14.5" width="14" height="1.5" fill="#d71920" />
    </svg>
  );
}

export const PAYMENT_METHODS = [
  { label: "Visa", Mark: VisaMark },
  { label: "Mastercard", Mark: MastercardMark },
  { label: "Stripe", Mark: StripeMark },
  { label: "CMI", Mark: CmiMark },
];
