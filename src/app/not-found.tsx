import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center bg-cream py-32">
      <Container width="narrow" className="text-center">
        <p className="eyebrow text-bordeaux">404</p>
        <h1 className="font-display mt-4 text-4xl font-light sm:text-5xl">
          This bottle isn&rsquo;t in the cellar
        </h1>
        <p className="mt-5 text-stone">
          The page you were looking for has moved or never existed.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/wines" variant="outline">
            See the wines
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
