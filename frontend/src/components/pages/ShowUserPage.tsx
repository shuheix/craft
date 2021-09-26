import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SHOW_ARTICLE_URL } from "../../constant/appHistory";
import { SHOW_ARTICLE_API } from "../../constant/railsRoute";
import { useUser } from "../../hooks/useUser";
import Header from "../header/Header";
import UserImg from "../user/UserImg";

const ShowUserPage: VFC = () => {
  const { uid } = useParams<{ uid: string }>();
  const { data, isError, isLoading } = useUser(uid);
  const history = useHistory();

  if (isError) return <p>error!</p>;

  return (
    <>
      <Header />
      <Container maxW="container.xl">
        <Flex mt={4}>
          <Box flex="1" bgColor="green.100" h="400px" mr={4}>
            <Flex flexDirection="column" mt={4} h="400px">
              <Box flex="4">
                <UserImg />
              </Box>
              <Box flex="1">status</Box>
              <Button flex="1">プロフ編集</Button>
            </Flex>
          </Box>
          <Box flex="3">
            <Stack spacing={4}>
              {data?.articles?.map((articles) => (
                <Box
                  shadow="md"
                  p={5}
                  borderWidth={1}
                  key={articles.id}
                  onClick={() => history.push(SHOW_ARTICLE_URL(articles.id))}
                  _hover={{
                    boxShadow: "lg",
                    cursor: "pointer",
                  }}
                  borderRadius="lg"
                >
                  <Heading fontSize="xl">{articles.title}</Heading>
                  <Text>{articles.text}</Text>
                </Box>
              ))}
            </Stack>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default ShowUserPage;
