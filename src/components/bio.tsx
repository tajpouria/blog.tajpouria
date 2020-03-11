import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
`;

export const Bio = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;

  return (
    <Content>
      <p>
        Written by <strong>{author}</strong>; Who build things to help people.
      </p>
    </Content>
  );
};
