type TestimonialQuoteProps = {
  quote: string;
  attribution: string;
  className?: string;
};

export function TestimonialQuote({ quote, attribution, className }: TestimonialQuoteProps) {
  const paragraphs = quote.split("\n\n");

  return (
    <blockquote className={className}>
      {paragraphs.map((paragraph, index) => (
        <p lang="en" key={index}>
          {index === 0 ? "“" : ""}{paragraph}{index === paragraphs.length - 1 ? "”" : ""}
        </p>
      ))}
      <footer>{attribution}</footer>
    </blockquote>
  );
}
