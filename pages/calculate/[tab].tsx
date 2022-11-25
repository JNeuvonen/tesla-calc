import { Box } from "@chakra-ui/react";
import PageTabs from "../../components/PageTabs";

export default function Calculate() {
  return (
    <Box>
      <PageTabs headers={["Quarterly", "Annual", "Weekly", "Custom"]} />
    </Box>
  );
}
