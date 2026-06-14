import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export default function Post({ content }) {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif', lineHeight: 1.8 }}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return { props: { content: processed.toString() } };
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  return {
    paths: files.map(f => ({ params: { slug: f.replace(/\.md$/, '') } })),
    fallback: false,
  };
}