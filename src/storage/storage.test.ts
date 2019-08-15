import { Storage, load, loadString, save, saveString, clear, remove } from "./storage"

// fixtures
const VALUE_OBJECT = { x: 1 }
const VALUE_STRING = JSON.stringify(VALUE_OBJECT)

beforeEach(() => {
  // @ts-ignore
  Storage.getItem.mockReturnValue(Promise.resolve(VALUE_STRING))
})

afterEach(() => jest.clearAllMocks())

test("load", async () => {
  const value = await load("something")
  expect(value).toEqual(JSON.parse(VALUE_STRING))
})

test("loadString", async () => {
  const value = await loadString("something")
  expect(value).toEqual(VALUE_STRING)
})

test("save", async () => {
  await save("something", VALUE_OBJECT)
  expect(Storage.setItem).toHaveBeenCalledWith("something", VALUE_STRING)
})

test("saveString", async () => {
  await saveString("something", VALUE_STRING)
  expect(Storage.setItem).toHaveBeenCalledWith("something", VALUE_STRING)
})

test("remove", async () => {
  await remove("something")
  expect(Storage.removeItem).toHaveBeenCalledWith("something")
})

test("clear", async () => {
  await clear()
  expect(Storage.clear).toHaveBeenCalledWith()
})
