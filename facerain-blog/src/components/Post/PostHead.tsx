import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import PostHeadInfo, { PostHeadInfoProps } from 'components/Post/PostHeadInfo';
import Img, { FluidObject } from 'gatsby-image';

type GatsbyImgProps = {
  fluid: FluidObject;
  alt: string;
  className?: string;
};

export interface PostHeadProps extends PostHeadInfoProps {
  thumbnail: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const PostHeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
@media(max-width: 768px) {
height: 300px;
}
`;

const BackgroundImage = styled((props: GatsbyImgProps) => (
  <Img {...props} style={{ position: 'absolute' }} />
))`
  z-index: -1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(0.25);
`;

const PostHead: FunctionComponent<PostHeadProps> = function ({
  title,
  date,
  categories,
  thumbnail: {
    childImageSharp: { fluid },
  },
}) {
  return (
    <PostHeadWrapper>
      <BackgroundImage fluid={fluid} alt="thumbnail" />
      <PostHeadInfo title={title} date={date} categories={categories} />
    </PostHeadWrapper>
  );
};

export default PostHead;



