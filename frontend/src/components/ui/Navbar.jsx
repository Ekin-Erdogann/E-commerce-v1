import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"100%"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, purple.400, pink.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>🛍️ Store </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon
                fontSize={20}
                color={colorMode === "light" ? "purple" : "white"}
              />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <IoMoon color="purple" />
            ) : (
              <LuSun size="20" color="white" />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};
export default Navbar;
