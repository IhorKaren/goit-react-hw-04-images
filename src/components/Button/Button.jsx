import { LoadMoreButton } from './Button.styled';

export default function LoadMore({ buttonClick }) {
  return (
    <LoadMoreButton type="button" onClick={buttonClick}>
      Load more
    </LoadMoreButton>
  );
}
