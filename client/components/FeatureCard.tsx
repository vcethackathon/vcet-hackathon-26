type FeatureCardProps = {
  title: string;
  description: string;
  tag: string;
};

export default function FeatureCard({ title, description, tag }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <div className="pill">{tag}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  );
}
