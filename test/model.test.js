
const {todoModel} = require('../src/models')




describe("todo schema validate", () => {
  it("should validate todo model schema", async () => {
    const newTodo = new todoModel();

    try {
      await newTodo.validate();
    } catch (error) {
      expect(error.errors.title).toBeDefined();
    }
  });
});
