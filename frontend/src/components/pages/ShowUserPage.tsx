import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SINGLE_ARTICLE_API, SHOW_USERS_API } from "../../constant/railsRoute";
import { ArticleType } from "../../types/articleType";
import { UserType } from "../../types/userType";
import UserImg from "../user/UserImg";

const ShowUserPage: VFC = () => {
  const [userArticles, setUserArticles] = useState<ArticleType[]>([]);
  const { userId } = useParams<{ userId: string }>();

  const history = useHistory();

  useEffect(() => {
    axios
      .get<{ articles: ArticleType[]; user: UserType }>(SHOW_USERS_API(userId))
      .then((res) => {
        setUserArticles(res.data.articles);
      });
  }, [userId]);
  return (
    <div>
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
              {userArticles.map((articles) => (
                <Box
                  shadow="md"
                  p={5}
                  borderWidth={1}
                  key={articles.id}
                  onClick={() => history.push(SINGLE_ARTICLE_API(articles.id))}
                  _hover={{
                    boxShadow: "lg",
                    cursor: "pointer",
                  }}
                >
                  <Heading fontSize="xl">{articles.title}</Heading>
                  <Text>{articles.text}</Text>
                </Box>
              ))}
            </Stack>
          </Box>
        </Flex>
      </Container>
    </div>
  );
};

export default ShowUserPage;
