import { useMediaQuery } from "@chakra-ui/react";

export const useResponsiveStyle = () => {
  const [isLargerThan768] = useMediaQuery("(min-Width: 768px)");

  return { isLargerThan768 };
};
