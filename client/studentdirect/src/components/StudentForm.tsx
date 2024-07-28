import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    VStack,
    Input,
    Textarea,
    useToast,
    Text,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { BASE_URL } from "../constant";
  import axios from "axios";
  import { Student } from "./StudentTable";
  
  interface StudentFormProps {
    isOpen: boolean;
    onClose: () => void;
    fetchStudent: () => void;
    currentData?: Student;
  }
  
  const StudentForm = ({
    isOpen,
    onClose,
    fetchStudent,
    currentData,
  }: StudentFormProps) => {
   
    const toast = useToast();
  

    const [student, setStudent] = useState({
      id: currentData?.id || 0,
      name: currentData?.name || "",
      address: currentData?.address || "",
      phoneNumber: currentData?.phoneNumber || "",
      email: currentData?.email || "",
    });
 
    const onSave = () => {
      if (currentData?.id) {
        editStudent();
      } else {
        addStudent();
      }
    };
  
 
    const editStudent = () => {
      axios
        .put(BASE_URL + "/" + currentData?.id, student)
        .then(() => {
          onClose();
          fetchStudent();
          toast({
            title: "Student Updated.",
            description: "Student updated successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  
    };
  
 
    const addStudent = () => {
      axios
        .post(BASE_URL, student)
        .then((response) => {
          console.log(response);
          onClose();
          fetchStudent();
          toast({
            title: "Student Added.",
            description: "Student Added successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  
  
    };
  
    return (
      <>
    
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Student</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack gap={3} alignItems={"self-start"}>
                  <Text>Name</Text>
                <Input
                  type="text"
                  placeholder="Name"
                  value={student.name}
                  onChange={(e) =>
                    setStudent({ ...student, name: e.target.value })
                  }
                />
                <Text>Address</Text>
                <Textarea
                  placeholder="Address"
                  value={student.address}
                  onChange={(e) =>
                    setStudent({ ...student, address: e.target.value })
                  }
                />
                <Text>Phone Number</Text>
                <Input
                  type="text"
                  placeholder="Phone Number"
                  value={student.phoneNumber}
                  onChange={(e) =>
                    setStudent({ ...student, phoneNumber: e.target.value })
                  }
                />
                <Text>E-mail</Text>
                <Input
                  type="text"
                  placeholder="E-mail"
                  value={student.email}
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                />
              </VStack>
            </ModalBody>
  
       
  
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="green" onClick={onSave}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default StudentForm;
  