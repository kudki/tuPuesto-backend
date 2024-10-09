import { dbTest } from "./models/testModel"

test("Inicio de pruebas", () => {
  expect(true).toBe(true)
})

test("Conectividad DB", async () => {
  const dbResult = await dbTest()
  expect(dbResult.length).toBe(1)

})

test("Login Basico", async () => {
  let result: any = await loginTest()
  expect(JSON.parse(result)).toEqual(expect.objectContaining({
    status: true,
    msg: "usuario autenticado",
    data: expect.objectContaining({
      usr_id: expect.any(String), // o expect.any(Number) si es un número
      usr_rut: expect.any(String),
      usr_neg_id: expect.any(Number),
      usr_nombre: expect.any(String),
      usr_per_id: expect.any(Number),
      usr_correo: expect.any(String),
      usr_desc: expect.any(String),
      token: expect.any(String)
    })
  }));
})



const loginTest = async () => (
  new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic cGVyc29uYTJAY29ycmVvLmNsOjEyMzQ1Ng==");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://backdev.tupuesto.cl/login", requestOptions)
      .then((response: Response) => response.text())
      .then((result: string) => resolve(result))
      .catch((error: Error) => reject(error));
  })
)