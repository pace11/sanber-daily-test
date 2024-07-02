import { Box } from "@chakra-ui/react";
import CardNotification from "@/components/card-notification";
import EmptyState from "@/components/empty-state";
import LoadingState from "@/components/loading-state";
import { IoNotificationsOutline } from "react-icons/io5";

export default function SectionNotifications({ data, loading }) {
  return (
    <Box>
      {data?.length > 0 &&
        data.map((item, idx) => <CardNotification key={idx} {...item} />)}
      {data?.length === 0 && !loading && (
        <EmptyState message="No Notifications" icon={IoNotificationsOutline} />
      )}
      {loading && <LoadingState />}
    </Box>
  );
}

SectionNotifications.defaultProps = {
  data: [],
  loading: false,
};
