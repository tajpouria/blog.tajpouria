module.exports = {
  siteMetadata: {
    title: 'Blog.TajPouria',
    author: 'Pouria Tajdivand',
    description: 'A starter blog demonstrating what Gatsby can do.',
    siteUrl: 'https://github.com/tajpouria/blog.tajpouria',
    social: {
      twitter: 'PouriaTaj',
      github: 'tajpouria',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {},
    },
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Blog.PouriaTajdivand',
        short_name: 'Blog.tajpouria',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#E83030',
        display: 'minimal-ui',
        icon: 'content/assets/icon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-transition-link',
    'gatsby-plugin-dark-mode',
  ],
};
