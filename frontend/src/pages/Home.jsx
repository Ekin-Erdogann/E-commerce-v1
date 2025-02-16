import { Container, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { SimpleGrid ,} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product"; 
import ProductCard from "../components/ui/ProductCard";
const Home = () => {
  const {fetchProducts,products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])
  
  console.log(products)
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, purple.400, pink.500)"}
          bgClip={"text"}
        >
          Current Products 🛒
        </Text>
        <SimpleGrid columns={{base:1,md:2 ,lg:3} }spacing={10} width={"full"}>
          {products.length > 0 ? (products.map((product) => {
            return <ProductCard key={product._id} product={product}></ProductCard>;
          })) : null}
        </SimpleGrid>
        {products.length > 0 ? null : (<Text
          fontSize={{ base: "16", sm: "22" }}
          fontWeight={"bold"}
          textAlign={"center"}
          color={"purple.400"}
        >
          No products Found 😔
          <Link to={"/create"}>
            <Text
              as={"span"}
              color={"pink.500"}
              fontsize={{ base: "16", sm: "22" }}
              _hover={{ color: "purple.400", textDecoration: "underline" }}
            >
              Create a Product
            </Text>
          </Link>
        </Text>)}
        
      </VStack>
    </Container>
  );
};
export default Home;
