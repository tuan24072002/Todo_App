class TodoModel {
  id: string;
  title: string;
  description: string;
  constructor(id: string, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
  static initial() {
    return {
      id: "",
      title: "",
      description: "",
    };
  }
}
export default TodoModel;
