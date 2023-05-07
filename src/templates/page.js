import { gql } from '@apollo/client';

import Section from '@/components/Section';
import Container from '@/components/Container';

// import Link from 'next/link';
// import { Helmet } from 'react-helmet';

// import { WebpageJsonLd } from '@/lib/json-ld';
// import { helmetSettingsFromMetadata } from '@/lib/site';
// import useSite from 'hooks/use-site';
// import usePageMetadata from 'hooks/use-page-metadata';

// import Layout from '@/components/Layout';
// import Header from '@/components/Header';
// import Content from '@/components/Content';

// import FeaturedImage from '@/components/FeaturedImage';
// import Breadcrumbs from '@/components/Breadcrumbs';

import { QUERY_PAGE_BY_URI } from '@/data/pages';

// import styles from 'styles/pages/Page.module.scss';

export default function Page({ data: page, breadcrumbs }) {
  console.log('page', page)
  const { children, content, description, featuredImage, metaTitle, slug, title } = page;

  // const { metadata: siteMetadata = {} } = useSite();

  // const { metadata } = usePageMetadata({
  //   metadata: {
  //     ...page,
  //     title: metaTitle,
  //     description: description || page.og?.description || `Read more about ${title}`,
  //   },
  // });

  // if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
  //   metadata.title = `${title} - ${siteMetadata.title}`;
  //   metadata.og.title = metadata.title;
  //   metadata.twitter.title = metadata.title;
  // }

  // const hasChildren = Array.isArray(children) && children.length > 0;

  // const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Section>
      <Container>
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </Container>
    </Section>
  )

  // return (
  //   <Layout>
  //     <Helmet {...helmetSettings} />

  //     <WebpageJsonLd
  //       title={metadata.title}
  //       description={metadata.description}
  //       siteTitle={siteMetadata.title}
  //       slug={slug}
  //     />

  //     <Header>
  //       {Array.isArray(breadcrumbs) && <Breadcrumbs breadcrumbs={breadcrumbs} />}
  //       {featuredImage && (
  //         <FeaturedImage
  //           {...featuredImage}
  //           src={featuredImage.sourceUrl}
  //           dangerouslySetInnerHTML={featuredImage.caption}
  //         />
  //       )}
  //       <h1 className={styles.title}>{title}</h1>
  //     </Header>

  //     <Content>
  //       <Section>
  //         <Container>
  //           <div
  //             className={styles.content}
  //             dangerouslySetInnerHTML={{
  //               __html: content,
  //             }}
  //           />
  //         </Container>
  //       </Section>

  //       {hasChildren && (
  //         <Section className={styles.sectionChildren}>
  //           <Container>
  //             <aside>
  //               <p className={styles.childrenHeader}>
  //                 <strong>{title}</strong>
  //               </p>
  //               <ul>
  //                 {children.map((child) => {
  //                   return (
  //                     <li key={child.id}>
  //                       <Link href={child.uri}>
  //                         <a>{child.title}</a>
  //                       </Link>
  //                     </li>
  //                   );
  //                 })}
  //               </ul>
  //             </aside>
  //           </Container>
  //         </Section>
  //       )}
  //     </Content>
  //   </Layout>
  // );
}

Page.template = {
  query: gql`
    query PageByUri($uri: ID!) {
      page(id: $uri, idType: URI) {
        children {
          edges {
            node {
              id
              slug
              uri
              ... on Page {
                id
                title
              }
            }
          }
        }
        content
        featuredImage {
          node {
            altText
            caption
            id
            sizes
            sourceUrl
            srcSet
          }
        }
        id
        menuOrder
        parent {
          node {
            id
            slug
            uri
            ... on Page {
              title
            }
          }
        }
        slug
        title
        uri
      }
    }
  `,
  transformer: (data) => {
    const page = { ...data.page };

    if (page.featuredImage) {
      page.featuredImage = page.featuredImage.node;
    }

    if (page.parent) {
      page.parent = page.parent.node;
    }

    if (page.children) {
      page.children = page.children.edges.map(({ node }) => node);
    }

    return page;
  },
  variables: ({ uri }) => {
    return {
      uri,
    };
  },
};