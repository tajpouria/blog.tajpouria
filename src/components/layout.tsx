import { graphql, PageRendererProps, useStaticQuery } from 'gatsby';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { rhythm, styledScale } from '../utils/typography';
import { SwipeLink } from './link';
import { ThemeToggler } from './themeToggler';

interface Props extends PageRendererProps {
  title: string;
  children: ReactNode;
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const StyledH1 = styled.h1`
  ${styledScale(0.6)};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
`;

const StyledH3 = styled.h3`
  font-family: Montserrat, sans-serif;
  margin-top: 0;
`;

const StyledLink = styled(SwipeLink)`
  box-shadow: none;
  color: inherit;
  text-decoration: none;
`;

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${`${rhythm(1.5)} ${rhythm(3 / 4)}`};
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`;

export const Layout = (props: Props) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          social {
            twitter
            github
          }
        }
      }
    }
  `);

  const { location, title, children } = props;
  const { social } = data.site.siteMetadata;

  const rootPath = `/`;

  const HeaderTitle = location.pathname === rootPath ? StyledH1 : StyledH3;

  return (
    <Content>
      <Header>
        <HeaderTitle>
          <StyledLink to={`/`}>{title}</StyledLink>
        </HeaderTitle>
        <ThemeToggler />
      </Header>
      <main>{children}</main>
      <Footer>
        <span>
          <a href={`https://github.com/${social.github}`}>github</a> •{' '}
          <a href={`https://twitter.com/${social.twitter}`}>twitter</a>
        </span>
        <a href={`rss.xml`} target={`_blank`} rel={`noopener noreferrer`}>
          RSS
        </a>
      </Footer>
    </Content>
  );
};
