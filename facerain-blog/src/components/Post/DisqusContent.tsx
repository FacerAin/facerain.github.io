import React, { FunctionComponent } from 'react';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
interface DisqusContentProps{
	title: string;
	siteUrl: string;
	pathname: string;
	id: string;
	
}
const DisqusContent:FunctionComponent<DisqusContentProps> = function({siteUrl, pathname, id, title}) {
	let disqusConfig = {
	url: `${pathname}`,
    identifier: id,
    title: title,
	}
	console.log(disqusConfig);
	return(
	<>
		<Disqus config={disqusConfig}/>
	</>
	)
}

export default DisqusContent;