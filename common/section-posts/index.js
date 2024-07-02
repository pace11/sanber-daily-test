import CardPost from "@/components/card-post";
import EmptyState from "@/components/empty-state";
import LoadingState from "@/components/loading-state";
import { Box } from "@chakra-ui/react";

export default function SectionPost({
  data,
  loading,
  onClickReplies,
  onClickLikes,
  onClickDelete,
  onClickEdit,
}) {
  return (
    <Box>
      {data?.length > 0 &&
        data.map((item, idx) => (
          <CardPost
            key={idx}
            {...item}
            onClickLikes={(type) =>
              onClickLikes({
                posts_id: item?.id,
                type: type ? "/unlikes" : "/likes",
              })
            }
            onClickReplies={() => onClickReplies({ posts_id: item?.id })}
            onClickEdit={() => onClickEdit({ posts_id: item?.id, description: item?.description })}
            onClickDelete={() => onClickDelete({ posts_id: item?.id })}
          />
        ))}
      {data?.length === 0 && !loading && <EmptyState />}
      {loading && <LoadingState />}
    </Box>
  );
}

SectionPost.defaultProps = {
  data: [],
  loading: false,
};
