import { Leaf } from "lucide-react";

const MESSAGES = [
  "Soins 100% naturels",
  "Fabriqué en France",
  "Cruelty free",
  "Livraison offerte dès 60€",
  "Sans ingrédients nocifs",
  "Satisfait ou remboursé",
];

export function MarqueeBand() {
  return (
    <div className="overflow-hidden bg-[#0e3927] py-3">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul className="flex shrink-0 items-center" key={copy}>
            {MESSAGES.map((message) => (
              <li
                className="flex items-center gap-3 whitespace-nowrap px-6 text-xs font-medium tracking-[0.12em] text-white uppercase sm:text-sm"
                key={message}
              >
                <Leaf className="size-3 shrink-0 text-[#a77d38]" strokeWidth={1.5} />
                {message}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
