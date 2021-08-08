import React, { FunctionComponent } from 'react';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';
import styled from '@emotion/styled';

interface DisqusContentProps {
	title: string;
	siteUrl: string;
	pathname: string;
	id: string;
}

const DisqusContentWrapper = styled.div`
margin: 0 200px;
@media (max-width: 768px) {
margin: 0 50px;

}
`;

const DisqusContent: FunctionComponent<DisqusContentProps> = function ({
	siteUrl,
	pathname,
	id,
	title,
}) {
	let disqusConfig = {
		url: `${pathname}`,
		identifier: id,
		title: title,
	};
	return (
		<>
			<DisqusContentWrapper>
				<Disqus config={disqusConfig} />
			</DisqusContentWrapper>
		</>
	);
};

export default DisqusContent;