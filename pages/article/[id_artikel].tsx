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
  useDisclosure
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { base_url } from "@/utils/const";
import AlertDialogDelete from "@/components/alert-dialog/alertDialog";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Loading from "@/components/Loading";
const Loader = () => <Loading />;

const GetArticleById = () => {
  const [dataArticle, setDataArticle] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter();
  const { id_artikel } = router.query;

  console.log(id_artikel);
  useEffect(() => {
    axios
      .get(`${base_url}v1/articles/${id_artikel}`)
      .then((res) => {
        setDataArticle(new Array(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id_artikel]);

  let selectArticle = (id_artikel) => {
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
      router.push("/article/getArticle")
    })
    .catch((err) => {
      alert('error');
      console.log(err);
    })
  }

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
                    <Button colorScheme="teal" size="sm" marginTop={5} onClick={() => selectArticle(v.id_artikel)}>
                      edit
                    </Button>
                  </Box>
                  <Box>
                    <Button colorScheme="teal" size="sm" marginTop={5} onClick={onOpen}>
                      delete
                    </Button>
                  </Box>
                </Stack>
              </Stack>
              <AlertDialogDelete isOpen={isOpen} onClose={onClose} onClick={() => deleteArticle(v.id_artikel)} />
              <Box>
                <Text lineHeight={8} textAlign="justify">
                  {v.isi_artikel}
                </Text>
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
                  {v.source_link}
                </Link>
              </Box>
            </Box>
          </div>
        );
      })}
    </Box>
  );
};


export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(GetArticleById);