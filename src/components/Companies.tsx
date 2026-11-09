import { experiences } from "@/lib/data";
import { Container, Kicker } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

/* A quiet proof row, like a "works with" strip: everywhere I've shipped. */
export default function Companies() {
  const companies = Array.from(new Set(experiences.map((e) => e.company)));

  return (
    <section aria-label="Where I've worked" className="py-14 sm:py-16">
      <Container>
        <Reveal className="flex flex-col items-center">
          <Kicker>Built backends at</Kicker>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
            {companies.map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink-2"
              >
                <span
                  aria-hidden="true"
                  className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-[#e4e9f8] to-[#cdd6f1] text-[0.625rem] font-semibold text-[#3a4a85]"
                >
                  {name[0]}
                </span>
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
