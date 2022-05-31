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
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <FetchLoading />,
});
const Loader = () => <Loading />;

const Form = () => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [file, setFile] = useState<any>([]);
  const [source, setSource] = useState("");
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const AuthUser = useAuthUser();
  const toast = useToast();
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
  } = useForm();

  const onFileChange = (event) => {
    const formData = new FormData();
    setIsLoading(true);
    const url = `${base_url}v1/upload`; //kalo pake heroku malah error : file is required
    formData.append("file", event.target.files[0]);
    axios
      .post(url, formData)
      .then((res) => {
        console.log(res.data);
        setFile(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  let router = useRouter();
  let insert = () => {
    axios
      .post(`https://sehatin-api.herokuapp.com/v1/articles/new`, {
        judul: judul,
        isi_artikel: isi,
        thumbnail_image: file.image,
        source_link: source,
        tag: tag.includes(",") ? tag.split(",") : Array(tag),
      })
      .then((res) => {
        console.log(res);
        router.push("/article/getArticle");
      })
      .catch((err) => {
        console.log(err);
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

  const onSubmit = async (data) => {};
  return (
    <DashboardPage user={AuthUser}>
      <DashboardHeader>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm">Artikel</p>
            <h1 className="text-lg font-semibold leading-[38px] lg:text-xl lg:leading-[38px]">
              Buat Baru
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
            <FormLabel>Tambah lampiran</FormLabel>
            <Input type="file" width="850px" onChange={onFileChange} />
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
              <Input
                id="tag"
                type="text"
                htmlSize={100}
                width="auto"
                value={tag}
                onChange={(event) => setTag(event.target.value)}
              />
            </div>
            <Button
              mt={4}
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
            >
              Buat Artikel
            </Button>
          </div>
        </form>
      </DashboardPageContent>
    </DashboardPage>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(Form);
