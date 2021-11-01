import { getMarkdownDocuments, MarkdownDocument } from '@pellegrims/markdown';
import { POSTS_PATH } from '../constants';
import BlogArticleList from '../components/blog-article-list';
import Container from '../components/container';

export interface BlogProps {
  posts: MarkdownDocument[];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <Container>
      <BlogArticleList posts={posts} title="Blog" path="/blog" />
    </Container>
  );
}

export const getStaticProps = async () => {
  const posts = getMarkdownDocuments(POSTS_PATH);
  return { props: { posts } };
};
