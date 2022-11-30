import { AspectRatio, Box, Divider, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GREY_100 } from "../../chakra/colors";
import { generateNewHref, stringIncludes } from "../../utils/functions/general";

export default function PageTabs({
  headers,
  disableAllLinks = false,
}: {
  headers: string[];
  disableAllLinks?: boolean;
}) {
  const router = useRouter();
  const { asPath } = router;

  return (
    <ContentStyleWrapper>
      <Flex columnGap={"16px"} rowGap={"16px"} flexWrap={"wrap"}>
        {headers.map((item, i: number) => {
          const activated = !disableAllLinks
            ? stringIncludes(asPath, generateNewHref(asPath, item, 2))
            : false;
          return (
            <Link href={generateNewHref(asPath, item, 2)} key={i}>
              <NavItemStyleWrapper activated={activated}>
                {item}

                {activated && (
                  <Divider
                    borderColor={"black"}
                    borderWidth={"1px"}
                    borderRadius={"50px"}
                  />
                )}
              </NavItemStyleWrapper>
            </Link>
          );
        })}
      </Flex>
    </ContentStyleWrapper>
  );
}

const NavItemStyleWrapper = ({
  children,
  activated,
}: {
  children?: React.ReactNode;
  activated: boolean;
}) => {
  return (
    <Box fontWeight={activated ? "700" : "600"} cursor={"pointer"}>
      {children}
    </Box>
  );
};

const ContentStyleWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      width={"calc(100% + 48px)"}
      bg={GREY_100}
      left={"-24px"}
      top={"-24px"}
      height={"max-content"}
      position="relative"
      paddingBottom={"24px"}
    >
      {children}
    </Box>
  );
};
