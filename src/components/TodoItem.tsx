import { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import styled from "@mui/material/styles/styled";

const ItemContainer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.action.focus}`,
  transition: "border 0.3s ease-in",
  "&:hover": {
    border: `1px solid ${theme.palette.primary.dark}`,
    cursor: "pointer",
  },
}));

const TodoItem = ({ item }: { item: TodoItemType }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <ItemContainer
      key={item.id}
      sx={{ display: "flex", flexDirection: "column" }}
      onClick={() => setExpanded(!expanded)}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "sm",
          }}
        >
          {item.title}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          fontSize: "sm",
        }}
      >
        <Box>{item.desc}</Box>
        {expanded ? (
          <>
            <Box>{item.created_at.split("(")[0]}</Box>
            <Box>{item.updated_at.split("(")[0]}</Box>
            <Box>{item.due_date.split("(")[0]}</Box>
          </>
        ) : null}
      </Box>

      {/* <Box sx={{ fontSize: "sm" }}>{item.description}</Box> */}
    </ItemContainer>
  );
};
export default TodoItem;
