import CardPost from "@/components/card-post";
import EmptyState from "@/components/empty-state";
import LoadingState from "@/components/loading-state";
import { Box } from "@chakra-ui/react";

export default function SectionPost({
  data,
  loading,
  onClickEdit,
}) {
  return (
    <Box>
      {data?.length > 0 &&
        data.map((item, idx) => (
          <CardPost
            key={idx}
            {...item}
            onClickEdit={() => onClickEdit({ posts_id: item?.id, description: item?.description })}
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
