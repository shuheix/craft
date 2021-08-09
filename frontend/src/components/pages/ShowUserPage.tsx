import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, VFC } from "react";

const ShowUserPage: VFC = () => {
  return (
    <div>
      <Container maxW="container.xl">
        <Flex mt={4}>
          <Box flex="1" bgColor="green.100" h="400px" mr={4}>
            <Flex flexDirection="column" alignItems="center" mt={4}>
              <Box>写真</Box>
              <Box>status</Box>
              <Button>プロフ編集</Button>
            </Flex>
          </Box>
          <Box flex="3">
            <Stack spacing={4}>
              <Box shadow="md" p={5} borderWidth={1}>
                <Heading fontSize="xl">ArticleTitle</Heading>
                <Text>
                  The future can be even brighter but a goal without a plan is
                  just a wish
                </Text>
              </Box>
              <Box shadow="md" p={5} borderWidth={1}>
                <Heading fontSize="xl">ArticleTitle</Heading>
                <Text>
                  The future can be even brighter but a goal without a plan is
                  just a wish
                </Text>
              </Box>
              <Box shadow="md" p={5} borderWidth={1}>
                <Heading fontSize="xl">ArticleTitle</Heading>
                <Text>
                  The future can be even brighter but a goal without a plan is
                  just a wish
                </Text>
              </Box>
              <Box shadow="md" p={5} borderWidth={1}>
                <Heading fontSize="xl">ArticleTitle</Heading>
                <Text>
                  The future can be even brighter but a goal without a plan is
                  just a wish
                </Text>
              </Box>
              <Box shadow="md" p={5} borderWidth={1}>
                <Heading fontSize="xl">ArticleTitle</Heading>
                <Text>
                  The future can be even brighter but a goal without a plan is
                  just a wish
                </Text>
              </Box>
              <Box shadow="md" p={5} borderWidth={1}>
                <Heading fontSize="xl">ArticleTitle</Heading>
                <Text>
                  The future can be even brighter but a goal without a plan is
                  just a wish
                </Text>
              </Box>
              <Box shadow="md" p={5} borderWidth={1}>
                <Heading fontSize="xl">ArticleTitle</Heading>
                <Text>
                  The future can be even brighter but a goal without a plan is
                  just a wish
                </Text>
              </Box>
              <Box shadow="md" p={5} borderWidth={1}>
                <Heading fontSize="xl">ArticleTitle</Heading>
                <Text>
                  The future can be even brighter but a goal without a plan is
                  just a wish
                </Text>
              </Box>
              <Box shadow="md" p={5} borderWidth={1}>
                <Heading fontSize="xl">ArticleTitle</Heading>
                <Text>
                  The future can be even brighter but a goal without a plan is
                  just a wish
                </Text>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Container>
    </div>
  );
};

export default ShowUserPage;
