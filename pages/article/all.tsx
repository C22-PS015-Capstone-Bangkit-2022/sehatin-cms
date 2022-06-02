import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Badge,
  Image,
  Grid,
  Stack,
  Button,
  useDisclosure,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { base_url } from "@/utils/const";
import AlertDialogDelete from "../../components/alert-dialog/alertDialog";
import Loading from "@/components/Loading";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import { DashboardHeader } from "@/components/layout/header/dashboard-header";
import {
  DashboardPage,
  DashboardPageContent,
} from "@/components/layout/dashboard";
import FetchLoading from "@/components/loading/FetchLoading";
import { useQuery } from "react-query";
const Loader = () => <Loading />;

const ListArticle = () => {
  const AuthUser = useAuthUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const articles = useQuery(
    ["articles"],
    () =>
      axios
        .get(`${base_url}v1/articles`)
        .then((res) => {
          console.log(res.data);
          return res.data.articles;
        })
        .catch((err) => {
          toast({
            title: "Gagal mendapatkan data artikel",
            description: err,
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
          console.log(err);
          return [];
        }),
    { refetchOnWindowFocus: false }
  );

  let selectArticle = (id_artikel) => {
    router.push({
      pathname: "/article/[id]",
      query: {
        id: id_artikel,
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
  };

  let deleteArticle = (id_artikel) => {
    axios
      .delete(`${base_url}v1/articles/delete/${id_artikel}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        alert("error");
        console.log(err);
      });
  };

  console.log(articles.data);
  return (
    <DashboardPage user={AuthUser}>
      <DashboardHeader>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm">Artikel</p>
            <h1 className="text-lg font-semibold leading-[38px] lg:text-xl lg:leading-[38px]">
              Daftar artikel
            </h1>
          </div>
          <div className="flex-none mt-4 space-y-2 lg:max-w-xs lg:mt-0 lg:ml-4">
            <Button
              colorScheme="teal"
              leftIcon={<AddIcon />}
              variant="solid"
              marginBottom="10px"
              onClick={() => router.push("/article/add")}
            >
              Tambah Artikel
            </Button>
          </div>
        </div>
      </DashboardHeader>
      <DashboardPageContent className="z-50">
        {articles.data?.length === 0 ? (
          <ul className="divide-y divide-gray-200">
            <FetchLoading />
          </ul>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap={20}>
            {articles.data?.map((v) => (
              // eslint-disable-next-line react/jsx-key
              <Box
                maxW="sm"
                height="550px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg="white"
              >
                <Image
                  src={v.thumbnail_image}
                  alt="foto artikel"
                  objectFit="cover"
                  height="300"
                  margin="auto"
                />
                <Box
                  p="3"
                  cursor="pointer"
                  onClick={() => selectArticle(v.id_artikel)}
                >
                  <Box display="flex" alignItems="baseline">
                    <Stack direction="row">
                      {v &&
                        v.tag.map((i) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <Badge
                              borderRadius="full"
                              px="2"
                              colorScheme="teal"
                            >
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
                  marginBottom="15px"
                  marginRight="8px"
                >
                  <Button>
                    <IconButton
                      color="blue.300"
                      onClick={onOpen}
                      icon={<DeleteIcon />}
                      aria-label="delete-article"
                    />
                  </Button>
                  <Button onClick={() => editArticle(v.id_artikel)}>
                    <IconButton
                      color="blue.300"
                      icon={<EditIcon />}
                      aria-label="edit-article"
                    />
                  </Button>
                </Stack>
                <AlertDialogDelete
                  isOpen={isOpen}
                  onClose={onClose}
                  onClick={() => deleteArticle(v.id_artikel)}
                />
              </Box>
            ))}
            {/* <AlertDialogDelete
                  isOpen={isOpen}
                  onClose={onClose}
                  //onClick={() => deleteArticle(v.id_artikel)}
                /> */}
          </Grid>
        )}
      </DashboardPageContent>
    </DashboardPage>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(ListArticle);
