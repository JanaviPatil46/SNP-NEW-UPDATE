// import React from 'react'

// const Pipeline = () => {
//   return (
//     <div>
//       pipeline 
//     </div>
//   )
// }

// export default Pipeline
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Card, CardContent, Typography, Paper, Grid } from '@mui/material';

const ItemType = {
  TASK: 'task',
};

const Task = ({ task, index, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.TASK,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Card ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <CardContent>
        <Typography>{task.name}</Typography>
      </CardContent>
    </Card>
  );
};

const Stage = ({ stage, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: ItemType.TASK,
    drop: (item) => moveTask(item.index, stage.id),
  });

  return (
    <Paper ref={drop} style={{ padding: 16, minHeight: 200 }}>
      <Typography variant="h6">{stage.name}</Typography>
      <Grid container spacing={2} mt={2}>
        {tasks.map((task, index) => (
          <Grid item key={task.id}>
            <Task task={task} index={index} moveTask={moveTask} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

const Pipeline = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', stageId: 1 },
    { id: 2, name: 'Task 2', stageId: 1 },
    { id: 3, name: 'Task 3', stageId: 2 },
  ]);

  const stages = [
    { id: 1, name: 'Stage 1' },
    { id: 2, name: 'Stage 2' },
    { id: 3, name: 'Stage 3' },
  ];

  const moveTask = (taskIndex, toStageId) => {
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, stageId: toStageId } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {stages.map((stage) => (
          <Stage
            key={stage.id}
            stage={stage}
            tasks={tasks.filter((task) => task.stageId === stage.id)}
            moveTask={moveTask}
          />
        ))}
      </Box>
    </DndProvider>
  );
};

export default Pipeline;
