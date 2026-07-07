import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";

export default function NotFoundPage() {
  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center">
      <span className="font-display text-8xl font-bold text-primary/20">404</span>
      <h1 className="mt-4 font-display text-3xl font-semibold text-foreground">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you're looking for doesn't exist. Let's get you back home.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Back to Home</Link>
      </Button>
    </Container>
  );
}
