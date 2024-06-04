import React, { useState, useMemo, useEffect } from 'react';
// Todo Section imports from TodoList and AddTodoForm
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';

import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// Imports the stylesheet
import './App.css';

const initialTodos: Todo[] = [
  {
    text: 'Learn Typescript',
    completed: true,
  }, 
  {
    text: 'Add comments to code to explain Shaun Guimond Portfolio',
    completed: false,
  },
];

function App() {

  const [todos, setTodos] = useState(initialTodos);

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#242a3e",
        },
      },
      zLayers: 1,
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 12,
          },
          repulse: {
            distance: 200,
            duration: 0.8,
          },
        },
      },
      particles: {
        color: {
          value: "#FFFFFF",
        },
        links: {
          color: "#FFFFFF",
          distance: 80,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 200,
        },
        opacity: {
          value: 0.99,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const AddTodo: AddTodo = (text: string) => {
    const newTodo = { text, completed: false };
    setTodos([...todos, newTodo]);
  };

  if (init) {
      return ( 
        <>
          <div className='todolist-container'>
            <h1>Todo List</h1>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <AddTodoForm addTodo={AddTodo}/>
          </div>
          <Particles 
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options} 
          />
        </>
      );
  }

  return ( 
    <>
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <AddTodoForm addTodo={AddTodo}/>
    </div>
    </>
  );
}

export default App;
