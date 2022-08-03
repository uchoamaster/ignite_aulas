import { format } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const formattedPosts = postsPagination.results.map(post => ({
    ...post,
    first_publication_date: format(
      new Date(post.first_publication_date),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    ),
  }));

  const [posts, setPosts] = useState<Post[]>(formattedPosts);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  async function handleNextPage(): Promise<void> {
    if (nextPage === null) return;

    const postsResults = await fetch(nextPage).then(response =>
      response.json()
    );

    setNextPage(postsResults.next_page);

    const newPosts = postsResults.results.map((post: Post) => {
      return {
        ...post,
        first_publication_date: format(
          new Date(post.first_publication_date),
          'dd MMM yyyy',
          {
            locale: ptBR,
          }
        ),
      };
    });

    setPosts([...posts, ...newPosts]);
  }

  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <main className={commonStyles.container}>
        <Header />

        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a className={styles.post}>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <ul>
                  <li>
                    <FiCalendar />
                    {post.first_publication_date}
                  </li>
                  <li>
                    <FiUser />
                    {post.data.author}
                  </li>
                </ul>
              </a>
            </Link>
          ))}

          {nextPage && (
            <button type="button" onClick={handleNextPage}>
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', {
    pageSize: 3,
    orderings: {
      field: 'last_publication_date',
      direction: 'desc',
    },
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: postsResponse.results,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
