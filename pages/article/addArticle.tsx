import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import FormData from "form-data";
import { useRouter } from "next/router";
import { base_url } from "@/utils/const";

const Form = () => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [file, setFile] = useState<any>([]);
  const [source, setSource] = useState("");
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formData = new FormData();

  const onFileChange = (event) => {
    setIsLoading(true);
    const url = `${base_url}/v1/upload`; //kalo pake heroku malah error : file is required
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
        source: source,
        tag: tag.split(","),
      })
      .then((res) => {
        console.log(res);
        router.push("/article/getArticle");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FormControl>
      <Text fontSize="5xl" marginLeft={8} marginTop={5}>
        Input Article
      </Text>
      <Box margin={8}>
        <FormLabel htmlFor="judul artikel">Judul Artikel</FormLabel>
        <Input
          id="judul"
          type="text"
          htmlSize={100}
          width="auto"
          onChange={(event) => setJudul(event.target.value)}
          value={judul}
        />
      </Box>
      <Box margin={8}>
        <FormLabel htmlFor="isi artikel">isi Artikel</FormLabel>
        <Textarea
          value={isi}
          onChange={(event) => setIsi(event.target.value)}
          width="850px"
          placeholder="Here is a sample placeholder"
          size="sm"
        />
      </Box>
      <Box margin={8}>
        <FormLabel>Tambah lampiran</FormLabel>
        <Input type="file" width="850px" onChange={onFileChange} />
      </Box>
      <Box margin={8}>
        <FormLabel htmlFor="Source">Source</FormLabel>
        <Input
          id="source"
          type="text"
          htmlSize={100}
          width="auto"
          value={source}
          onChange={(event) => setSource(event.target.value)}
        />
      </Box>
      <Box margin={8}>
        <FormLabel htmlFor="tag">Tag</FormLabel>
        <Input
          id="tag"
          type="text"
          htmlSize={100}
          width="auto"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
        />
      </Box>
      <Button colorScheme="blue" onClick={insert} marginLeft={8}>
        Button
      </Button>
    </FormControl>
  );
};

export default Form;
