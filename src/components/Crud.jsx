import { useState } from "react";
import PropTypes from "prop-types";
const data = [
  {
    id: 1,
    name: "John Doe",
    description: "this description of my first task",
    isSenior: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    description: "this description of my second task",
    isSenior: false,
  },
  {
    id: 3,
    name: "Alice Johnson",
    description: "this description of my third task",
    isSenior: false,
  },
];

const Todos = (props) => {
  return (
    <div
      style={{
        border: "1px solid",
        textAlign: "center",
        padding: "16px",
        position: "relative",
        margin: 8,
        backgroundColor: "#CCF5D3",
      }}
    >
      {props.isSenior && (
        <i
          className="fa-solid fa-person-digging fa-2x"
          style={{ position: "absolute", top: 10, right: 10 }}
        ></i>
      )}
      <h3>{props.name}</h3>
      <h4>{props.description}</h4>

      <button style={{ backgroundColor: "#12AE89" }} onClick={props.deleteTodo}>
        Delete
      </button>
      <button
        style={{ backgroundColor: "#D05D20", margin: "10px" }}
        onClick={() => {}}
      >
        {props.isSenior ? "Completed" : "InCompleted"}
      </button>
    </div>
  );
};

Todos.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  deleteTodo: PropTypes.bool,
  isSenior: PropTypes.bool,
};
const Curd = () => {
  const [todos, setTodos] = useState(data);

  const [formState, setFormState] = useState({
    name: "",
    description: "",

    isSenior: false,
  });

  const handleChange = (e) => {
    if (e.target.name === "isSenior") {
      setFormState({
        ...formState,
        isSenior: e.target.checked,
      });
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    }
  };

  const createTodos = (todoData) => {
    const tempTodo = { ...todoData };

    const id = Date.now();

    tempTodo.id = id;

    setTodos([...todos, tempTodo]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodos(formState);
  };

  const deleteTodo = (todoId) => {
    const filteredData = todos.filter((todos) => todos.id !== todoId);
    setTodos(filteredData);
  };

  return (
    <>
      {console.log(formState)}
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid",
          padding: 8,
          margin: 8,
          backgroundColor: "#CCF5D3",
        }}
      >
        Name:{" "}
        <input
          type={"text"}
          placeholder="Name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          style={{ borderColor: "#C5D7D1" }}
          required
        />
        <br />
        Description:{" "}
        <input
          type={"text"}
          placeholder="Description"
          value={formState.description}
          onChange={handleChange}
          style={{ borderColor: "#C5D7D1" }}
          name="description"
          required
        />
        <br />
        <label htmlFor="isSenior">Type</label>
        <input
          type={"checkbox"}
          style={{ backgroundColor: "blue" }}
          onChange={handleChange}
          checked={formState.isSenior}
          placeholder="isSenior"
          name="isSenior"
        />
        <br />
        <button type="submit" style={{ backgroundColor: "#FF817E" }}>
          Submit
        </button>
      </form>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {todos.map((todo) => (
          <Todos
            key={todo.id}
            {...todo}
            deleteTodo={() => deleteTodo(todo.id)}
          />
        ))}
      </div>
    </>
  );
};
export default Curd;
