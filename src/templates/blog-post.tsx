import { graphql, PageRendererProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { Bio } from '../components/bio';
import { Layout } from '../components/layout';
import { SwipeLink } from '../components/link';
import { SEO } from '../components/seo';
import { Query, SitePageContext } from '../typings/graphql-types';
import { rhythm, styledScale } from '../utils/typography';

interface Props extends PageRendererProps {
  pageContext: SitePageContext;
  data: Query;
}

const Date = styled.p`
  display: block;
  ${styledScale(-1 / 5)};
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-1)};
`;

const Divider = styled.hr`
  margin-bottom: ${rhythm(1)};
`;

const PostNavigator = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const BlogPostTemplate = (props: Props) => {
  const data = props.data!;
  const post = data.markdownRemark!;
  const excerpt = post.excerpt!;
  const siteUrl = data.site?.siteMetadata?.siteUrl;
  const frontmatter = post.frontmatter!;
  const html = post.html!;
  const siteTitle = data.site!.siteMetadata!.title!;
  const minread = parseInt((frontmatter as any).minread, 10) || 4;
  const { previous, next } = props.pageContext;

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={frontmatter.title!}
        description={frontmatter.description || excerpt}
      />
      <h1>{post.frontmatter!.title}</h1>
      <Date>
        {frontmatter.date}&nbsp;•&nbsp;{Math.round(minread)} min read
      </Date>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <a
        href={`${siteUrl}/tree/master/content/blog/${frontmatter?.title
          ?.split(' ')
          .join('_')}/index.md`}
      >
        Edit on github
      </a>

      <Divider />
      <Bio />
      <PostNavigator>
        <li>
          {previous && (
            <SwipeLink to={previous.fields!.slug!} rel="prev">
              ← {previous.frontmatter!.title}
            </SwipeLink>
          )}
        </li>
        <li>
          {next && (
            <SwipeLink to={next.fields!.slug!} rel="next">
              {next.frontmatter!.title} →
            </SwipeLink>
          )}
        </li>
      </PostNavigator>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        minread
      }
    }
  }
`;
