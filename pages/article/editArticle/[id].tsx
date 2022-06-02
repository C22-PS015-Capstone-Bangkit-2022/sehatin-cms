import React, { useMemo, useState, useEffect } from "react";
//Editor
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Button,
  Text,
  FormErrorMessage,
  useToast,
  InputGroup,
  CircularProgress,
  useDisclosure,
} from "@chakra-ui/react";
import FormData from "form-data";
import { useRouter } from "next/router";
import { base_url } from "@/utils/const";
import { DashboardHeader } from "@/components/layout/header/dashboard-header";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import {
  DashboardPage,
  DashboardPageContent,
} from "@/components/layout/dashboard";
import FetchLoading from "@/components/loading/FetchLoading";
import "easymde/dist/easymde.min.css";
import ReactMarkdown from "react-markdown";
import raw from "rehype-raw";
import dynamic from "next/dynamic";
import ReactDOMServer from "react-dom/server";
import Loading from "@/components/Loading";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useQuery } from "react-query";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <FetchLoading />,
});
const Loader = () => <Loading />;

const Form = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = router.query;
  const [file, setFile] = useState<any>([]);
  const [source, setSource] = useState("");
  const [tag, setTag] = useState("");
  const [isUploading, setUploading] = useState(false);
  const AuthUser = useAuthUser();
  const toast = useToast();
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    control,
    setValue,
    handleSubmit,
  } = useForm();

  const tags = [
    { value: "penyakit", label: "Penyakit" },
    { value: "kanker", label: "Kanker" },
    { value: "stroke", label: "Stroke" },
    { value: "tips", label: "Tips" },
    { value: "diabetes", label: "Diabetes" },
  ];

  const articleData = useQuery(
    ["article"],
    () =>
      axios
        .get(`${base_url}v1/articles/${id}`)
        .then((res) => {
          const tag = setValue("title", res.data.judul);
          setValue("article", res.data.isi_artikel);
          setValue("source", res.data.source_link);
          setValue(
            "tag",
            res.data.tag.map((tag) => ({
              label: tag,
              value: tag,
            }))
          );
          setFile({ image: res.data.thumbnail_image });
          return res.data;
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
        }),
    { refetchOnWindowFocus: false, enabled: !!id }
  );
  const onFileChange = (event) => {
    const formData = new FormData();
    setUploading(true);
    const url = `${base_url}v1/upload`; //kalo pake heroku malah error : file is required
    formData.append("file", event.target.files[0]);
    axios
      .post(url, formData)
      .then((res) => {
        setFile(res.data);
        setUploading(false);
        toast({
          title: "Gambar Thumbnail Terunggah",
          description: "Gambar berhasil diunggah",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        setUploading(false);
        toast({
          title: "Gambar Gagal Terunggah",
          description: err,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  function easyMdeUpload(file, onSuccess, onError) {
    const form = new FormData();
    form.append("file", file);
    axios
      .post(`${base_url}v1/upload`, form)
      .then((response) => {
        toast({
          title: "Gambar Terunggah",
          description: "Gambar berhasil diunggah",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        return onSuccess(response.data.image);
      })
      .catch((error) => {
        return onError(error.message + " : " + error.response.error);
      });
  }

  const customRendererOptions = useMemo(() => {
    return {
      sideBySideFullscreen: false,
      uploadImage: true,
      spellChecker: false,
      imageAccept: "image/png, image/jpeg",
      previewImagesInEditor: true,
      minHeight: "100px",
      imageUploadFunction: (file, onSuccess, onError) => {
        console.log(file.file);
        easyMdeUpload(file, onSuccess, onError);
      },
      previewRender(plainText) {
        return ReactDOMServer.renderToString(
          <article className="prose lg:prose-lg text-justify py-3">
            <ReactMarkdown children={plainText} rehypePlugins={[raw]} />
          </article>
        );
      },
    };
  }, []);

  const onSubmit = async (data) => {
    if (!file.image) {
      toast({
        title: "Foto Thumbnail belum diunggah",
        description: "Unggah gambar thumbnail terlebih dahulu",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      axios
        .put(`${base_url}v1/articles/edit/${id}`, {
          judul: data.title,
          isi_artikel: data.article,
          thumbnail_image: file.image,
          source: data.source,
          tag: data.tag.map((item) => item.value),
        })
        .then((res) => {
          router.push("/article/all");
        })
        .catch((err) => {
          toast({
            title: "Artikel gagal ditambahkan",
            description: err,
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
        });
    }
  };
  return (
    <DashboardPage user={AuthUser}>
      <DashboardHeader>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm">Artikel</p>
            <h1 className="text-lg font-semibold leading-[38px] lg:text-xl lg:leading-[38px]">
              Edit Artikel
            </h1>
          </div>
        </div>
      </DashboardHeader>
      <DashboardPageContent className="z-50">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <InputGroup>
              <FormControl isInvalid={errors.title}>
                <FormLabel htmlFor="name">Judul Artikel</FormLabel>
                <Input
                  id="title"
                  bg="white"
                  type="text"
                  {...register("title", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
            </InputGroup>
            <FormLabel htmlFor="isi artikel">Isi Artikel</FormLabel>
            <Controller
              name="article"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <SimpleMDE {...field} options={customRendererOptions} />
              )}
            />
            {errors.article?.type === "required" && (
              <div className="text-red-500 text-sm my-2">
                <div className="flex">
                  <div className="mr-1">
                    <InformationCircleIcon className="w-5 h-5" />
                  </div>
                  <span>
                    <strong>Isi artikel</strong> wajib diisi!
                  </span>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <FormLabel>Foto Thumbnail</FormLabel>
              <Input type="file" width="850px" onChange={onFileChange} />
              {file.image && (
                <img
                  src={file.image}
                  alt="thumbnail"
                  className="w-full object-cover"
                />
              )}
              {isUploading && (
                <div className="flex items-center">
                  <CircularProgress
                    isIndeterminate
                    color="green.300"
                    size="30px"
                  />
                  <p className="mx-2 font-semibold">
                    Sedang mengunggah gambar...
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <FormControl isInvalid={errors.source}>
                <FormLabel htmlFor="name">Source</FormLabel>
                <Input
                  id="source"
                  bg="white"
                  type="text"
                  {...register("source", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.source && errors.source.message}
                </FormErrorMessage>
              </FormControl>
            </div>
            <div className="space-y-2">
              <FormLabel htmlFor="tag">Tag</FormLabel>
              <Controller
                name="tag"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    noOptionsMessage={() => "Tag tidak tersedia"}
                    placeholder={"Pilih Tag"}
                    options={tags}
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                )}
              />
            </div>
            <Button
              mt={4}
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
            >
              Edit Artikel
            </Button>
          </div>
        </form>
      </DashboardPageContent>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Artikel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Artikel berhasil ditambahkan</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Tutup
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DashboardPage>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(Form);
