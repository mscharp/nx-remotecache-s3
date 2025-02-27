import { getMarkdownDocuments } from '@pellegrims/shared/markdown';
import { twitterUserName } from '../constants';
import { List, PageTemplate } from '@pellegrims/pellegrims-dev/ui/templates';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { PageHero } from '@pellegrims/pellegrims-dev/ui/molecules';
import {
  BlogArticle,
  BlogArticleProps,
} from '@pellegrims/pellegrims-dev/ui/organisms';
import { sortArticlesByDateDesc } from '../utils/sort';
import { SNIPPETS_PATH } from '../utils/paths';

interface SnippetsProps {
  snippets: BlogArticleProps[];
}

const Snippets: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  snippets,
}) => (
  <PageTemplate
    seoProps={{ title: 'Snippets' }}
    header={
      <PageHero
        title="Snippets"
        description="Short notes for future reference."
      />
    }
  >
    <List items={snippets} render={(article) => <BlogArticle {...article} />} />
  </PageTemplate>
);

export const getStaticProps: GetStaticProps<SnippetsProps> = async () => {
  const snippets = getMarkdownDocuments(SNIPPETS_PATH);

  return {
    props: {
      snippets: snippets
        .map((snippet) => ({
          markDown: snippet,
          twitterUserName,
        }))
        .sort(sortArticlesByDateDesc),
    },
  };
};

export default Snippets;
