import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="w-full border-b border-border py-3 px-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
        >
          Wuhdul
        </Link>
        <Link
          to="/"
          className="text-xs font-mono tracking-wider text-muted-foreground hover:text-foreground transition-colors uppercase"
        >
          Back
        </Link>
      </header>

      <main className="max-w-xl mx-auto px-6 py-12 sm:py-16">
        <h1
          className="text-2xl font-bold lowercase mb-8 animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          about
        </h1>

        <div className="space-y-5 text-base leading-relaxed lowercase">
          <p className="animate-fade-up" style={{ animationDelay: "80ms" }}>
            hey, i'm harshith.
          </p>
          <p className="animate-fade-up" style={{ animationDelay: "160ms" }}>
            i'm 19, a first year CS student. i spend most of my time building
            things, mostly small web projects that i find interesting.
          </p>
          <p className="animate-fade-up" style={{ animationDelay: "240ms" }}>
            i like working on clean interfaces, simple ideas, and turning them
            into something usable. wuhdul is one of those projects, just
            something i built and kept refining.
          </p>
          <p className="animate-fade-up" style={{ animationDelay: "320ms" }}>
            outside of that, i've been involved in leadership roles,
            volunteering, and sports.
          </p>
        </div>

        <section className="mt-10 animate-fade-up" style={{ animationDelay: "400ms" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3">links</h2>
          <ul className="space-y-1 text-base lowercase">
            <li>
              github:{" "}
              <a
                href="https://github.com/progharshith"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground hover:text-muted-foreground transition-colors"
              >
                https://github.com/progharshith
              </a>
            </li>
            <li>
              linkedin:{" "}
              <a
                href="https://www.linkedin.com/in/harshithgupta/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground hover:text-muted-foreground transition-colors"
              >
                https://www.linkedin.com/in/harshithgupta
              </a>
            </li>
          </ul>
        </section>

        <section
          className="mt-10 border-t border-border pt-6 animate-fade-up"
          style={{ animationDelay: "480ms" }}
        >
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3">note</h2>
          <p className="text-base lowercase">i'll keep building more stuff.</p>
        </section>
      </main>
    </div>
  );
};

export default About;