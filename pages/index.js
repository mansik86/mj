import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Home({ posts }) {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>작업일지</h1>
      <ul style={{ lineHeight: 2 }}>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/${post.slug}`}>{post.slug}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const posts = files.map(f => ({ slug: f.replace(/\.md$/, '') })).sort((a, b) => b.slug.localeCompare(a.slug));
  return { props: { posts } };
}