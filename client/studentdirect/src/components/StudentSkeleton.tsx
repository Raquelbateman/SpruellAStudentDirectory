import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Badge,
    Skeleton,
    SkeletonCircle,
  } from "@chakra-ui/react";
  
  import { AddIcon } from "@chakra-ui/icons";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { BASE_URL } from "../constant";
  
 
  interface Student {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
  }
  
  const StudentSkeleton = () => {
    const [data, setData] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
  
    const fetchData = () => {
      setIsLoading(true);
      axios
        .get(BASE_URL + "/students")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <Box m={8} shadow={"lg"} rounded={"md"} p={5}>
        <Flex justifyContent={"space-between"} mb={5}>
          <Heading>
            {isLoading ? <Skeleton height="20px" width="150px" /> : "Student Database"}
          </Heading>
          <Button colorScheme="teal.500" leftIcon={<AddIcon />}>
            Add Student
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>Phone Number</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <Tr key={index}>
                    <Td><Skeleton height="20px" /></Td>
                    <Td>
                      <HStack>
                        <SkeletonCircle size="10" />
                        <Skeleton height="20px" width="100px" />
                      </HStack>
                    </Td>
                    <Td><Skeleton height="20px" width="100px" /></Td>
                    <Td><Skeleton height="20px" width="100px" /></Td>
                    <Td><Skeleton height="20px" width="150px" /></Td>
                  </Tr>
                ))
              ) : error ? (
                <Tr>
                  <Td colSpan={5}>
                    <Text color="red.500">{error}</Text>
                  </Td>
                </Tr>
              ) : (
                data.map((student) => (
                  <Tr key={student.id}>
                    <Td>{student.id}</Td>
                    <Td>{student.name}</Td>
                    <Td>{student.address}</Td>
                    <Td>{student.phoneNumber}</Td>
                    <Td>{student.email}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default StudentSkeleton;
  