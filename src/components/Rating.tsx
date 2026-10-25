export default function Rating({ value }: { value: number }) {
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5 stars`}>
      <span aria-hidden="true">{'★'.repeat(Math.round(value))}{'☆'.repeat(5 - Math.round(value))}</span>
      <span className="rating-value">{value.toFixed(1)}</span>
    </span>
  );
}
