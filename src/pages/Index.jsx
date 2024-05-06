import { useState } from "react";
import { Container, VStack, Input, Button, List, ListItem, IconButton, useToast, Text, HStack } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === "") {
      toast({
        title: "No input",
        description: "Please enter a task.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id) => {
    const newText = prompt("Edit your task:");
    if (newText) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, text: newText };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Task Manager
        </Text>
        <HStack>
          <Input placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} />
          <IconButton aria-label="Add task" icon={<FaPlus />} onClick={handleAddTask} />
        </HStack>
        <List spacing={3} w="100%">
          {tasks.map((task) => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md">
              <Text>{task.text}</Text>
              <HStack>
                <IconButton aria-label="Edit task" icon={<FaEdit />} onClick={() => handleUpdateTask(task.id)} />
                <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} />
              </HStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
