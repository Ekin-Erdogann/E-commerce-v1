import PropTypes from "prop-types";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  Modal,
  Button,
  useDisclosure,
  VStack,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useProductStore } from "../../store/product"; // import the store
function ProductCard({ product }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct } = useProductStore();
  const txtColor = useColorModeValue("purple.400", "white");
  const bgColor = useColorModeValue("white", "purple.400");
  const toast = useToast();
  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleUpdate = async (id, updatedProduct) => {
    const { success, message } = await updateProduct(id, updatedProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      overflow={"hidden"}
      transition={"all .2s ease-in-out"}
      bg={bgColor}
      color={"white"}
      p={4}
      rounded={"md"}
      shadow={"md"}
      width={"full"}
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
        bg: "purple.500",
      }}
    >
      <Image
        src={product.url}
        alt={product.name}
        h={60}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"lg"} color={txtColor} mb={2}>
          ${product.price}
        </Text>
        <HStack>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme={"blue"}
          />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme={"red"}
            onClick={() => handleDelete(product._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                type="text"
                placeholder="Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                type="text"
                placeholder="Image Url"
                value={updatedProduct.url}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, url: e.target.value })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleUpdate(product._id, updatedProduct);
                onClose();
              }}
            >
              Edit
            </Button>
            <Button cvariant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
ProductCard.propTypes = {
  product: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
