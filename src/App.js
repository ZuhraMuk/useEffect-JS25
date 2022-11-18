// ! Создали ToDo list  со следующими компонентами:

// ? 1. App.js - Этот файл является родительским компонентом для всех остальных компонентов. В данном файле вызываем все дочерние компоненты, а также создаём все основные функции CRUD, для того чтобы в дальнейшем их легко можно было передавать в дочерние компоненты.

// todo В папке src создали папку Components. В данной папке сохранены дочерние компоненты

// ? 2. AddTodo.jsx - В этом файле написана верстка (т.е. инпут и кнопка) и логика, для добавления новых тасков.

// ? 3. TodoList.jsx - этот компонент предназначен для отображения данных в виде списка, также в нем есть две кнопки: удаление и редактирование.

// ? 4. UpdateTodo.jsx - В этом файле написана верстка модального окна с инпутом и кнопкой сохранения данных.

import React, { useEffect, useState } from "react";
import AddTodo from "./Components/AddTodo/AddTodo";
import NavScrollExample from "./Components/Navbar/Navbar";
import TodoList from "./Components/TodoList/TodoList";
import UpdateTodo from "./Components/UpdateTodo/UpdateTodo";

const App = () => {
  // state taskArr - нужен для того, чтобы сохранять все таски в виде объекта в массиве (т.к. массив легче всего перебирать). Хранилище для тасков.
  const [taskArr, setTaskArr] = useState([]);
  // state show нужен для открытия и закрытия модального окна
  const [show, setShow] = useState(false);
  // state oneEditTask - хранилище для одного объекта из массива, а объект - тот таск на котором кликнули кнопку Edit
  const [oneEditTask, setOneEditTask] = useState({});

  // функция для добавления, в параметры принимает новый созданный объект из AddTodo.jsx
  function handleTask(objTask) {
    // в новую переменную распоковали (поверхностное копирование) массив с тасками
    // todo Специально создали новую перменную (!!!не state), т.к. state (taskArr) напрямую изменять нельзя
    let newTodo = [...taskArr];
    // в новый массив со старыми данными добавляем, новые данные
    newTodo.push(objTask);
    // вызываем функцию для изменения стэйта taskArr, а в аргументы передаём массив, в который выше добавили новый объект
    setTaskArr(newTodo);
  }

  // функция для удаления, в аргументы принимает id объекта, на котором нажали кнопку delete (id прилетает из TodoList.jsx)
  function clickDelete(id) {
    // в новую перменную возвращаем только те объекты, у которых id не равны с id объекта на котором кликнули кнопку delete
    // условие проверяется при переборе массива со всеми тасками, условие выполняется при помощи метода filter
    let newTaskArr = taskArr.filter(item => {
      return item.id !== id;
    });
    // вызываем функцию, которая изменяет state taskArr? а в аругменты передаём новый изменный массив
    setTaskArr(newTaskArr);
  }

  // функция для закрытия модального окна
  const handleClose = () => setShow(false);
  // функция для открытия модального окна
  const handleShow = () => setShow(true);

  //Это функция сохраняет измененный таск, в параметры принимает: editObj - измененный объект
  function saveEditedTask(editObj) {
    //Мы создали новую переменную в которой будет лежать наш измененный объект, его ищем при помощи метода массива map, используя условный оператор if, сравнивая id
    let newEditedTaskArr = taskArr.map(item => {
      //перебираем массив с данными с помощью метода map :1) мы ищим совпадение по id в if(item.id === editObj.id) если объект не совпадает то срабатывает else и возвращает item 2) а при совпадении возвращаем наш новый объект . И так до оканчания цикла, дальше мы c помощью setTaskArr перезаписываем старый массив на новый измененный
      if (item.id === editObj.id) {
        return editObj;
      } else {
        return item;
      }
    });

    setTaskArr(newEditedTaskArr); // Вызываем функцию setTaskArr , чтобы поместить в наше состояние массив с обновленными тасками
  }
  //todo useEffect - мы используем чтобы проверить localStorage есть ли там массив.Если есть то отображаем ее , если нет (если пользователь зашел на сайт впервые) то создаем новый.
  // Если в localStorage под ключем tasks ничего не будет то поместим туда пустой массив, иначе данные, которые мы берем с localStorage поместить в taskArr, при помощи функции setTaskArr
  //Мы все это помещаем в useEffect для того чтобы отработалось один раз
  useEffect(() => {
    if (localStorage.getItem("tasks") === null) {
      localStorage.setItem("tasks", JSON.stringify([]));
    } else {
      let data = localStorage.getItem("tasks");
      setTaskArr(JSON.parse(data)); // это нужно чтобы при обновлении страницы старые данные не исчезли
    }
  }, []);

  //При каждом изминении taskArr отправляем данные в localStorage с ключом tasks
  //todo этот useEffect нужен чтобы следить за любым изминением taskArr (добавление,удаление,изменение), при любом изменении перезаписываем старые данные на новый в localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  }, [taskArr]);

  return (
    <div>
      <NavScrollExample />
      <div className="w-50 mx-auto mt-5">
        <AddTodo handleTask={handleTask} />
      </div>
      <TodoList
        taskArr={taskArr}
        clickDelete={clickDelete}
        handleShow={handleShow}
        setOneEditTask={setOneEditTask}
      />
      {show ? (
        <UpdateTodo
          handleClose={handleClose}
          show={show}
          oneEditTask={oneEditTask}
          saveEditedTask={saveEditedTask}
        />
      ) : null}
    </div>
  );
};

export default App;
