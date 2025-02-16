import  { useState } from "react";
import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product"; // import the store
import { useToast } from '@chakra-ui/react'


const Create = () => {
  const toast = useToast()
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    url: "",
  });
   const {createProduct,} = useProductStore();
  const handleCreateProduct = async () => {
    const {success,message}=await createProduct(newProduct);
    if(!success){
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }else{
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
    setNewProduct({name:"",price:0,url:""});
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a new product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "#1a0033")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Image Url"
              value={newProduct.url}
              onChange={(e) =>
                setNewProduct({ ...newProduct, url: e.target.value })
              }
            />
            <Button colorScheme={"purple"} w={"full"} onClick={handleCreateProduct}>Create</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
export default Create;
