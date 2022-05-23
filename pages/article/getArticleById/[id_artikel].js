/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Image,
  Text,
  Stack,
  Button,
  Spacer,
  Link,
} from "@chakra-ui/react";
import { useRouter } from 'next/router'

const getArticleById = () => {
  const [dataArticle, setDataArticle] = useState([]);
  const router = useRouter()
  const { id_artikel } = router.query;

  console.log(id_artikel)
  useEffect(() => {
    axios
      .get(`http://sehatin-api.herokuapp.com/v1/articles/${id_artikel}`)
      .then((res) => {
        setDataArticle(new Array(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id_artikel]);

  return (
    <Box
      //   maxW="lg"
      width="1000px"
      //   borderWidth="1px"
      //   borderRadius="lg"
      overflow="hidden"
      m="auto"
      marginTop="30px"
    >
      {dataArticle.map((v) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div>
            <Image
              src={v.thumbnail_image}
              alt="foto artikel"
              objectFit="cover"
              boxSize="500px"
              margin="auto"
            />
            <Box>
              <Stack direction="row">
                <Box>
                  <Text fontSize="5xl">{v.judul} </Text>
                </Box>
                <Spacer />
                <Stack direction="row">
                  <Box>
                    <Button colorScheme="teal" size="sm" marginTop={5}>
                      edit
                    </Button>
                  </Box>
                  <Box>
                    <Button colorScheme="teal" size="sm" marginTop={5}>
                      delete
                    </Button>
                  </Box>
                </Stack>
              </Stack>
              <Box>
                <Text lineHeight={8} textAlign="justify">{v.isi_artikel}</Text>
              </Box>
              <Box>
                {v.tag.map((i) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Text color="blue.600">{i}</Text>
                  );
                })}
              </Box>
              <Box marginBottom="30px">
                Source : &nbsp;
                <Link color="teal.500" href="#">
                  {v.source}
                </Link>
              </Box>
            </Box>
          </div>
        );
      })}
    </Box>
  );
};

export default getArticleById;
