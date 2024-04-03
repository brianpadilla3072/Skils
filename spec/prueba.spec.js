const {activity, repository_activity} = require("../scripts/index")
describe("Clase activity", function() {
  // Prueba para crear una instancia de activity
  it("debería crear una instancia de activity con los parámetros adecuados", function() {
    const exampleActivity = new activity("Título de ejemplo", "Descripción de ejemplo", "https://ejemplo.com", 1);

    // Verificar si la instancia se crea correctamente
    expect(exampleActivity.title).toEqual("Título de ejemplo");
    expect(exampleActivity.description).toEqual("Descripción de ejemplo");
    expect(exampleActivity.url).toEqual("https://ejemplo.com");
    expect(exampleActivity.id).toEqual(1);
  });
});
