import { useMediaQuery } from "@chakra-ui/react";

export const useResponsiveStyle = () => {
  const [isLargerThan768] = useMediaQuery("(min-Width: 768px)");
  const [isLargerThan1024] = useMediaQuery("(min-Width: 1024px)");

  return { isLargerThan768, isLargerThan1024 };
};
