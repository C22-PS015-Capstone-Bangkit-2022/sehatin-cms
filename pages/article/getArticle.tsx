import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Badge, Image, Grid, Stack, Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { base_url } from "@/utils/const";

const ListArticle = () => {
  const [dataArticle, setDataArticle] = useState([]);

  useEffect(() => {
    axios
      .get(`${base_url}v1/articles`)
      .then((res) => {
        setDataArticle(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let router = useRouter();
  let selectArticle = (id_artikel) => {
    router.push({
      pathname: "/article/getArticleById/[id_artikel]",
      query: {
        id_artikel: id_artikel,
      },
    });
    // console.log(id_artikel);
  };
  return (
    <div>
      <Text fontSize="5xl" marginLeft={8} marginTop={5}>
        List Article
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={10} margin="50px">
        {dataArticle.map((v) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <Box
              maxW="sm"
              height="570px"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              onClick={() => selectArticle(v.id_artikel)}
            >
              <Image
                src={v.thumbnail_image}
                alt="foto artikel"
                objectFit="cover"
                height="300"
                margin="auto"
              />
              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Stack direction="row">
                    {v &&
                      v.tag.map((i) => {
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <Badge borderRadius="full" px="2" colorScheme="teal">
                            {i}
                            {/* {v.tag.split("[]")} */}
                          </Badge>
                        );
                      })}
                  </Stack>
                </Box>
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  noOfLines={1}
                >
                  {v.judul}
                </Box>
                <Box noOfLines={3}>{v.isi_artikel}</Box>
                <Box display="flex" mt="2" alignItems="center">
                  {/* <Text>Source : </Text> */}
                  <Box
                    as="span"
                    ml="2"
                    color="gray.600"
                    fontSize="sm"
                    noOfLines={2}
                  >
                    {v.source}
                  </Box>
                </Box>
              </Box>
              <Stack
                direction="row"
                float="right"
                marginRight="8px"
                position="relative"
              >
                <Button>
                  <DeleteIcon color="blue.300" />
                </Button>
                <Button>
                  <EditIcon color="blue.300" />
                </Button>
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </div>
  );
};

export default ListArticle;
