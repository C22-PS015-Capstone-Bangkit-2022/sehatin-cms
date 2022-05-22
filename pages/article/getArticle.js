/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
 Flex,
 Heading,
 Spacer,
 ButtonGroup,
 Box,
 Button,
 Text,
 Badge,
 Image
} from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons'

const listArticle = () => {
    const [dataArticle, setDataArticle] = useState([]);

    useEffect(() => {
        axios.get("http://sehatin-api.herokuapp.com/v1/articles")
        .then( (res) => {
            setDataArticle(res.data.articles);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
  return (
      <div>
        <Text fontSize='5xl' marginLeft={8} marginTop={5}>List Article</Text>
          {dataArticle.map((v) => {
            return(
                // eslint-disable-next-line react/jsx-key
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Image src={v.thumbnail_image} alt="foto artikel" />
          
                <Box p='6'>
                  <Box display='flex' alignItems='baseline'>
                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                      New
                    </Badge>
                    <Box
                      color='gray.500'
                      fontWeight='semibold'
                      letterSpacing='wide'
                      fontSize='xs'
                      textTransform='uppercase'
                      ml='2'
                    >
                      3 beds &bull; 3baths
                    </Box>
                  </Box>
          
                  <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                  >
                    {v.judul}
                  </Box>
          
                  <Box>
                    {v.isi_artikel}
                    <Box as='span' color='gray.600' fontSize='sm'>
                      / wk
                    </Box>
                  </Box>
          
                  <Box display='flex' mt='2' alignItems='center'>
                    {Array(5)
                      .fill('')
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < property.rating ? 'teal.500' : 'gray.300'}
                        />
                      ))}
                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                      34 reviews
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          })}
      </div>
   
  );
};

export default listArticle;