import { Box } from "@chakra-ui/react";
import CardReply from "@/components/card-reply";
import EmptyState from "@/components/empty-state";
import LoadingState from "@/components/loading-state";
import { IoChatbubbleOutline } from "react-icons/io5";

export default function SectionReplies({ data, loading }) {
  return (
    <Box>
      {data?.length > 0 &&
        data.map((item, idx) => <CardReply key={idx} {...item} />)}
      {data?.length === 0 && !loading && (
        <EmptyState message="No Replies" icon={IoChatbubbleOutline} />
      )}
      {loading && <LoadingState />}
    </Box>
  );
}
