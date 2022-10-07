/* eslint-disable no-undef */
const todoList = require("../todo");
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("todolist test seats ", () => {
  beforeAll(() => {
    add({
      title: "test node1",
      completed: false,
      dueDate: today,
    });
    add({
      title: "test node2",
      completed: false,
      dueDate: yesterday,
    });
    add({
      title: "test node 3",
      completed: false,
      dueDate: tomorrow,
    });
  });
  test("should add new ", () => {
    const todoItemsCount = all.length;
    add({
      title: "test node 4",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });
  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("checking retrival of overdue items", () => {
    let overduetodos = overdue();
    expect(overduetodos.length).toBe(1);
    expect(overduetodos[0]).toBe(all[1]);
  });
  test("checking retrival of today dueitems", () => {
    let duetodaytodo = dueToday();
    expect(duetodaytodo.length).toBe(2);
    expect(duetodaytodo[1]).toBe(all[3]);
    expect(duetodaytodo[0]).toBe(all[0]);
  });
  test("checking retrival of duelater items", () => {
    let duelatertodo = dueLater();
    expect(duelatertodo.length).toBe(1);
    expect(duelatertodo[0]).toBe(all[2]);
  });
});
