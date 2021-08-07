module.exports = {
	siteMetadata: {
		title: `FacerAin's Dev-Space`,
		description: `FacerAin의 개발 공간입니다.`,
		author: `FacerAin`,
		siteUrl: `https://0.0.0.0/`,
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-typescript',
			options: {
				isTSX: true,
				allExtensions: true,
			},
		},
		{
			resolve: 'gatsby-plugin-canonical-urls',
			options: {
				siteUrl: 'https://0.0.0.0/',
				stripQueryString: true,
			},
		},
		`gatsby-plugin-emotion`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `contents`,
				path: `${__dirname}/contents`,
			},
		},
		{
			resolve: `gatsby-plugin-robots-txt`,
			options: {
				policy: [{userAgent: '*', allow: '/'}],
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/static`,
			},
		},
		`gatsby-transformer-sharp`,
		{
			resolve: `gatsby-plugin-disqus`,
			options: {
				shortname: `FacerAin`
			}
		},
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-smartypants',
						options: {
							dashes: 'oldschool',
						},
					},
					{
						resolve: 'gatsby-remark-prismjs',
						options: {
							classPrefix: 'language-',
						},
					},
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 768,
							quality: 100,
							withWebp: true,
						},
					},
					{
						resolve: 'gatsby-remark-copy-linked-files',
						options: {},
					},
					{
						resolve: 'gatsby-remark-external-links',
						options: {
							target: '_blank',
							rel: 'nofollow',
						},
					},
				],
			},
		},
	],
};