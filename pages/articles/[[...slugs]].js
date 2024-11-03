import { useRouter } from "next/router";

export default function article() {
  const { query } = useRouter();
  const slug = query.slugs || [];
  console.log(slug);
  if (slug.length > 1) {
    return (
      <>
        <h1>{slug[4]}</h1>
        <h3>
          this article written by {slug[0]} at {slug[1]}/{slug[2]}/{slug[3]}
        </h3>
      </>
    );
  }
  return <div>article</div>;
}
