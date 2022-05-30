import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Badge, Image, Grid, Stack, Button, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { base_url } from "@/utils/const";
import AlertDialogDelete from "../../components/alert-dialog/alertDialog"

const ListArticle = () => {
  const [dataArticle, setDataArticle] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      pathname: "/article/[id_artikel]",
      query: {
        id_artikel: id_artikel,
      },
    });
    // console.log(id_artikel);
  };

  let editArticle = (id_artikel) => {
    router.push({
      pathname: "/article/editArticle/[id_artikel]",
      query: {
        id_artikel: id_artikel,
      },
    });
  }

  let deleteArticle = (id_artikel) => {
    axios.delete(`${base_url}v1/articles/delete/${id_artikel}`)
    .then((res) => {
      console.log(res);
      window.location.reload()
    })
    .catch((err) => {
      alert('error');
      console.log(err);
    })
  } 

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
            >
              <Image
                src={v.thumbnail_image}
                alt="foto artikel"
                objectFit="cover"
                height="300"
                margin="auto"
              />
              <Box p="6" cursor="pointer" onClick={() => selectArticle(v.id_artikel)}>
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
                    {v.source_link}
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
                  <DeleteIcon color="blue.300" onClick={onOpen}/>
                </Button>
                <Button onClick={() => editArticle(v.id_artikel)}>
                  <EditIcon color="blue.300" />
                </Button>
              </Stack>
              <AlertDialogDelete isOpen={isOpen} onClose={onClose} onClick={() => deleteArticle(v.id_artikel)} />
            </Box>
          );
        })}
      </Grid>
    </div>
  );
};

export default ListArticle;
